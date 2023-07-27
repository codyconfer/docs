# Docs

> Docs is a simple, statically generated site that dynamically renders [markdown content](https://www.markdownguide.org/) and [open api specs](https://www.openapis.org/).

![screenshot](https://github.com/codyconfer/docs/blob/03ee99872d5892d4a7ede8a2c097404a1fe59548/.github/screenshot.png)

## Dependencies

- [nextjs](https://github.com/vercel/next.js)
- [glob](https://github.com/isaacs/node-glob)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [vfile](https://github.com/vfile/vfile)
- [mdast](https://github.com/syntax-tree/mdast)
- [remarkjs](https://github.com/remarkjs)
- [yarn](https://github.com/yarnpkg)

## Getting Started

1. Install [node](https://nodejs.org/en/download)
2. Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
3. Run `yarn install && yarn dev`


## Adding Content

Docs will automatically populate markdown content placed in the `~/src/content` directory.
Directory structure is respected in sidebar navigation, **directory names cannot have spaces**.

### Metadata

You can add gray-matter meta data to content.

The current schema supported is:

```markdown
---
title: ''
---
```
