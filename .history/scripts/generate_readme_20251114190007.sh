#!/bin/bash

# =======================================================
# generate_readme.sh
# 描述: 自动化生成项目的 README.md 文件
# =======================================================

# 设定变量
OUTPUT_FILE="README.md"
TEMP_FILE="README_TEMP.md"

echo "➡️ 开始生成 ${OUTPUT_FILE}..."

# 1. 确保临时文件不存在，并清空目标文件
rm -f "$TEMP_FILE"
> "$OUTPUT_FILE"

# --- 静态头部内容 ---
echo "# 🚀 My Awesome Project" >> "$TEMP_FILE"
echo "一个简短的项目描述。" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"
echo "## 目录" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# --- 动态内容：项目状态徽章 (Badges) ---
echo "## 状态" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"
# 假设您有 CI/CD 状态和 NPM 版本徽章
echo "[![CI Status](https://github.com/your-org/your-repo/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/your-repo/actions/workflows/ci.yml)" >> "$TEMP_FILE"
echo "[![npm version](https://badge.fury.io/js/your-package.svg)](https://www.npmjs.com/package/your-package)" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"


# --- 动态内容：从其他文件导入 ---
echo "## 简介" >> "$TEMP_FILE"
echo "这里的内容从一个单独的文件导入，以保持脚本简洁。" >> "$TEMP_FILE"
cat ./docs/introduction.md >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"


# --- 动态内容：从 package.json 提取依赖 ---
echo "## 依赖项 (重要)" >> "$TEMP_FILE"
echo "以下是项目的主要生产依赖：" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# 使用 jq 工具（需要预装）解析 package.json 中的 dependencies
if command -v jq &> /dev/null; then
    # 提取依赖并格式化为 Markdown 列表
    jq -r '.dependencies | keys[]' package.json | while read DEP; do
        VERSION=$(jq -r ".dependencies[\"$DEP\"]" package.json)
        echo "* **$DEP**: \`$VERSION\`" >> "$TEMP_FILE"
    done
else
    echo "* 💡 提示: 请安装 \`jq\` 以自动列出依赖。" >> "$TEMP_FILE"
fi
echo "" >> "$TEMP_FILE"

# --- 动态内容：API 文档 (假设您使用一个工具生成 Markdown) ---
echo "## API 文档" >> "$TEMP_FILE"
echo "API 文档已通过 JSDoc/TSDoc 自动生成。" >> "$TEMP_FILE"
# 假设您有一个 Node.js 脚本或工具来生成 API markdown
# npm run doc:api:generate -- --output api_docs.md
# cat api_docs.md >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"


# --- 最终步骤：将临时文件内容复制到 README.md ---
echo "✨ 最终内容合并中..."
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "✅ ${OUTPUT_FILE} 生成完成！"