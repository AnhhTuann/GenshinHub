# Phase B3.1 — Admin Final Review & approved-only import preparation

**Date:** 2026-11-20  
**Scope:** present the frozen 14 candidates for real Admin decisions, keep Favonius Greatsword blocked, prepare partial import. **No approval, no rights flip, no database write.**

> Freeze verified: `ok = true`, batch SHA-256 `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e`, manifest SHA-256 `30372bf5de13d50856d479789f64598b53fde474c6043f4787094d5fd628777a`. No frozen tier or explanation was changed.

| Check | State |
|---|---|
| Group A — reviewable | 13 |
| Group B — blocked | 1 (Favonius Greatsword 12401) |
| Decisions cast | 0 (all 14 PENDING) |
| Rights flags | 0 verified (all false) |
| Tier re-review confirmations | 0 (2 required) |
| WeaponTierRank / WeaponTierAudit | 0 / 0 |
| Database writes | 0 |

---

## 1. Final Admin Review Sheet

Machine-readable sheet: `docs/weapon-tier-independent/admin-review-sheet.json`. Each row below carries the frozen approval checksum; the Admin may choose `APPROVE`, `REQUEST_CHANGES` or `REJECT`. Nothing is transitioned automatically.

| Weapon | ID | Role | R | Tier | Confidence | Explanation (frozen) | Assumptions | Exact facts | Evidence | Rights | Decision | Checksum |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Favonius Sword | 11401 | SUPPORT | R1 | SS | HIGH | Chỉ số phụ Năng Lượng Nạp và Windfall ở R1 cho xác suất 60% tạo 6 Năng Lượng mỗi 12s khi đánh bạo kích, nên cơ chế sinh hạt đã hoạt động mà không cần tinh luyện sâu. Điều kiện là người cầm phải đạt tỷ lệ bạo kích đủ dùng và có mặt trên sân để gây bạo kích. Đây là đánh giá độc lập theo tiêu chí sinh năng lượng và tính phổ dụng của vai trò Support, không dựa trên độ hiếm hay danh sách nhân vật đề xuất. | có tỷ lệ bạo kích đủ dùng; phải ra sân để gây bạo kích; R1 là mức đánh giá | ER substat; Windfall R1: 60% chance, 6 Energy, 12s ICD; Windfall R5: 100% chance, 6s ICD | genshin-db://weapons/11401, game-facts.json#11401 | false — Original Vietnamese explanation, internal rubric v1.1, genshin-db facts only. Eligible for explicit admin rights verification; flag stays false. | PENDING | `99bcedcc30f03b29008f31285c00fdcac1a19dd0337c30764060c99bcfa9dce9` |
| Sacrificial Sword | 11403 | SUB_DPS | R5 | S | MEDIUM | Composed ở R5 có xác suất 80% đặt lại thời gian hồi kỹ năng sau khi kỹ năng gây sát thương cho địch, với chu kỳ tối đa một lần mỗi 16s. Để sub DPS hưởng lợi, nhân vật phải trở lại sân và dùng lại kỹ năng, đồng thời kỹ năng đó phải trúng địch; vì vậy lợi ích không được giả định là luôn xảy ra. Lần dùng kỹ năng thứ hai có thể tạo thêm hạt nếu kỹ năng sinh hạt, nhưng cần một cửa sổ ngắn trên sân trong xoay vòng. Với điều kiện được ghi rõ, tier S phản ánh giá trị khi reset hoạt động, không phải mức tự động cho mọi nhân vật. | kỹ năng phải gây damage để có cơ hội reset; xác suất 80% và ICD 16s ở R5; cần on-field recast trong rotation; không giả định reset luôn proc | Composed R1: skill must damage opponent, 40% chance, 30s ICD; Composed R5: 80% chance, 16s ICD | genshin-db://weapons/11403, game-facts.json#11403 | false — Explanation rewritten independently; no external editorial text. Flag stays false. | PENDING | `79833088e0284741a1401b572af8f51788c55f627225a0df02f2260bf90cd257` |
| Xiphos' Moonlight | 11418 | SUPPORT | R1 | S | MEDIUM | Jinni's Whisper ở R1 chuyển 0,036% Năng Lượng Nạp cho mỗi điểm Tinh Thông trong 12s, kích hoạt mỗi 10s và chia 30% cho đồng đội gần đó. Hiệu ứng vẫn chạy khi người cầm không ra sân, nhưng tỷ lệ chia sẻ phụ thuộc vào việc xây dựng đủ Tinh Thông. Đánh giá S phản ánh giá trị năng lượng đội hình có điều kiện, không phải mức phổ dụng như một nguồn hồi năng lượng không điều kiện. | cần đầu tư Tinh Thông; tự động kích hoạt mỗi 10s kể cả off-field; chia 30% cho đồng đội gần | EM substat; Jinni's Whisper R1: 0.036% ER per EM for 12s every 10s, 30% shared; R5 coefficient 0.072% | genshin-db://weapons/11418, game-facts.json#11418 | false — Independent mechanical analysis; no external ranking text. Flag stays false. | PENDING | `3e268bac16e789d3ddc732a562f5d8db4678f94784f663e5828da8683e36bda7` |
| Light of Foliar Incision | 11512 | MAIN_DPS | R1 | S | MEDIUM | Whitemoon Bristle ở R1 tăng 4% CRIT Rate và cộng 120% Tinh Thông vào sát thương đòn thường cùng kỹ năng sau khi đòn thường gây sát thương nguyên tố, tồn tại 12s hoặc 28 lần nhận sát thương. Chỉ số phụ CRIT DMG khớp với hiệu ứng này nhưng lợi ích chỉ trọn vẹn khi nhân vật duy trì đòn thường và có hệ số Tinh Thông đáng kể. Vì điều kiện đó, tier S được giữ làm đánh giá có điều kiện thay vì suy từ rarity 5 sao. | đòn thường phải gây sát thương nguyên tố; duy trì đòn thường trong 12s hoặc 28 lần; cần CRIT Rate và EM | CRIT DMG substat; Whitemoon Bristle R1: +4% CRIT Rate, 120% EM added to NA/Skill DMG, 28 instances or 12s; R5: +8% CRIT Rate, 240% EM | genshin-db://weapons/11512, game-facts.json#11512 | false — Rubric-based independent explanation; game facts from genshin-db. Flag stays false. | PENDING | `ff161813968954a2eaf2387b04eed7da6232e9846328160079f571c99e047929` |
| Wolf's Gravestone | 12502 | SUPPORT | R1 | A | MEDIUM | Wolfish Tracker ở R1 tăng 20% ATK cho người cầm và 40% ATK cho cả đội trong 12s khi đánh trúng mục tiêu dưới 30% HP, với chu kỳ 30s. Buff mang lại giá trị hỗ trợ rõ nhưng điều kiện HP thấp và thời gian phủ 12s trên chu kỳ 30s khiến hiệu quả không liên tục. Chỉ số phụ ATK% không bổ sung năng lượng hay tiện ích đội hình, nên tier A được giữ sau khi xét cả điều kiện lẫn thời gian phủ. | mục tiêu phải dưới 30% HP; phải đánh trúng để kích hoạt; chu kỳ 30s, buff 12s | ATK% substat; Wolfish Tracker R1: +20% self ATK, +40% party ATK for 12s on targets below 30% HP, 30s ICD; R5: +40% / +80% | genshin-db://weapons/12502, game-facts.json#12502 | false — Independent evaluation, not based on recommendation counts. Flag stays false. | PENDING | `4831c47ef50dd9ec4481101b0c0e408a29b7215e0c78bd3e433503ebbecf6724` |
| Favonius Lance | 13407 | SUPPORT | R1 | SS | HIGH | Favonius Lance có chỉ số phụ Năng Lượng Nạp và Windfall ở R1 tạo 6 Năng Lượng với xác suất 60% mỗi 12s khi bạo kích. Điều kiện cần có tỷ lệ bạo kích đủ dùng và một lần đánh trên sân, phù hợp với Support cán dài có thời gian ra sân ngắn. Đây là đánh giá độc lập theo khả năng nuôi xoay vòng đội hình, không lấy từ bảng xếp hạng bên ngoài hay số lượt đề xuất. | cần CRIT Rate đủ; phải có một lần đánh trên sân; R1 baseline | ER substat; Windfall R1: 60% chance, 6 Energy, 12s ICD; R5: 100% chance, 6s ICD | genshin-db://weapons/13407, game-facts.json#13407 | false — Internal analysis; no copied ranking text. Flag stays false. | PENDING | `9c05a3f28683a33234e1ad912882ad281822e53c0db41dcb3944d06212b83e0e` |
| Staff of Homa | 13501 | MAIN_DPS | R1 | SS | HIGH | Reckless Cinnabar ở R1 tăng 20% HP và cộng vào ATK một lượng bằng 0,8% Max HP, cộng thêm 1% Max HP khi người cầm dưới 50% HP. Phần chuyển HP sang ATK áp dụng cho mọi người dùng cán dài chứ không chỉ nhân vật scale HP, nên CRIT DMG cùng ATK cộng thêm tạo nền tảng tự đủ mà không cần điều kiện đội hình. Mốc HP thấp chỉ là phần thưởng bổ sung và không được tính vào căn cứ xếp SS, còn nhân vật có Max HP thấp hoặc scale DEF/HP hưởng ít hơn từ phần ATK. Vì vậy SS được đánh giá cho nhóm Main DPS cán dài nói chung dựa trên stats tự đủ, không suy từ trường hợp mạnh nhất của một vài nhân vật. | R1 baseline; phần ATK từ Max HP áp dụng cho mọi cán dài nhưng tỷ lệ hưởng lợi tùy Max HP; dưới 50% HP chỉ là phần thưởng, không tính vào căn cứ SS; nhân vật scale DEF/HP hưởng ít hơn từ phần ATK | CRIT DMG substat; Reckless Cinnabar R1: +20% HP, 0.8% Max HP to ATK, +1% below 50% HP; R5: +40% HP, 1.6% / 1.8% | genshin-db://weapons/13501, game-facts.json#13501 | false — Independent tier decision, not from recommended-user lists. Flag stays false. | PENDING | `af208d96f8a5d859d1ed54bcc35d7c95122decec2c7897705aba62282cb17e86` |
| Thrilling Tales of Dragon Slayers | 14302 | SUPPORT | R5 | S | MEDIUM | Heritage ở R5 tăng 48% ATK trong 10s cho nhân vật vào sân ngay sau người cầm, với chu kỳ 20s và yêu cầu người cầm rời sân đúng trình tự. Buff chỉ có giá trị với nhân vật scale theo ATK và có thời gian phủ 10s trên chu kỳ 20s, nên không phải hỗ trợ phổ dụng cho mọi vai trò Support. Tier được điều chỉnh từ SS xuống S vì giá trị bị giới hạn bởi hệ số scale, thứ tự đổi người và uptime, dù mức buff tại R5 rất cao. | buff ATK cho nhân vật vào sân ngay sau người cầm; người cầm phải swap out đúng trình tự; 10s duration / 20s cooldown; chỉ có giá trị nếu carry scale ATK | HP% substat; Heritage R5: +48% ATK for incoming character for 10s, 20s ICD; R1: +24% ATK | genshin-db://weapons/14302, game-facts.json#14302 | false — Tier lowered by internal rubric, not copied from an external list. Flag stays false. | PENDING | `14e2cd13fc59cf36709fcf2189ad9f9ea825f4c76adfd669b1d4fcc9667f7c57` |
| The Widsith | 14402 | SUB_DPS | R1 | A | MEDIUM | Debut kích hoạt khi nhân vật ra sân, cho một trong ba bản ca ngẫu nhiên trong 10s với chu kỳ 30s; ở R1 các mức là 60% ATK, 48% sát thương nguyên tố hoặc 240 Tinh Thông. Bản ca Tinh Thông không nên xem là vô dụng: với Sub DPS scale EM hoặc đội phản ứng chuyển hóa, 240 EM có thể là bản ca có giá trị cao nhất, trong khi nhóm scale ATK hoặc sát thương nguyên tố hưởng lợi từ hai bản ca còn lại. Vì Sub DPS thường có cửa sổ burst ngắn, buff chỉ có giá trị nếu burst trùng với 10s hiệu lực; nếu kỹ năng và burst bước vào hồi chiêu ngoài cửa sổ 30s thì buff bị lãng phí. Tier điều chỉnh từ S xuống A vì giá trị phụ thuộc nhóm nhân vật và chỉ phủ 10/30s, không phải vì bản ca EM luôn kém. | kích hoạt khi nhân vật ra sân; ba hiệu ứng ngẫu nhiên và không chọn được bản ca; 10s duration / 30s cooldown; cần căn burst window trong 10s hiệu lực; giá trị tùy nhóm: EM có thể hữu ích với Sub DPS scale EM hoặc đội chuyển hóa | CRIT DMG substat; Debut R1: random 10s theme every 30s: +60% ATK / +48% Elemental DMG / +240 EM; R5: 120% / 96% / 480 | genshin-db://weapons/14402, game-facts.json#14402 | false — Tier change is an internal editorial conclusion; no external tier used. Flag stays false. | PENDING | `7976f8d5c0119eba5c393b495e4445f60d22486f2e4b33e6bcb799cbbc620df9` |
| Prototype Amber | 14406 | SUPPORT | R5 | A | MEDIUM | Sau khi dùng Năng Lượng Nạp ở R5, Gilding hồi 6 Năng Lượng mỗi 2s trong 6s cho riêng người cầm, tổng 18 Năng Lượng, còn mỗi thành viên đội chỉ hồi 6% Max HP của chính họ mỗi 2s, tổng 18% Max HP mỗi thành viên trong 6 giây trước modifier hồi máu. Không có hồi năng lượng trực tiếp cho cả đội và chỉ số phụ HP% có giá trị hỗ trợ hồi máu nhưng ít giá trị tấn công. Tier A được giữ lại vì khả năng hồi máu đội hình và hỗ trợ burst của người cầm vẫn đáng kể, nhưng phụ thuộc hoàn toàn vào rotation có dùng Burst thường xuyên. | phải dùng Elemental Burst để kích hoạt; 6 Energy/2s trong 6s chỉ cho người cầm; mỗi thành viên hồi 6% Max HP của chính họ mỗi 2s; tổng 18% Max HP mỗi người trước healing bonus | HP% substat; Gilding R5: wielder regenerates 6 Energy every 2s for 6s = 18 Energy total; All party members regenerate 6% of their own Max HP every 2s for 6s = 18% Max HP total; No team-wide Energy regeneration | genshin-db://weapons/14406, game-facts.json#14406 | false — Corrected explanation is original GenshinHub text from local game facts. Flag stays false. | PENDING | `25d579067f2654c8eb4f591a6eeee33ce0ef78965cb8414621fc69ddc6711e0d` |
| Kagura's Verity | 14509 | SUB_DPS | R1 | A | MEDIUM | Kagura Dance of the Sacred Sakura tạo một tầng khi dùng kỹ năng nguyên tố, mỗi tầng kéo dài 24s, tối đa 3 tầng và chỉ khi đủ 3 tầng thì mới nhận thêm 12% sát thương nguyên tố ở R1. Sub DPS cần ba lần dùng kỹ năng trong cửa sổ còn hiệu lực, nên nhân vật có kỹ năng có thời gian hồi ngắn sẽ tích stack ổn định hơn nhiều. Tier A được giữ với giả định ba stack đạt được trong rotation; nếu không, chỉ phần tăng sát thương kỹ năng được tính và không được cộng full passive. | stack tạo bằng Elemental Skill, không phải bằng thời gian đứng sân; mỗi tầng 24s, tối đa 3; cần 3 lần dùng kỹ năng; 3 stack mới cho +12% elemental DMG ở R1 | CRIT DMG substat; Kagura Dance R1: skill grants 24s stack, +12% Skill DMG and +12% Stellar-Conduct DMG, max 3 stacks, +12% All Elemental DMG at 3 stacks; R5: 24% values | genshin-db://weapons/14509, game-facts.json#14509 | false — Explanation rewritten from local game facts; no external editorial text. Flag stays false. | PENDING | `50bf4af224937eaf825459f7c2dab84aea3cd36c634493631a606862acb9b381` |
| The Stringless | 15402 | SUB_DPS | R1 | S | MEDIUM | Arrowless Song ở R1 tăng 24% sát thương kỹ năng và năng lượng, kết hợp với chỉ số phụ Tinh Thông phù hợp với Sub DPS dùng kỹ năng để gây sát thương. Hiệu quả phản ứng vẫn phụ thuộc vào đội hình, nhưng bản thân mức tăng sát thương kỹ năng và năng lượng hoạt động độc lập với điều kiện đó. Vì vậy tier S được giữ như đánh giá độc lập, không suy từ tần suất được khuyến nghị. | R1 baseline; Sub DPS dùng kỹ năng và năng lượng; đội hình có thể kích hoạt phản ứng | EM substat; Arrowless Song R1: +24% Elemental Skill and Burst DMG; R5: +48% | genshin-db://weapons/15402, game-facts.json#15402 | false — Evidence pointer normalized to resolvable genshin-db and local game facts. Flag stays false. | PENDING | `c4ded204a2e3c98b210583071984ca6607cb109d47de5e861fbb671e29bdc448` |
| Aqua Simulacra | 15508 | MAIN_DPS | R1 | S | MEDIUM | The Cleansing Form ở R1 tăng 16% HP và tăng 20% sát thương khi có kẻ địch ở gần, hiệu ứng vẫn có tác dụng dù nhân vật đang ngoài sân. Chỉ số phụ CRIT DMG và mức tăng sát thương 20% là giá trị cốt lõi, trong khi phần HP chỉ có ích với nhân vật biết tận dụng hoặc cần độ bền. Điều kiện địch ở gần gần như luôn thỏa mãn trong chiến đấu thực tế, nhưng tier S được giữ thay vì SS vì buff khiêm tốn và giá trị HP không phổ dụng cho Main DPS cung. | phải có kẻ địch ở gần; buff có hiệu lực cả khi off-field; R1: +16% HP và +20% DMG; CRIT DMG là substat | CRIT DMG substat; The Cleansing Form R1: +16% HP, +20% DMG when opponents are nearby, effective on-field and off-field; R5: +32% HP, +40% DMG; NOT a 'no enemies nearby' condition | genshin-db://weapons/15508, game-facts.json#15508 | false — Corrected condition comes from local game facts; tier is independently judged. Flag stays false. | PENDING | `07431e870377f01815f9d071b363040a5f7124c5b3420308382a71620e0874e8` |

