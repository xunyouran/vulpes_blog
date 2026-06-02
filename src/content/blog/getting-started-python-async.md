---
title: "Python 异步编程入门指南"
description: "从零开始掌握 Python async/await，通过实战示例学习 asyncio、aiohttp 以及常见的并发模式。"
pubDate: 2026-05-15
updatedDate: 2026-05-20
heroImage: "/images/blog/python-async.png"
heroImageAlt: "暗色终端屏幕上显示 Python 异步代码"
tags: ["python", "async", "教程", "后端"]
category: "编程语言"
draft: false
featured: true
---

## 为什么需要异步？

Python 的 `asyncio` 库让你能够编写既易读又高效的并发代码。与传统的线程和锁不同，你只需使用 `async`/`await` 就能写出顺序风格的代码。

## 基础概念

```python
import asyncio

async def fetch_data(url: str) -> str:
    print(f"正在请求 {url}...")
    await asyncio.sleep(1)  # 模拟网络 I/O
    return f"来自 {url} 的数据"

async def main():
    urls = ["https://api.example.com/1", "https://api.example.com/2"]
    tasks = [fetch_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
    for result in results:
        print(result)

asyncio.run(main())
```

核心要点：`await` 将控制权交还给事件循环，让其他协程能够在等待 I/O 时继续执行。

## 实战示例：异步 HTTP 客户端

```python
import asyncio
import aiohttp

async def fetch_json(session: aiohttp.ClientSession, url: str) -> dict:
    async with session.get(url) as response:
        return await response.json()

async def main():
    async with aiohttp.ClientSession() as session:
        data = await fetch_json(session, "https://jsonplaceholder.typicode.com/todos/1")
        print(data)

asyncio.run(main())
```

## 常见陷阱

1. **不要混用同步和异步 I/O**——同步调用会阻塞整个事件循环。
2. **避免创建 `asyncio.create_task` 后不保存引用**——协程可能被垃圾回收。
3. **生产环境中使用 `asyncio.gather` 时加上 `return_exceptions=True`**——防止一个失败取消其他所有任务。

```python
# ✅ 推荐：优雅地处理异常
results = await asyncio.gather(*tasks, return_exceptions=True)
for r in results:
    if isinstance(r, Exception):
        log.error(f"任务失败: {r}")
```

## 什么时候用异步？

| 场景 | 是否适合异步？ |
|---|---|
| 网页爬虫 | ✅ 非常适合 |
| 数据库查询（异步驱动） | ✅ 非常适合 |
| CPU 密集型计算 | ❌ 请使用 multiprocessing |
| 简单 CLI 脚本 | ❌ 不值得增加复杂度 |

## 进阶学习

- 阅读官方 [asyncio 文档](https://docs.python.org/3/library/asyncio.html)
- 尝试用 FastAPI 搭建一个异步 Web 服务
- 探索 `anyio` 库的结构化并发模式
