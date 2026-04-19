# LLM Panel

## Pourquoi LLM Panel

Inspiré du concept "Text Thread" de [Zed IDE](https://zed.dev) — une approche en texte brut du chat IA où le buffer est la source de vérité. LLM Panel apporte ce workflow dans une application Electron standalone, découplée de tout IDE.

Trois objectifs ont guidé le développement :

1. **Découpler le chat** — application standalone, sans dépendance à un IDE
2. **Simplifier l'extensibilité** — outils personnalisés via config JSON, sans modifier le code
3. **Local-first** — tous les chats, prompts et l'historique stockés sur votre machine

## Le Texte comme Vérité

L'éditeur (construit sur Lexical) n'est pas une interface sophistiquée cachant un état opaque. Chaque badge, bloc de fichier et message est une **couche visuelle sur une chaîne brute**. Vous contrôlez entièrement le buffer texte — vous pouvez le lire, le modifier et comprendre exactement ce qui est envoyé au modèle.

## Commandes Slash

Le mécanisme central. Les commandes injectent du contexte de façon **chirurgicale** — plus besoin de copier-coller des blocs de texte.

**Intégrées :**

- `/file` — intègre le contenu d'un fichier
- `/tree` — insère une arborescence de dossier

**Commandes personnalisées :** définissez les vôtres via un manifeste JSON. Encapsulez n'importe quel outil CLI, script ou workflow externe. L'application reste inchangée.

## Accès aux Modèles via OpenRouter

Tous les grands modèles disponibles dès le premier jour — DeepSeek, Claude, GPT, Mistral, et d'autres. Quand un nouveau modèle est publié sur OpenRouter, il apparaît immédiatement dans LLM Panel, sans mise à jour nécessaire. Changez de modèle en cours de conversation.

## Architecture

Application Electron divisée en deux processus :

- **Processus principal** — Node.js, gère le système de fichiers, les processus enfants, les appels API
- **Processus de rendu** — React + éditeur Lexical, stores Zustand, TanStack Router
- **Pont IPC** — le seul canal de communication entre les deux, entièrement typé

Stockage : fichiers JSON sur disque. Pas de base de données, pas de cloud.

## Feuille de Route

- Interprétation PDF en markdown
- Collage d'images pour les modèles de vision
- Résumés de diff Git
- Options d'outillage JSON élargies
