# DocStral

**DocStral** est une application de chat sandbox conçue pour interagir avec les modèles et la documentation Mistral. Il ne s'agit évidemment **pas d'un projet officiel Mistral**.

![docstral-demo.mp4](/docstral/docstral-demo.mp4)

## Contexte

Ce projet est né de deux motivations principales :

**Validation de compétences & Test de stack technique**  
Poursuivre mon perfectionnement dans la construction d'applications rapides et prêtes pour la production. Valider ma stack technique et mes patterns en préparation d'un futur template fullstack open-source.

**Pratique du déploiement & LLMOps**  
Expérimenter avec les outils de déploiement (notamment [Dockploy](https://dockploy.com)), l'auto-hébergement de modèles via [vLLM](https://github.com/vllm-project/vllm), et les workflows d'opérations LLM.

Il ne s'agit pas d'un produit SaaS ou commercial, mais d'un projet portfolio et d'un terrain d'apprentissage destiné à être présenté à des collaborateurs, amis ou recruteurs.

## Opportunité

Imaginez que vous devez rapidement tester des interactions avec les modèles Mistral ou explorer leur documentation de manière interactive. Avant DocStral, vous auriez dû jongler entre plusieurs onglets de documentation. Avec DocStral, vous conversez simplement avec l'assistant qui comprend le contexte de la documentation Mistral et vous fournit des réponses sourcées avec la possibilité de reproduire chaque interaction via des snippets de code.

## Fonctionnalités

### Chat conversationnel avec streaming

L'interface de chat moderne permet d'interagir en temps réel avec la documentation de Mistral.

### RAG minimal sur la documentation

La fonctionnalité de RAG (Retrieval Augmented Generation) permet d'interroger la documentation officielle Mistral. Le système récupère automatiquement les passages pertinents, les affiche comme sources citées avec leurs URLs, et les intègre dans le contexte de la conversation pour des réponses précises et vérifiables.

### Ingestion de documentation

La fonction d'ingestion permet d'indexer facilement de nouvelles pages de documentation. Le système extrait le texte propre, crée des chunks sémantiques, génère les embeddings et les stocke pour une récupération rapide et pertinente.

### Architecture transparente

La documentation complète du projet expose clairement les choix d'architecture, les décisions techniques et leurs justifications. Un diagramme illustre le parcours d'une requête depuis le frontend jusqu'au modèle, en passant par le système de RAG.
