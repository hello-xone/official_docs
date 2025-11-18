#!/bin/bash

# ... (脚本开头的变量和检查逻辑) ...
TEMP_FILE="README_TEMP.md"

# ... (静态内容和徽章部分) ...

# -------------------------------------------------------
# 动态内容：生成提交历史记录
# -------------------------------------------------------

# 获取当前分支名称
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "## 📢 最新提交记录 (Branch: \`${CURRENT_BRANCH}\`)" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# 设置要显示的提交数量
COMMIT_LIMIT=15

# 使用 git log 格式化输出最近的提交记录，并将其追加到临时文件
git log -${COMMIT_LIMIT} \
    --no-merges \
    --date=short \
    --pretty=format:'* **[%h]** %s - %an (%ad)' \
    >> "$TEMP_FILE"

echo "" >> "$TEMP_FILE"
echo "---" >> "$TEMP_FILE"

# ... (脚本末尾的移动/清理逻辑) ...

mv "$TEMP_FILE" "$OUTPUT_FILE"
echo "✅ ${OUTPUT_FILE} 生成完成！"