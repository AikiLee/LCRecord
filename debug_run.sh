#!/bin/bash
# 检查是否提供了文件名
if [ -z "$1" ]; then
    echo "Usage: $0 <python_file_path> [args...]"
    exit 1
fi

target_file="$1"
shift

# 获取 Windows 风格的 Python 路径 (为了确保兼容性，直接使用绝对路径)
PYTHON_EXE="/c/Users/15869/AppData/Local/Python/bin/python.exe"

# 打印提示信息
echo "Starting debug server for: $target_file"
echo "Waiting for VS Code to attach on port 5678..."

# 运行 debugpy
# "$@" 将剩余参数传递给脚本
"$PYTHON_EXE" -m debugpy --listen 5678 --wait-for-client "$target_file" "$@"
