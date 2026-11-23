# Source reuse review — genshin-builds.com tier list

**Reviewed:** 2026-11-20
**Primary source:** https://genshin-builds.com/en/tier-list (page title: “Genshin Impact Tier List v7.2: Best Characters Ranked”)
**Vietnamese page:** https://genshin-builds.com/vi/tier-list (used only for name cross-check)

## What was checked

| Check | Result |
|---|---|
| `robots.txt` | `User-agent: * → Allow: /`; only `/_server-islands/` is disallowed. AI agents (GPTBot, ClaudeBot, ChatGPT-User, PerplexityBot, Google-Extended, Applebot-Extended, DeepSeekBot) are explicitly allowed. |
| `llms.txt` / `llms-full.txt` / `agents.md` | Site actively documents agent access and prefers structured endpoints (MCP, `.md` twins). This is access guidance, not a content license. |
| `/.well-known/ai-catalog.json` | Publishes MCP server cards for tier-list lookups. No license grant stated. |
| Public API `GET /api/genshin/tierlist` | Returns read-only structured tier data. No license grant stated. |
| `/en/terms` | Contains a **User Content License** covering content *submitted by users* (“non-exclusive, worldwide, royalty-free license to host, store, display, reproduce, and distribute that content as needed to operate and improve the Service”). It does **not** grant rights over the site's own editorial tier-list tables or notes. |
| `/en/privacy-policy` | No data reuse license. |
| Repository license lookup (`dvaJi/gb-astro`) | No `LICENSE` found at the checked endpoints (404). |

## Conclusion

**`RIGHTS VERIFIED`: NO.**

Access to the page and its machine-readable endpoints is permitted and encouraged, but no explicit license was found that permits copying or redistributing the full editorial ranking table or its notes into this project. Therefore:

- The snapshot in this directory is a **SOURCE_DERIVED research draft**, not an independent ranking. The 292 tier placements and constellation/variant splits are converted directly from the Genshin-Builds v7.2 grid.
- The 98 Vietnamese explanations are short paraphrases of source notes (`evidence.sourceNoteAvailable = true` for all 98), not independently derived analysis. They must not be labelled `INDEPENDENT`.
- No note text was copied verbatim into the snapshot, and nothing was copied wholesale into the database. Paraphrase is still source-derived content for reuse purposes.
- Every record is `PENDING_REVIEW` or `NEEDS_REVIEW`; none is `APPROVED`. The snapshot is research/reference only and must not be published on GenshinHub.
- If Admin wants a verbatim, near-verbatim, or paraphrased import, written reuse permission or a compatible license from Genshin-Builds must be obtained first. The alternative is a genuinely independent GenshinHub ranking built from the separately approved methodology in `APPROVAL_PACKAGE.md`.

## Required attribution if any draft text is published

`Nguồn: Genshin-Builds — Genshin Impact Tier List v7.2 (https://genshin-builds.com/en/tier-list). Đây là nhận định meta có thể thay đổi theo phiên bản.`
