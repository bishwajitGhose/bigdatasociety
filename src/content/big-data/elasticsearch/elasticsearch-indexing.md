---
title: "Optimizing Elasticsearch Index Settings"
desc: "Fine-tuning shard counts, refresh intervals, and mappings to handle high write volumes."
category: "Elasticsearch"
readTime: "5 min read"
date: "July 7, 2026"
image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
---

Elasticsearch is highly optimized for text search, but indexing large amounts of log files requires adjustments to shard distributions and mappings.

### Setting Shards and Replicas

Aim for shard sizes between **20GB and 40GB** on disk. Too many tiny shards create excessive heap overhead for cluster nodes.

```json
// Index settings configuration API payload
{
  "settings": {
    "index.refresh_interval": "30s",
    "number_of_shards": 3,
    "number_of_replicas": 1
  }
}
```
