---
title: "每个开发者都该掌握的 Linux 命令速查表"
description: "一份精心整理的 Linux 命令速查表，涵盖文件管理、进程控制、网络调试和系统监控，附带实战示例。"
pubDate: 2026-06-01
tags: ["linux", "shell", "运维", "速查表"]
category: "运维"
draft: false
featured: false
---

## 文件管理

```bash
# 查找最近 7 天内修改过的文件
find . -type f -mtime -7

# 在所有 .ts 文件中递归搜索指定模式
grep -r "getStaticPaths" --include="*.ts" src/

# 统计项目代码行数（排除 node_modules）
find . -name "*.ts" -not -path "*/node_modules/*" | xargs wc -l

# 递归创建目录树
mkdir -p project/src/{components,layouts,pages,utils,styles}
```

## 进程管理

```bash
# 按内存使用量排序，列出所有运行中的进程
ps aux --sort=-%mem | head -20

# 按名称结束进程
pkill -f "node"

# 后台运行命令并断开终端连接
nohup npm run dev > app.log 2>&1 &

# 实时查看进程活动
htop
```

## 网络调试

```bash
# 查看端口占用情况
lsof -i :3000
ss -tlnp | grep :3000

# 测试 HTTP API 接口
curl -X POST https://api.example.com/data \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'

# 监控网卡流量
tcpdump -i eth0 port 443
```

## 系统监控

```bash
# 查看磁盘使用情况
df -h

# 查看各目录大小（一级目录）
du -sh /* 2>/dev/null | sort -rh | head -10

# 实时查看系统日志
journalctl -f

# 内存使用概况
free -h
```

## 文本处理

```bash
# 提取 CSV 文件的第二列
cut -d',' -f2 data.csv

# 统计访问日志中每个 IP 的出现次数
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn

# 批量替换多个文件中的文本（原地修改）
sed -i 's/旧文本/新文本/g' *.md

# 命令行美化 JSON 输出
curl -s https://api.github.com | jq '.'
```

## Git 进阶技巧

```bash
# 交互式 rebase 整理提交记录
git rebase -i HEAD~5

# 二分查找定位引入 bug 的提交
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# 查看漂亮的提交历史图
git log --oneline --graph --all --decorate

# 只暂存指定文件
git stash push -m "WIP: header 组件" src/components/Header.astro
```

## 组合命令实战

```bash
# 只对变更文件运行测试
git diff --name-only HEAD~1 | grep '\.test\.ts$' | xargs npm test

# 一键部署脚本模板
npm run build && \
npm run test && \
rsync -avz dist/ user@server:/var/www/blog/
```

> **小贴士**：把这些别名加到你的 `.bashrc` 或 `.zshrc` 中，日常效率翻倍！
