const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 递归扫描目录中的所有 MDX 文件
function findMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 跳过这些目录
      if (!['node_modules', '.next', 'public', 'components', 'lib', 'styles', 'scripts'].includes(file)) {
        findMdxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 为 Xone 添加链接
function addXoneLinks(content) {
  // 不处理的区域标记
  const codeBlockRegex = /```[\s\S]*?```/g;
  const inlineCodeRegex = /`[^`]+`/g;
  const linkRegex = /\[([^\]]+)\]\([^)]+\)/g;
  const urlRegex = /https?:\/\/[^\s]+/g;
  const jsxRegex = /<[^>]+>/g;
  const headingRegex = /^#{1,6}\s+.+$/gm;  // Markdown 标题
  
  // 收集所有需要保护的区域
  const protectedRanges = [];
  
  // 收集代码块
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    protectedRanges.push({ start: match.index, end: match.index + match[0].length });
  }
  
  // 收集行内代码
  while ((match = inlineCodeRegex.exec(content)) !== null) {
    protectedRanges.push({ start: match.index, end: match.index + match[0].length });
  }
  
  // 收集已有的链接
  while ((match = linkRegex.exec(content)) !== null) {
    protectedRanges.push({ start: match.index, end: match.index + match[0].length });
  }
  
  // 收集 URL
  while ((match = urlRegex.exec(content)) !== null) {
    protectedRanges.push({ start: match.index, end: match.index + match[0].length });
  }
  
  // 收集 JSX/HTML 标签
  while ((match = jsxRegex.exec(content)) !== null) {
    protectedRanges.push({ start: match.index, end: match.index + match[0].length });
  }
  
  // 收集 Markdown 标题
  while ((match = headingRegex.exec(content)) !== null) {
    protectedRanges.push({ start: match.index, end: match.index + match[0].length });
  }
  
  // 排序保护区域
  protectedRanges.sort((a, b) => a.start - b.start);
  
  // 检查位置是否在保护区域内
  function isProtected(index) {
    return protectedRanges.some(range => index >= range.start && index < range.end);
  }
  
  // 替换 Xone 为链接（大小写不敏感，但保留原样）
  // 匹配独立的单词 Xone/xone（不在其他单词中间）
  const xoneRegex = /\b(Xone|XONE)\b/g;
  
  let result = '';
  let lastIndex = 0;
  
  while ((match = xoneRegex.exec(content)) !== null) {
    const matchIndex = match.index;
    
    // 检查是否在保护区域内
    if (!isProtected(matchIndex)) {
      // 检查前后字符，确保不是在 URL 或特殊上下文中
      const before = content[matchIndex - 1];
      const after = content[matchIndex + match[0].length];
      
      // 跳过如果在特殊字符中（如 @xone, /xone, xone.org）
      if (before && /[@\/\.]/.test(before)) {
        continue;
      }
      if (after && /[@\/\.]/.test(after)) {
        continue;
      }
      
      // 添加前面的内容
      result += content.substring(lastIndex, matchIndex);
      // 添加链接
      result += `[${match[0]}](https://xone.org/)`;
      lastIndex = matchIndex + match[0].length;
    }
  }
  
  // 添加剩余内容
  result += content.substring(lastIndex);
  
  return result;
}

// 更新单个 MDX 文件
function updateMdxFile(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(content);
  
  // 只处理正文内容
  const originalContent = parsed.content;
  const updatedContent = addXoneLinks(originalContent);
  
  // 检查是否有变化
  if (originalContent === updatedContent) {
    console.log(`⏭️  跳过 ${filePath}（无需更新）`);
    return { updated: false, count: 0 };
  }
  
  // 计算替换次数
  const originalMatches = (originalContent.match(/\bXone\b/g) || []).length;
  const updatedMatches = (updatedContent.match(/\[Xone\]\(https:\/\/xone\.org\/\)/g) || []).length;
  const addedLinks = updatedMatches;
  
  if (dryRun) {
    console.log(`\n📄 ${filePath}`);
    console.log(`   将添加 ${addedLinks} 个链接`);
    
    // 显示部分预览
    const lines = updatedContent.split('\n');
    const changedLines = lines.filter(line => line.includes('[Xone](https://xone.org/)'));
    if (changedLines.length > 0) {
      console.log(`   预览示例:`);
      changedLines.slice(0, 2).forEach(line => {
        console.log(`     ${line.substring(0, 100)}${line.length > 100 ? '...' : ''}`);
      });
    }
  } else {
    // 重新生成文件内容
    const newContent = matter.stringify(updatedContent, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ 已更新: ${filePath} (添加了 ${addedLinks} 个链接)`);
  }
  
  return { updated: true, count: addedLinks };
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
  
  let totalUpdated = 0;
  let totalLinks = 0;
  
  mdxFiles.forEach(file => {
    try {
      const result = updateMdxFile(file, dryRun);
      if (result.updated) {
        totalUpdated++;
        totalLinks += result.count;
      }
    } catch (error) {
      console.error(`❌ 处理 ${file} 时出错:`, error.message);
    }
  });
  
  console.log(`\n📊 统计:`);
  console.log(`   处理文件: ${mdxFiles.length}`);
  console.log(`   更新文件: ${totalUpdated}`);
  console.log(`   添加链接: ${totalLinks}`);
  console.log(`\n${dryRun ? '预览完成！使用不带 --dry-run 参数来实际执行更新。' : '✨ 更新完成！'}`);
}

main();

