import fs from 'fs'
import path from 'path'
import config from '../config.js'
import { mkdir } from './helpers.js'

const { app, site } = config

const [, , type, slug] = process.argv

if (!type || !slug) {
  console.log('Must specify a type and slug')
  process.exit(1)
}

if (!['page', 'post'].includes(type)) {
  console.log('Invalid type.  post or page')
  process.exit(1)
}

const template = `---
created_at: ${new Date().toISOString()}
slug: ${slug}
title:
description:
image: 
---

Add ${type} content here

`

const root = path.join(app.src, app[(`${type}s`, slug)])
mkdir(root)
fs.writeFileSync(path.join(root, `index.md`), template)