## 2. 13 candidates eligible for Admin review (Group A)

- **Favonius Sword (11401)** — SUPPORT, R1, proposed **SS**, confidence HIGH. Checksum `99bcedcc30f03b29008f31285c00fdcac1a19dd0337c30764060c99bcfa9dce9`. Decision: **PENDING**.
- **Sacrificial Sword (11403)** — SUB_DPS, R5, proposed **S**, confidence MEDIUM. Checksum `79833088e0284741a1401b572af8f51788c55f627225a0df02f2260bf90cd257`. Decision: **PENDING**.
- **Xiphos' Moonlight (11418)** — SUPPORT, R1, proposed **S**, confidence MEDIUM. Checksum `3e268bac16e789d3ddc732a562f5d8db4678f94784f663e5828da8683e36bda7`. Decision: **PENDING**.
- **Light of Foliar Incision (11512)** — MAIN_DPS, R1, proposed **S**, confidence MEDIUM. Checksum `ff161813968954a2eaf2387b04eed7da6232e9846328160079f571c99e047929`. Decision: **PENDING**.
- **Wolf's Gravestone (12502)** — SUPPORT, R1, proposed **A**, confidence MEDIUM. Checksum `4831c47ef50dd9ec4481101b0c0e408a29b7215e0c78bd3e433503ebbecf6724`. Decision: **PENDING**.
- **Favonius Lance (13407)** — SUPPORT, R1, proposed **SS**, confidence HIGH. Checksum `9c05a3f28683a33234e1ad912882ad281822e53c0db41dcb3944d06212b83e0e`. Decision: **PENDING**.
- **Staff of Homa (13501)** — MAIN_DPS, R1, proposed **SS**, confidence HIGH. Checksum `af208d96f8a5d859d1ed54bcc35d7c95122decec2c7897705aba62282cb17e86`. Decision: **PENDING**.
- **Thrilling Tales of Dragon Slayers (14302)** — SUPPORT, R5, proposed **S**, confidence MEDIUM. Checksum `14e2cd13fc59cf36709fcf2189ad9f9ea825f4c76adfd669b1d4fcc9667f7c57`. Decision: **PENDING**.
  - Tier change requires separate confirmation: **SS → S**.
