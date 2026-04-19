# Knower

> Mistral AI Hackathon

## The Problem

You re-explain yourself every session. Open Mistral — explain the stack. Open Claude — explain it again. Switch tools, lose all context. Every tool maintains its own memory silo, and none of them talk to each other.

Beyond portability: context rots. Rules files grow to 200 lines, half outdated, nobody fixes them. And when an agent retrieves memory using its own tools, those searches fill its context window — leaving less room to actually think.

Three independent research results (Stanford 2025, NoLiMa Benchmark, Needle-in-Haystack) converge on the same conclusion: **loading memory into the agent's context window quantifiably degrades reasoning quality**.

## The Architecture Insight

Knower runs as a **separate process**. The agent calls Knower, receives a clean Markdown chunk, and keeps its context window free for the actual work.

## The Vault

Plain Markdown files with YAML frontmatter. Structure is predictable and fixed:

```
vault/
├── overview.md       ← map of everything, loaded first by every agent
├── profile.md        ← preferences, recurring constraints
├── tasks.md          ← live global tasks view
├── changelog.md      ← append-only global log
├── inbox/            ← ambiguous items awaiting user input
└── projects/
    └── project-x/
        ├── description.md
        ├── state.md
        ├── tasks.md
        ├── changelog.md
        └── bucket/
```

The structure itself is the shared language between user and agent. An agent doesn't discover it each session — it knows it from the first tool call.

## Two Agents, One Vault

Both run on `mistral-large-2512` via OpenRouter in an agentic tool-calling loop.

| Agent | Role | Access |
|-------|------|--------|
| **Update** | Routes new information into the vault | read + write |
| **Search** | Retrieval only | read only |

**The Inbox** — when the update agent can't route input with confidence, it creates an inbox item with its full reasoning exposed: what it searched, what it found, what it proposes, and one precise question. When the user responds, the agent resumes where it left off.

## Search — Fully Local

Powered by [QMD](https://github.com/tobilu/qmd). No cloud, no external API.

| Model | Role |
|-------|------|
| Qwen3 1.7B + LoRA | Query expansion (HyDE, semantic variants) |
| GGUF embedding | Vector search over vault |
| LLM Reranker 0.6B | Final result scoring |

Two modes: `fast` (BM25 only) and `deep` (full pipeline).

## Connectivity

```
MCP  →  Claude Code, Cursor, Mistral Vibe, any MCP-compatible client
API  →  any script or program (POST /update, POST /search)
CLI  →  direct terminal access
```

## Context

Built for the **Mistral AI Hackathon**. Uses `mistral-large-2512` as the core reasoning model throughout.
