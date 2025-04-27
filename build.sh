#!/bin/zsh

# 获取当前脚本所在目录
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# 使用脚本所在目录作为构建上下文路径
docker buildx build -t gelifisikk/chatgpt-web:1.01 "$SCRIPT_DIR"