# MCP Mem

> 🏆 Smithery Prize, Cursor Hackathon Singapore

## The Problem

ChatGPT's memory exists, but it's broken in four ways: no control, no structure, no evolution, no portability. You mention something once, it stays forever with equal weight. Preferences change, facts go stale, but the memory doesn't.

The deeper issue: most people don't use complex prompting. They ask simple questions and get generic answers, then spend time re-explaining context that already existed somewhere, just not here.

## Approach

**Temporal Knowledge Graphs** via [Graphiti](https://github.com/getzep/graphiti) + Neo4j.

Memories aren't stored as flat facts; they form **relationships with a time dimension**:

```
"Claire liked Adidas" → "Claire sold Adidas stock" → "Claire now prefers Nike"
```

Old preferences deprecate. Entities connect. The graph evolves as your life does.

Exposed via **MCP:** plug into any compatible client with zero lock-in.

## Features

- **Automatic memory creation:** from LLM interactions, documents, notes
- **Graph visualization:** explore connections, trace reasoning, search episodes
- **Full user control:** search, edit, delete memories
- **MCP transport:** works with any MCP-compatible client (Claude Code, Cursor, etc.)

## Stack

| Layer | Tech |
|-------|------|
| Memory engine | Graphiti + Neo4j |
| API | FastAPI (Python) |
| Frontend | Next.js + React |
| Transport | MCP |
| Infrastructure | Docker |

## Context

Built in 48 hours for the **Cursor Hackathon Singapore**. Won the **Smithery Prize** for most innovative use of MCP.
