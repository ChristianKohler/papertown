# Papertown

Papertown syncs you personal markdown blog with blog platforms like dev.to.

## How does it work

Papertown sync only articles with a masterid in the frontmatter. The masterid helps papertown identify articles.

For every article it compares the content and then:

    - if article doesn't exist -> create
    - if article hasn't changed -> do nothing
    - if article has changed -> update

## Todo

[ ] Add support for canonical urls

[ ] Add support for images

## Supported blog platforms

- DevTo

## Quick Start

1. Make sure you have the correct folder structure

```
- blog-articles
  - article one
    - index.md
  - article two
    - index.md
```

2. Add a masterid to the articles you want to sync

```markdown
---
title: "Sample Blog Post"
published: false
description: "This is an example"
tags: discuss, javascript
masterid: 123
---

Lorem Ipsum..
```

3. Run Papertown with a valid api key

```
papertown sync --devtoApiKey yourdevtoapikey
```

## Configuration

| Config        | Env           | Args        |
| ------------- | ------------- | ----------- |
| Root Folder   | ROOT_FOLDER   | rootFolder  |
| API Key DevTo | DEVTO_API_KEY | devtoApiKey |

### 1: Use args

```
papertown sync --devtoApiKey yourdevtoapikey
```

### 2: Use a .env file

```
DEVTO_API_KEY="yourdevtoapikey"
```

### 3: Set env variables before running papertown

```
DEVTO_API_KEY="yourdevtoapikey" papertown sync
```
