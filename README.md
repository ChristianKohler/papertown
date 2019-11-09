# Papertown

Papertown syncs you personal markdown blog with blog platforms like dev.to.

## How does it work

Papertown sync only articles with a masterid in the frontmatter. The masterid helps papertown identify articles.

For every article it compares the content and then:

    - if article doesn't exist -> create
    - if article hasn't changed -> do nothing
    - if article has changed -> update

## Todo

[ ] Add support for images

## Supported blog platforms

- DevTo

## Quick Start

### 1. Make sure you have the correct folder structure

If the rootfolder is different change it in the config.

```
- blog-articles
  - article one
    - index.md
  - article two
    - index.md
```

### 2. Add a masterid to the articles you want to sync

**Important:** Posts without a masterid are ignored.

```markdown
---
title: "Sample Blog Post"
masterid: 123
---
```

### 3. Add a canonical_url to link back to your personal blog

```markdown
---
title: "Sample Blog Post"
masterid: 123
canonical_url: "url to this blog article"
---
```

### 4. Add a published field to create a draft

```markdown
---
title: "Sample Blog Post"
masterid: 123
canonical_url: "url to this blog article"
published: false
---
```

### 5. Run Papertown with a valid api key

```
papertown sync --devtoApiKey apikey
```

## Configuration

| Config        | Env           | Args        |
| ------------- | ------------- | ----------- |
| Root Folder   | ROOT_FOLDER   | rootFolder  |
| API Key DevTo | DEVTO_API_KEY | devtoApiKey |

### 1: Use args

```
papertown sync --devtoApiKey apikey
```

### 2: Use a .env file

```
DEVTO_API_KEY="yourdevtoapikey"
```

### 3: Set env variables before running papertown

```
DEVTO_API_KEY="yourdevtoapikey" papertown sync
```