- **The Widsith (14402)** — SUB_DPS, R1, proposed **A**, confidence MEDIUM. Checksum `7976f8d5c0119eba5c393b495e4445f60d22486f2e4b33e6bcb799cbbc620df9`. Decision: **PENDING**.
  - Tier change requires separate confirmation: **S → A**.
- **Prototype Amber (14406)** — SUPPORT, R5, proposed **A**, confidence MEDIUM. Checksum `25d579067f2654c8eb4f591a6eeee33ce0ef78965cb8414621fc69ddc6711e0d`. Decision: **PENDING**.
- **Kagura's Verity (14509)** — SUB_DPS, R1, proposed **A**, confidence MEDIUM. Checksum `50bf4af224937eaf825459f7c2dab84aea3cd36c634493631a606862acb9b381`. Decision: **PENDING**.
- **The Stringless (15402)** — SUB_DPS, R1, proposed **S**, confidence MEDIUM. Checksum `c4ded204a2e3c98b210583071984ca6607cb109d47de5e861fbb671e29bdc448`. Decision: **PENDING**.
- **Aqua Simulacra (15508)** — MAIN_DPS, R1, proposed **S**, confidence MEDIUM. Checksum `07431e870377f01815f9d071b363040a5f7124c5b3420308382a71620e0874e8`. Decision: **PENDING**.

