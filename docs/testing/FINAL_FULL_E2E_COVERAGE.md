# Final browser and functional coverage

A clean-package Next.js production build was served on port 3008 against the disposable restore on port 4102. Ports 3000, 3001 and 4000 were kept available to their existing services. Browser fixture users were randomly named and cleaned up. Browser logs, credentials and inventories were excluded from Git.

| Feature | Coverage |
|---|---|
| Character roster | 262 rendered localized identity headings derived from the 131-row GraphQL inventory, with a public default for every identity. |
| Character controls | Search and clear, combined Hydro and weapon filters, keyboard filter activation, detail navigation, and Mitya build switching. There is no separate character sort control to test. |
| Character breakpoints | Actual stored Lv.1 and Lv.90 values were exercised on Aino, Mitya, Xingqiu, Bennett, Alyosha, and the two Traveler variants. Generic Traveler has no stored level rows. Both localized pages now show a status message and no fabricated table. |
| Items and teams | Weapon name sort and sort direction, weapon and artifact links to actual detail pages, material load-more, and Teams content. Other combinations, artifact infinite scroll, and every material interaction were outside the tested scope. |
| Ranking | Tier List role tabs and published Weapon Tier rank, detail link, reload, and exclusion assertions. Exhaustive role and filter combinations remain outside coverage. |
| Auth | Isolated English desktop registration, session refresh, logout, Remember Me and customer denial. Vietnamese mobile Admin credentials, protected review route, and session logout passed. |
| Admin | See [workflow validation](../admin/FINAL_REVIEW_WORKFLOW_VALIDATION.md). |
| Accessibility | Named filters and level controls, keyboard activation, state attributes and representative layout checks. This was not a full screen-reader, focus-order, contrast, or keyboard-trap audit. |
| Remaining scope | Exhaustive tabs, dialogs, fallback rendering and error paths were not tested for every item or route. |

Reproduce the read-only browser coverage from the repository root after starting the local application.

```sh
RELEASE_BROWSER_URL=http://127.0.0.1:3008 RELEASE_GRAPHQL_URL=http://127.0.0.1:4102/graphql python frontend/scripts/run-release-catalog-e2e.py
```

The test runner uses bounded Chromium concurrency. The loading skeleton and target content can both exist during streaming. The test waits for the target heading or functional control before asserting.

All four EN/VI desktop and mobile interaction lanes passed without page exceptions, including the mobile weapon filter disclosure. The all-roster and interaction outputs are in `/tmp/gh-hardening-release-browser-final.log`, `/tmp/gh-hardening-catalog-final-lanes.log`, and `/tmp/gh-hardening-catalog-mobile-verified.log`. The final desktop and mobile runs are separate because the mobile test had to open the implemented filter disclosure before operating the sort.
