# LLM Panel

## Why LLM Panel

Inspired by [Zed IDE](https://zed.dev)'s "Text Thread" concept, a plain-text approach to AI chat where the buffer is the source of truth. LLM Panel brings that workflow to a standalone Electron app, decoupled from any IDE.

Three goals drove the build:

1. **Decouple the chat:** standalone app, no IDE dependency
2. **Simplify extensibility:** custom tools via JSON config, no code changes needed
3. **Local-first:** all chats, prompts, and history stored on your machine

## Text Is Truth

The editor (built on Lexical) is not a fancy UI wrapping hidden state. Every badge, file block, and message is a **visual layer over a raw string**. You own the text buffer entirely: you can read it, edit it, and understand exactly what gets sent to the model.

## Slash Commands

The core mechanic. Commands inject context **surgically**, no copy-pasting blocks of text.

**Built-in:**

- `/file`: embed a file's content
- `/tree`: insert a folder structure

**Custom commands:** define your own via a JSON manifest. Wrap any CLI tool, script, or external workflow. The app stays unchanged.

## Model Access via OpenRouter

Every major model available on day one: DeepSeek, Claude, GPT, Mistral, and others. When a new model is released on OpenRouter, it appears in LLM Panel immediately, no update required. Switch models mid-conversation.

## Architecture

Electron app split across two processes:

- **Main process:** Node.js, handles filesystem, child processes, API calls
- **Renderer process:** React + Lexical editor, Zustand stores, TanStack Router
- **IPC bridge:** the only communication channel between both, fully typed

Storage: JSON files on disk. No database, no cloud.

## Roadmap

- PDF interpretation in markdown
- Image pasting for vision models
- Git diff summaries
- Expanded JSON tooling options