These 13 can be presented as a review batch. A partial import may select any subset once real approvals exist.

## 3. Favonius Greatsword 12401 — blocked (Group B)

- Candidate retained: `independent-12401-SUB_DPS-R1`, **not deleted**.
- Draft recommendation: `NEEDS_MORE_EVIDENCE`; required decision: **REQUEST_CHANGES**; it is not in the importable batch.
- Role / refinement / proposed tier: SUB_DPS / R1 / **A**, confidence **LOW**.
- Frozen explanation: Windfall ở R1 cho 60% xác suất tạo 6 Năng Lượng mỗi 12s khi bạo kích, và chỉ số phụ Năng Lượng Nạp giúp bản thân người cầm xoay vòng tốt hơn. Sub DPS trọng kiếm thường ở sân ngắn, nên nội tại chỉ sinh hạt nếu có cửa sổ đứng sân để gây bạo kích và tỷ lệ bạo kích đủ cao. Vì thời gian kích hoạt không đảm bảo trong mọi rotation, tier A được giữ kèm độ tin cậy thấp và không được nâng lên khi thiếu điều kiện uptime.
- Checksum: `4c6d8185295e9e7abb9f1fdab6d682b85569c5d8b12ca1cbab8e67d20dff051a`.

Evidence still required before the block can be lifted:

