# Papertown

Papertown syncs you personal markdown blog with blog platforms like dev.to.

## How this it work

Papertown sync only articles with a masterid in the frontmatter. The masterid helps papertown identify articles.

For every article it compares the content and then:

    - if article doesn't exist -> create
    - if article hasn't changed -> do nothing
    - if article has changed -> update

## Supported blog platforms

- DevTo

## Configuration

### 1: Use a .env file

````
DEVTO_API_KEY="yourdevtoapikey"
````

### 2: Set env variables before running problogger

````
DEVTO_API_KEY="yourdevtoapikey" problogger sync
````
