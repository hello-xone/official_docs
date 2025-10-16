const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 提取文本内容，去除 markdown 标记
function extractPlainText(content) {
  return content
    // 移除 frontmatter 后的 import 语句
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
    // 移除注释
    .replace(/<!--[\s\S]*?-->/g, '')
    // 移除代码块
    .replace(/```[\s\S]*?```/g, '')
    // 移除行内代码
    .replace(/`[^`]+`/g, '')
    // 移除图片
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // 移除链接但保留文本
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 移除标题标记
    .replace(/^#{1,6}\s+/gm, '')
    // 移除加粗
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // 移除斜体
    .replace(/\*([^*]+)\*/g, '$1')
    // 移除 JSX/HTML 标签
    .replace(/<[^>]+>/g, '')
    // 移除多余的空白行
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

// 提取第一段有意义的文字（前120个字符）
function extractFirstParagraph(content, maxLength = 120) {
  const lines = content.split('\n');
  const filteredLines = [];
  
  // 跳过标题行和空行
  for (const line of lines) {
    const trimmed = line.trim();
    // 跳过标题行（以 # 开头）
    if (trimmed.startsWith('#')) {
      continue;
    }
    // 跳过空行
    if (trimmed.length === 0) {
      continue;
    }
    // 跳过 import 语句
    if (trimmed.startsWith('import ')) {
      continue;
    }
    filteredLines.push(line);
  }
  
  // 重新组合内容并提取纯文本
  const filteredContent = filteredLines.join('\n');
  const plainText = extractPlainText(filteredContent);
  const textLines = plainText.split('\n').filter(line => line.trim().length > 0);
  
  // 找到第一个有意义的段落（长度大于20）
  for (const line of textLines) {
    const trimmed = line.trim();
    if (trimmed.length > 20) {
      // 取前 maxLength 个字符
      if (trimmed.length <= maxLength) {
        return trimmed;
      }
      // 在单词边界处截断
      const truncated = trimmed.substring(0, maxLength);
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      if (lastSpaceIndex > 80) {
        return truncated.substring(0, lastSpaceIndex) + '...';
      }
      return truncated + '...';
    }
  }
  return '';
}

// 递归扫描目录中的所有 MDX 文件
function findMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 跳过 node_modules 等目录
      if (!['node_modules', '.next', 'public', 'components', 'lib', 'styles'].includes(file)) {
        findMdxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 更新单个 MDX 文件的 SEO 信息
function updateMdxSeo(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(content);
  
  // 提取第一段作为 description
  const autoDescription = extractFirstParagraph(parsed.content, 120);
  
  if (!autoDescription) {
    console.log(`⚠️  跳过 ${filePath}（无法提取有效内容）`);
    return;
  }
  
  // 更新 frontmatter
  parsed.data.description = autoDescription;
  
  // 重新生成 keywords（不管是否已存在）
  // 优先使用 front matter 中的 title
  let title = parsed.data.title;
  
  // 如果没有 title，从内容中提取第一个标题
  if (!title) {
    const h1Match = parsed.content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
    } else {
      const h2Match = parsed.content.match(/^##\s+(.+)$/m);
      if (h2Match) {
        title = h2Match[1].trim();
      } else {
        // 最后使用文件名
        title = path.basename(filePath, '.mdx');
      }
    }
  }
  
  // 生成 keywords，如果包含 [Xone](https://xone.org/) 链接则保留
  let keywords = title;
  
  // 检查是否包含 [Xone](https://xone.org/) 链接
  if (keywords.includes('https://xone.org/')) {
    // 如果不包含 Xone 链接，则移除所有链接
    keywords = keywords.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  }
  
  parsed.data.keywords = keywords;
  
  // 重新生成文件内容
  const newContent = matter.stringify(parsed.content, parsed.data);
  
  if (dryRun) {
    console.log(`\n📄 ${filePath}`);
    console.log(`   Description: ${autoDescription}`);
    console.log(`   Keywords: ${parsed.data.keywords}`);
  } else {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ 已更新: ${filePath}`);
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const targetPath = args.find(arg => !arg.startsWith('--')) || './pages';
  
  console.log(`\n🔍 目标: ${targetPath}`);
  console.log(`   模式: ${dryRun ? '预览模式（不会修改文件）' : '执行模式'}\n`);
  
  let mdxFiles = [];
  
  // 检查是单个文件还是目录
  if (fs.existsSync(targetPath)) {
    const stat = fs.statSync(targetPath);
    if (stat.isFile() && targetPath.endsWith('.mdx')) {
      mdxFiles = [targetPath];
    } else if (stat.isDirectory()) {
      mdxFiles = findMdxFiles(targetPath);
    } else {
      console.error('❌ 目标必须是 .mdx 文件或目录');
      process.exit(1);
    }
  } else {
    console.error(`❌ 路径不存在: ${targetPath}`);
    process.exit(1);
  }
  
  console.log(`📝 找到 ${mdxFiles.length} 个 MDX 文件\n`);
  
  mdxFiles.forEach(file => {
    try {
      updateMdxSeo(file, dryRun);
    } catch (error) {
      console.error(`❌ 处理 ${file} 时出错:`, error.message);
    }
  });
  
  console.log(`\n${dryRun ? '预览完成！使用不带 --dry-run 参数来实际执行更新。' : '✨ 更新完成！'}`);
}

main();