- [ ] CRIT Rate assumptions (`critRateAssumptions`)
- [ ] Passive proc conditions (`passiveProcConditions`)
- [ ] Rotation (`rotation`)
- [ ] Field-time requirements (`fieldTimeRequirements`)
- [ ] Energy generation assumptions (`energyGenerationAssumptions`)
- [ ] Rubric justification (`rubricJustification`)

Missing: **CRIT Rate assumptions, Passive proc conditions, Rotation, Field-time requirements, Energy generation assumptions, Rubric justification**. Import stays blocked until all six evidence fields, a real supplementing actor and a timestamp are supplied, and an Admin explicitly changes the decision to APPROVE.

## 4. Two changed tiers — separate Admin confirmation

### Thrilling Tales of Dragon Slayers (14302) — SUPPORT R5

- **SS → S** — previous `SS`, proposed `S`.
- Reason: OLD_TIER=SS → PROPOSED_TIER=S. Lý do: buff 48% ATK chỉ áp dụng cho nhân vật vào sân kế tiếp, chỉ có ý nghĩa với carry scale ATK và phủ 10/20s; SS đòi hỏi tính phổ dụng mà record không chứng minh được.
- Conditions: buff ATK cho nhân vật vào sân ngay sau người cầm; người cầm phải swap out đúng trình tự; 10s duration / 20s cooldown; chỉ có giá trị nếu carry scale ATK
- Exact facts: HP% substat; Heritage R5: +48% ATK for incoming character for 10s, 20s ICD; R1: +24% ATK
- Separate confirmation required: **yes**; currently **NOT confirmed**.

