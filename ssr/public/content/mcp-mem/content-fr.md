# MCP Mem

> 🏆 Smithery Prize — Cursor Hackathon Singapore

## Le Problème

La mémoire de ChatGPT existe, mais elle est défaillante de quatre façons : pas de contrôle, pas de structure, pas d'évolution, pas de portabilité. Vous mentionnez quelque chose une fois — ça reste pour toujours avec le même poids. Les préférences changent, les faits deviennent obsolètes, mais la mémoire ne suit pas.

Le problème plus profond : la plupart des gens n'utilisent pas le prompting complexe. Ils posent des questions simples et obtiennent des réponses génériques, puis passent du temps à ré-expliquer un contexte qui existait déjà quelque part — juste pas ici.

## Approche

**Graphes de Connaissance Temporels** via [Graphiti](https://github.com/getzep/graphiti) + Neo4j.

Les souvenirs ne sont pas stockés comme des faits plats — ils forment des **relations avec une dimension temporelle** :

```
"Claire aimait Adidas" → "Claire a vendu ses actions Adidas" → "Claire préfère maintenant Nike"
```

Les anciennes préférences se déprécient. Les entités se connectent. Le graphe évolue au fil de votre vie.

Exposé via **MCP** — branchez-le sur n'importe quel client compatible sans dépendance.

## Fonctionnalités

- **Création automatique de souvenirs** depuis les interactions LLM, documents, notes
- **Visualisation du graphe** — explorez les connexions, tracez le raisonnement, cherchez des épisodes
- **Contrôle total** — recherchez, modifiez, supprimez des souvenirs
- **Transport MCP** — fonctionne avec tout client MCP compatible (Claude Code, Cursor, etc.)

## Stack

| Couche | Technologie |
|--------|-------------|
| Moteur mémoire | Graphiti + Neo4j |
| API | FastAPI (Python) |
| Frontend | Next.js + React |
| Transport | MCP |
| Infrastructure | Docker |

## Contexte

Construit en 48 heures pour le **Cursor Hackathon Singapore**. A remporté le **Smithery Prize** pour l'utilisation la plus innovante de MCP.
