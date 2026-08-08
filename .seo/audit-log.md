# Audit log — 2026-08-08

## Crawl Protocol
- Site: https://chosenfewrecords.com (env: NEXT_PUBLIC_SITE_URL)
- Scope: public indexable URLs under /en /de /fr
- Tool: codebase audit + `.seo/crawl-audit.sh` post-deploy
- Checks: robots.txt, sitemap.xml, canonicals, meta robots, JSON-LD

## Axis scores (codebase)

| Axis | Score | Notes |
|------|-------|-------|
| Crawlability | Pass | robots + sitemap added |
| Indexation | Pass | impressum/datenschutz noindex; legal disallowed |
| Page intent | Warn | Home/releases still thin answer-leads |
| Titles & meta | Pass | Stronger Meta + page titles |
| Internal links | Pass | Header/footer cover priority pages |
| Structured data | Pass | RecordLabel, WebSite, MusicGroup, FAQPage |
| Source citations | Warn | Discogs/IG outbound present; need more .gov/.edu where relevant |
| Answer-first GEO | Pass | About BLUF + FAQ; Shortlord lead sentence |

## Next after deploy
1. Submit sitemap in Google Search Console + Bing Webmaster
2. Run `.seo/crawl-audit.sh $SITE_URL .seo/crawl-latest.json`
3. Manual benchmark of `.seo/queries.txt` on Google/Perplexity