### The Widsith (14402) — SUB_DPS R1

- **S → A** — previous `S`, proposed `A`.
- Reason: OLD_TIER=S → PROPOSED_TIER=A. Lý do: giá trị thay đổi theo nhóm nhân vật (EM có thể là bản ca tốt với Sub DPS scale EM, không phải luôn vô dụng), cộng thêm buff chỉ 10s trên chu kỳ 30s và dễ lệch burst window; A phản ánh kỳ vọng thực tế thay vì buff tốt nhất.
- Conditions: kích hoạt khi nhân vật ra sân; ba hiệu ứng ngẫu nhiên và không chọn được bản ca; 10s duration / 30s cooldown; cần căn burst window trong 10s hiệu lực; giá trị tùy nhóm: EM có thể hữu ích với Sub DPS scale EM hoặc đội chuyển hóa
- Exact facts: CRIT DMG substat; Debut R1: random 10s theme every 30s: +60% ATK / +48% Elemental DMG / +240 EM; R5: 120% / 96% / 480
- Separate confirmation required: **yes**; currently **NOT confirmed**.

The Widsith detail: three random themes (60% ATK / 48% Elemental DMG / 240 EM at R1) last 10s on a 30s cycle; the theme cannot be chosen, the burst window must fit inside 10s, and the EM theme is group-dependent rather than useless.

