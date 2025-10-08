# DocStral

**DocStral** is a sandbox chat application designed to interact with Mistral models and documentation. This is obviously **not an official Mistral project**.

![docstral-tiny-demo.gif](/docstral/docstral-tiny-demo.gif)

## Context

This project was born from two main motivations:

**Skill Validation & Stack Testing**  
Continue refining my ability to build fast, production-ready applications. Validate my tech stack and patterns in preparation for a future open-source fullstack template.

**Deployment & LLMOps Practice**  
Experiment with deployment tooling (e.g., [Dockploy](https://dockploy.com)), self-hosting models via [vLLM](https://github.com/vllm-project/vllm), and LLM operations workflows.

This is not a SaaS or commercial product. It's a portfolio project and learning playground to showcase for collaborators, friends or recruiters.

## Opportunity

Imagine you need to quickly test interactions with Mistral models or explore their documentation interactively. Before DocStral, you would have juggled between multiple documentation tabs, Jupyter notebooks, and manual API calls. With DocStral, you simply converse with the assistant who understands the context of Mistral documentation and provides you with sourced answers along with the ability to reproduce each interaction via code snippets.

## Features

### Conversational chat with streaming

The modern chat interface allows real-time interaction with Mistral models.

### Minimal RAG on documentation

The RAG (Retrieval Augmented Generation) functionality allows querying the official Mistral documentation. The system automatically retrieves relevant passages, displays them as cited sources with their URLs, and integrates them into the conversation context for accurate and verifiable answers.

### Real-time metrics

A metrics panel displays live system performance: average and P95 latency, input/output tokens, error rate, and cost estimation. These indicators help understand application behavior and optimize requests.

### Documentation ingestion

The ingestion function allows easy indexing of new documentation pages. The system extracts clean text, creates semantic chunks, generates embeddings via the Mistral API, and stores them for fast and relevant retrieval.

### Transparent architecture

The complete project documentation clearly exposes architectural choices, technical decisions, and their justifications. A diagram illustrates a request's journey from frontend to model, through the RAG system.
