# Knower

> Mistral AI Hackathon

## Le Problème

Vous vous ré-expliquez à chaque session. Ouvrez Mistral, expliquez la stack. Ouvrez Claude, expliquez à nouveau. Changez d'outil, perdez tout le contexte. Chaque outil maintient son propre silo mémoire, et aucun ne communique avec les autres.

Au-delà de la portabilité : le contexte se dégrade. Les fichiers de règles grandissent jusqu'à 200 lignes, la moitié obsolètes, personne ne les corrige. Et quand un agent récupère de la mémoire via ses propres outils, ces recherches remplissent sa fenêtre de contexte, laissant moins de place pour vraiment réfléchir.

Trois résultats de recherche indépendants (Stanford 2025, NoLiMa Benchmark, Needle-in-Haystack) convergent vers la même conclusion : **charger de la mémoire dans la fenêtre de contexte de l'agent dégrade quantifiablement la qualité du raisonnement**.

## L'Insight Architectural

Knower fonctionne comme un **processus séparé**. L'agent appelle Knower, reçoit un chunk Markdown propre, et garde sa fenêtre de contexte libre pour le travail réel.

## Le Vault

Des fichiers Markdown simples avec frontmatter YAML. La structure est prévisible et fixe :

```
vault/
├── overview.md       ← carte de tout, chargée en premier par chaque agent
├── profile.md        ← préférences, contraintes récurrentes
├── tasks.md          ← vue globale des tâches en cours
├── changelog.md      ← log global en ajout seul
├── inbox/            ← éléments ambigus en attente de l'utilisateur
└── projects/
    └── project-x/
        ├── description.md
        ├── state.md
        ├── tasks.md
        ├── changelog.md
        └── bucket/
```

La structure elle-même est le langage partagé entre l'utilisateur et l'agent. Un agent ne la découvre pas à chaque session. Il la connaît dès le premier appel d'outil.

## Deux Agents, Un Vault

Les deux tournent sur `mistral-large-2512` via OpenRouter dans une boucle agentique d'appels d'outils.

| Agent | Rôle | Accès |
|-------|------|-------|
| **Update** | Route les nouvelles informations dans le vault | lecture + écriture |
| **Search** | Récupération uniquement | lecture seule |

**L'Inbox:** quand l'agent de mise à jour ne peut pas router une entrée avec confiance, il crée un item d'inbox avec tout son raisonnement exposé : ce qu'il a cherché, ce qu'il a trouvé, ce qu'il propose, et une question précise. Quand l'utilisateur répond, l'agent reprend là où il s'était arrêté.

## Recherche: Entièrement Local

Propulsé par [QMD](https://github.com/tobilu/qmd). Pas de cloud, pas d'API externe.

| Modèle | Rôle |
|--------|------|
| Qwen3 1.7B + LoRA | Expansion de requête (HyDE, variantes sémantiques) |
| GGUF embedding | Recherche vectorielle sur le vault |
| LLM Reranker 0.6B | Scoring final des résultats |

Deux modes : `fast` (BM25 uniquement) et `deep` (pipeline complet).

## Connectivité

```
MCP  →  Claude Code, Cursor, Mistral Vibe, tout client MCP compatible
API  →  tout script ou programme (POST /update, POST /search)
CLI  →  accès direct en terminal
```

## Contexte

Construit pour le **Mistral AI Hackathon**. Utilise `mistral-large-2512` comme modèle de raisonnement principal tout au long.