Approving a record does **not** approve its tier change; the importer requires both `tierReReviewConfirmed` and `tierChangeReviewConfirmed`.

## 5. Missing per-record decisions

| Weapon | ID | Decision | Still required |
|---|---|---|---|
| Favonius Sword | 11401 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Sacrificial Sword | 11403 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Xiphos' Moonlight | 11418 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Light of Foliar Incision | 11512 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Wolf's Gravestone | 12502 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Favonius Lance | 13407 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Staff of Homa | 13501 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Thrilling Tales of Dragon Slayers | 14302 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged, tierChangeReviewConfirmed |
| The Widsith | 14402 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged, tierChangeReviewConfirmed |
| Prototype Amber | 14406 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Kagura's Verity | 14509 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| The Stringless | 15402 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Aqua Simulacra | 15508 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged |
| Favonius Greatsword | 12401 | PENDING | APPROVE/REQUEST_CHANGES/REJECT decision, real adminActor, decidedAt, reason, rightsVerified + rightsVerifiedBy, evidenceAcknowledged, six evidence supplements |

## 6. Publish-rights verification status

- Rankings were built independently with the internal rubric.
- Explanations are original GenshinHub Vietnamese text; no Genshin-Builds editorial ranking was copied.
- Game facts come from local `genshin-db@5.2.15` with per-record attribution in `evidence`.
- The 296 `SOURCE_DERIVED` research records are **not** used as official rankings.
- All 14 flags are `publishRightsVerified = false`; none is set by automation.

| ID | Flag | Original | Independent | Editorial copy | Attribution |
|---|---|---|---|---|---|
| 11401 | false | true | true | false | true |
| 11403 | false | true | true | false | true |
| 11418 | false | true | true | false | true |
| 11512 | false | true | true | false | true |
| 12502 | false | true | true | false | true |
| 13407 | false | true | true | false | true |
| 13501 | false | true | true | false | true |
| 14302 | false | true | true | false | true |
| 14402 | false | true | true | false | true |
| 14406 | false | true | true | false | true |
| 14509 | false | true | true | false | true |
| 15402 | false | true | true | false | true |
| 15508 | false | true | true | false | true |
| 12401 | false | true | true | false | true |

## 7. Safe partial-import dry-run

Executed: `node scripts/weapon-tier-independent/import-approved.cjs` (no `--apply`). Captured to `docs/weapon-tier-independent/partial-import-dry-run.json`.

| Metric | Value |
|---|---|
| Mode | DRY_RUN |
| Selection | all |
| Eligible | 0 |
| Blocked | 14 |
| Skipped | 0 |
| Changed | 0 |
| Write count | 0 |
| Fatal issues | 2 |
| Freeze OK | true |

Blocked reasons (Group B shown explicitly):

