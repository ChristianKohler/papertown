# Papertown

Papertown syncs you personal markdown blog with blog platforms like dev.to.

## How does it work

Papertown sync only articles with a masterid in the frontmatter. The masterid helps papertown identify articles.

For every article it compares the content and then:

    - if article doesn't exist -> create
    - if article hasn't changed -> do nothing
    - if article has changed -> update

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

| Config                | Env                   | Args               |
| --------------------- | --------------------- | ------------------ |
| Root Folder           | ROOT_FOLDER           | rootFolder         |
| API Key DevTo         | DEVTO_API_KEY         | devtoApiKey        |
| Github URL for images | IMAGE_ROOT_URL_GITHUB | imageRootUrlGithub |
| Dry Run               | DRY_RUN               | dryRun             |

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

## Dry Run

Use dryRun to not create or update the post and only log what would happen.

## Relative Images

Papertown can replace relative images with absolute github urls.

Requirements are:

- Github repo is public
- imageRootUrlGithub is set

### Example

Run:

```
papertown sync
  --rootFolder content/posts
  --imageRootUrlGithub https://raw.githubusercontent.com/ChristianKohler/Homepage/master
```

and the url in the file (content/posts/first-post/index.html)

```
./images/hero.png
```

will be replace with:

```
https://raw.githubusercontent.com/ChristianKohler/Homepage/master/content/posts/first-post/images/hero.png
```

## Dev.to

### Add coverimage

Can be a relative image, papertown will resolve it.

```
cover_image: direct_url_to_image.jpg
```

## Papertown API (BETA)

Papertown can be used within your node script.

### Example

```javascript
const { sync } = require("papertown");

const config = {
  rootFolder: "my-root-folder",
  devtoApiKey: "my-key",
  imageRootUrlGithub: "",
  dryRun: false,
};

await sync(config);
```
