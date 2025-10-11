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
  const plainText = extractPlainText(content);
  const lines = plainText.split('\n').filter(line => line.trim().length > 0);
  
  // 找到第一个有意义的段落（长度大于20）
  for (const line of lines) {
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
  
  // 如果已经有手动设置的 description 且内容差不多，就不更新
  if (parsed.data.description && parsed.data.description.length > 50) {
    console.log(`✓  ${filePath} 已有 description，跳过`);
    return;
  }
  
  // 更新 frontmatter
  parsed.data.description = autoDescription;
  
  // 如果没有 keywords，可以根据内容生成（这里简化处理）
  if (!parsed.data.keywords) {
    // 可以基于文件路径或标题生成默认 keywords
    const title = parsed.data.title || path.basename(filePath, '.mdx');
    parsed.data.keywords = `Xone, blockchain, ${title}`;
  }
  
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