- `12401`: ADMIN_DECISION_PENDING; FAKE_OR_MISSING_ACTOR; MISSING_RECORD_DECIDED_AT; MISSING_DECISION_REASON; GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED; RIGHTS_NOT_VERIFIED_BY_ADMIN; GROUP_B_EVIDENCE_INCOMPLETE:critRateAssumptions,passiveProcConditions,rotation,fieldTimeRequirements,energyGenerationAssumptions,rubricJustification; GROUP_B_EVIDENCE_ACTOR_MISSING; GROUP_B_EVIDENCE_DATE_MISSING
- `11401`: ADMIN_DECISION_PENDING; FAKE_OR_MISSING_ACTOR; MISSING_RECORD_DECIDED_AT; MISSING_DECISION_REASON; GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED; RIGHTS_NOT_VERIFIED_BY_ADMIN
- `11403`: ADMIN_DECISION_PENDING; FAKE_OR_MISSING_ACTOR; MISSING_RECORD_DECIDED_AT; MISSING_DECISION_REASON; GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED; RIGHTS_NOT_VERIFIED_BY_ADMIN
- `11418`: ADMIN_DECISION_PENDING; FAKE_OR_MISSING_ACTOR; MISSING_RECORD_DECIDED_AT; MISSING_DECISION_REASON; GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED; RIGHTS_NOT_VERIFIED_BY_ADMIN

Partial selection is supported: `--only <candidateId[,id...]>` or `--weapon-ids <id[,id...]>`. Selecting only approved Group A rows produces a smaller write set; Favonius Greatsword is always blocked until its six evidence fields are supplied.

## 8. Test results

All suites were executed **sequentially**. B3.1 additions cover: partial import selection, real Admin authorization (server-derived actor), decision-sheet tampering, checksum mismatch, false `publishRightsVerified`, pending/rejected exclusion, auth-bypass rejection, source-derived exclusion, Group B evidence gate, audit-log integrity, concurrent-modification guard and approved-only public GraphQL.

| Suite | Result |
|---|---|
| `weaponTierRanking.test.ts` (service) | 17/17 pass |
| `weaponTierRanking.graphql.test.ts` (guards) | 5/5 pass |
| `migration.test.ts` | 5/5 pass |
| `db.integration.test.ts` | 3/3 pass |
| `weaponTierDataloader.test.ts` | 2/2 pass |
| `dataloaders/index.test.ts` | 1/1 pass |
| `weapon-tier-audit/tier-map.test.cjs` | 4/4 pass |
| `weapon-tier-audit/pipeline.test.cjs` | 5/5 pass |
| `game-facts.test.cjs` | 5/5 pass |
| `independent.test.cjs` | 6/6 pass |
| `approval.test.cjs` | 9/9 pass |
| `freeze.test.cjs` (now includes two-pass concurrent-edit guard) | 7/7 pass |
| `import-guard.test.cjs` (partial import, auth, rights, checksum, bypass, Group B) | 15/15 pass |
| `migration-integrity.test.cjs` | 4/4 pass |
| `admin-review.test.cjs` (sheet + report contract) | 8/8 pass |

**Total: 96 tests executed sequentially, 96 passed, 0 failed.**

`prisma validate`, `prisma migrate status` (4 migrations, schema up to date), `tsc --noEmit` and `node --check` on all B3.1 scripts pass. Live read-only GraphQL: `weaponTierRanks(limit: 5)` → `[]`; `adminWeaponTierRanks` without a key → `Unauthorized`. No authenticated admin query was exercised (no key in this environment); guard behaviour is covered by the passing GraphQL/service tests.

## 9. Files changed

- `backend/scripts/weapon-tier-independent/freeze.cjs` — exported pure `assertStable`, added B3.1 fields to the decision template. Frozen source content unchanged.
- `backend/scripts/weapon-tier-independent/import-approved.cjs` — partial selection, Eligible/Blocked/Skipped/Changed counts, auth-bypass rejection, Group B evidence gate, source-derived exclusion, pre-write freeze re-check.
- `backend/scripts/weapon-tier-independent/build-admin-review.cjs` — new Admin Review Sheet + report builder.
- `backend/scripts/weapon-tier-independent/admin-review.test.cjs`, `import-guard.test.cjs` — new and updated B3.1 tests.
- `docs/weapon-tier-independent/admin-review-sheet.json` — generated Admin Review Sheet.
- `docs/weapon-tier-independent/partial-import-dry-run.json` — captured dry-run.
- `docs/weapon-tier-audit/PHASE_B3_1_FINAL_ADMIN_REVIEW.md` — this report.
- `backend/scripts/weapon-tier-independent/admin-decisions.input.json` — decision input metadata only; all decisions still PENDING, no actor/rights/authentication bypass.

No frozen source (tier, explanation, checksum) was changed. No migration, production write, commit, push, reset, stash or UI change was made.

**Status: waiting for real Admin confirmation of content and publish rights. No automatic approval or import.**

