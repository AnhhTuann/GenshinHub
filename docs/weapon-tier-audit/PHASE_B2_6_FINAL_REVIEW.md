# Phase B2.6 — final review & approval package (data only)

**Date:** 2026-11-20  
**Scope:** correct exact passive facts for all 14 independent Weapon Tier candidates, re-derive tiers where needed, complete the final approval package. **No ranking was approved, inserted or written to any database.**

| Check | State |
|---|---|
| Candidates reviewed | 14 |
| Final recommendation | 13 × READY_FOR_ADMIN_REVIEW, 1 × NEEDS_MORE_EVIDENCE |
| Tier changes | 2 (14302 SS→S, 14402 S→A) |
| Mandatory tier re-review | 3 |
| Publish rights verified | 0 (all flags remain false) |
| WeaponTierRank / WeaponTierAudit at review | 0 / 0 |
| Migrations touched | 0 |
| Admin approvals cast | 0 |

---

## 1. Final approval table

| Weapon | Type | Role | R | Old Tier | Proposed Tier | Confidence | Review Status |
|---|---|---|---|---|---|---|---|
| Favonius Sword (11401) | SWORD | SUPPORT | R1 | SS | SS | HIGH | READY_FOR_ADMIN_REVIEW |
| Sacrificial Sword (11403) | SWORD | SUB_DPS | R5 | S | S | MEDIUM | READY_FOR_ADMIN_REVIEW |
| Xiphos' Moonlight (11418) | SWORD | SUPPORT | R1 | S | S | MEDIUM | READY_FOR_ADMIN_REVIEW |
| Light of Foliar Incision (11512) | SWORD | MAIN_DPS | R1 | S | S | MEDIUM | READY_FOR_ADMIN_REVIEW |
| Wolf's Gravestone (12502) | CLAYMORE | SUPPORT | R1 | A | A | MEDIUM | READY_FOR_ADMIN_REVIEW |
| Favonius Greatsword (12401) | CLAYMORE | SUB_DPS | R1 | A | A | LOW | NEEDS_MORE_EVIDENCE — not importable |
| Favonius Lance (13407) | POLEARM | SUPPORT | R1 | SS | SS | HIGH | READY_FOR_ADMIN_REVIEW |
| Staff of Homa (13501) | POLEARM | MAIN_DPS | R1 | SS | SS | HIGH | READY_FOR_ADMIN_REVIEW |
| Thrilling Tales of Dragon Slayers (14302) | CATALYST | SUPPORT | R5 | SS | S | MEDIUM | READY_FOR_ADMIN_REVIEW — **mandatory tier re-review** (SS→S) |
| The Widsith (14402) | CATALYST | SUB_DPS | R1 | S | A | MEDIUM | READY_FOR_ADMIN_REVIEW — **mandatory tier re-review** (S→A) |
| Prototype Amber (14406) | CATALYST | SUPPORT | R5 | A | A | MEDIUM | READY_FOR_ADMIN_REVIEW |
| Kagura's Verity (14509) | CATALYST | SUB_DPS | R1 | A | A | MEDIUM | READY_FOR_ADMIN_REVIEW |
| The Stringless (15402) | BOW | SUB_DPS | R1 | S | S | MEDIUM | READY_FOR_ADMIN_REVIEW |
| Aqua Simulacra (15508) | BOW | MAIN_DPS | R1 | S | S | MEDIUM | READY_FOR_ADMIN_REVIEW |

`READY_FOR_ADMIN_REVIEW` means the draft is *prepared* for a decision. It does not mean approved, published or rights-verified. Every row still needs an explicit Admin action with an admin key.

## 2. Tier changes after fact correction

- **Thrilling Tales of Dragon Slayers (14302)**: OLD_TIER = `SS`, PROPOSED_TIER = `S`.
  - Reason: OLD_TIER=SS → PROPOSED_TIER=S. Lý do: buff 48% ATK chỉ áp dụng cho nhân vật vào sân kế tiếp, chỉ có ý nghĩa với carry scale ATK và phủ 10/20s; SS đòi hỏi tính phổ dụng mà record không chứng minh được.
  - Evidence: HP% substat | Heritage R5: +48% ATK for incoming character for 10s, 20s ICD | R1: +24% ATK
  - Admin re-review: required before any approve/reject.
- **The Widsith (14402)**: OLD_TIER = `S`, PROPOSED_TIER = `A`.
  - Reason: OLD_TIER=S → PROPOSED_TIER=A. Lý do: giá trị thay đổi theo nhóm nhân vật (EM có thể là bản ca tốt với Sub DPS scale EM, không phải luôn vô dụng), cộng thêm buff chỉ 10s trên chu kỳ 30s và dễ lệch burst window; A phản ánh kỳ vọng thực tế thay vì buff tốt nhất.
  - Evidence: CRIT DMG substat | Debut R1: random 10s theme every 30s: +60% ATK / +48% Elemental DMG / +240 EM | R5: 120% / 96% / 480
  - Admin re-review: required before any approve/reject.

All 12 other records keep their B2 tier and store `oldTier = tier` plus a written reason, so no tier change is silent.

## 3. Per-candidate review

### 1. Favonius Sword — 11401 (independent-11401-SUPPORT-R1)

- **Type / Role / Refinement:** SWORD / SUPPORT / R1
- **Tier:** SS · **Confidence:** HIGH
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Chỉ số phụ Năng Lượng Nạp và Windfall ở R1 cho xác suất 60% tạo 6 Năng Lượng mỗi 12s khi đánh bạo kích, nên cơ chế sinh hạt đã hoạt động mà không cần tinh luyện sâu. Điều kiện là người cầm phải đạt tỷ lệ bạo kích đủ dùng và có mặt trên sân để gây bạo kích. Đây là đánh giá độc lập theo tiêu chí sinh năng lượng và tính phổ dụng của vai trò Support, không dựa trên độ hiếm hay danh sách nhân vật đề xuất.

**Exact passive facts**

- Effect in genshin-db: `Windfall`, substat `FIGHT_PROP_CHARGE_EFFICIENCY`, rarity 4
- Source R1 values: `["60%","12"]`
- Source R1 text: CRIT Hits have a 60% chance to generate a small amount of Elemental Particles, which will regenerate 6 Energy for the character. Can only occur once every 12s.
- Validated exact facts:
  - ER substat
  - Windfall R1: 60% chance, 6 Energy, 12s ICD
  - Windfall R5: 100% chance, 6s ICD

**Gameplay conditions**

- có tỷ lệ bạo kích đủ dùng
- phải ra sân để gây bạo kích
- R1 là mức đánh giá

**Rubric assessment (v1.1, SUPPORT)**

Re-checked: passive trigger is on-field crit, so universality is conditional but easily met for sword supports. SS kept as a role judgement, not from rarity or recommended-user lists.

- Criteria applied: Energy generation, Team flexibility, Passive trigger conditions
- Sensitivity analysis: Nếu người cầm không đạt crit rate hoặc không có cửa sổ ra sân, giá trị giảm rõ rệt; R5 chỉ rút chu kỳ xuống 6s và tăng xác suất lên 100%, không đổi bản chất vai trò.

**Evidence references**

- genshin-db://weapons/11401
- game-facts.json#11401

**Reason for tier**

SS giữ nguyên: sinh hạt ER ở R1 hoạt động ngay, phổ dụng cho Support kiếm cần xoay vòng; điều kiện bạo kích được ghi rõ nên không phải buff không điều kiện.

**Known limitations**

- không sinh hạt khi off-field
- phụ thuộc CRIT Rate

**Rights verification status**

`publishRightsVerified = false` — Original Vietnamese explanation, internal rubric v1.1, genshin-db facts only. Eligible for explicit admin rights verification; flag stays false.

**Admin decision required**

Verify rights explicitly, then approve or reject R1 / Support / SS with an admin key.

### 2. Sacrificial Sword — 11403 (independent-11403-SUB_DPS-R5)

- **Type / Role / Refinement:** SWORD / SUB_DPS / R5
- **Tier:** S · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Composed ở R5 có xác suất 80% đặt lại thời gian hồi kỹ năng sau khi kỹ năng gây sát thương cho địch, với chu kỳ tối đa một lần mỗi 16s. Để sub DPS hưởng lợi, nhân vật phải trở lại sân và dùng lại kỹ năng, đồng thời kỹ năng đó phải trúng địch; vì vậy lợi ích không được giả định là luôn xảy ra. Lần dùng kỹ năng thứ hai có thể tạo thêm hạt nếu kỹ năng sinh hạt, nhưng cần một cửa sổ ngắn trên sân trong xoay vòng. Với điều kiện được ghi rõ, tier S phản ánh giá trị khi reset hoạt động, không phải mức tự động cho mọi nhân vật.

**Exact passive facts**

- Effect in genshin-db: `Composed`, substat `FIGHT_PROP_CHARGE_EFFICIENCY`, rarity 4
- Source R5 values: `["80%","16s"]`
- Source R5 text: After damaging an opponent with an Elemental Skill, the skill has a 80% chance to end its own CD. Can only occur once every 16s.
- Validated exact facts:
  - Composed R1: skill must damage opponent, 40% chance, 30s ICD
  - Composed R5: 80% chance, 16s ICD

**Gameplay conditions**

- kỹ năng phải gây damage để có cơ hội reset
- xác suất 80% và ICD 16s ở R5
- cần on-field recast trong rotation
- không giả định reset luôn proc

**Rubric assessment (v1.1, SUB_DPS)**

Re-checked trigger, ICD, recast and energy impact. S kept with explicit rotation condition; reset is not assumed in every rotation.

- Criteria applied: Off-field damage potential, Passive trigger conditions, Energy considerations, Rotation assumptions
- Sensitivity analysis: Nếu kỹ năng không sinh hạt hoặc không có chỗ cho recast, giá trị giảm; R1 chỉ 40%/30s nên không thể dùng chung kết luận R5.

**Evidence references**

- genshin-db://weapons/11403
- game-facts.json#11403

**Reason for tier**

S giữ nguyên nhưng kèm điều kiện: reset R5 mạnh (80%/16s) chỉ chuyển thành sát thương và năng lượng khi kỹ năng trúng địch và có lần recast trên sân.

**Known limitations**

- reset không tự động xảy ra
- phụ thuộc kỹ năng trúng địch
- cần thời gian trên sân

**Rights verification status**

`publishRightsVerified = false` — Explanation rewritten independently; no external editorial text. Flag stays false.

**Admin decision required**

Verify rights, then approve/reject R5 / Sub DPS / S with the recorded recast condition.

### 3. Xiphos' Moonlight — 11418 (independent-11418-SUPPORT-R1)

- **Type / Role / Refinement:** SWORD / SUPPORT / R1
- **Tier:** S · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Jinni's Whisper ở R1 chuyển 0,036% Năng Lượng Nạp cho mỗi điểm Tinh Thông trong 12s, kích hoạt mỗi 10s và chia 30% cho đồng đội gần đó. Hiệu ứng vẫn chạy khi người cầm không ra sân, nhưng tỷ lệ chia sẻ phụ thuộc vào việc xây dựng đủ Tinh Thông. Đánh giá S phản ánh giá trị năng lượng đội hình có điều kiện, không phải mức phổ dụng như một nguồn hồi năng lượng không điều kiện.

**Exact passive facts**

- Effect in genshin-db: `Jinni's Whisper`, substat `FIGHT_PROP_ELEMENT_MASTERY`, rarity 4
- Source R1 values: `["0.036%"]`
- Source R1 text: The following effect will trigger every 10s: The equipping character will gain 0.036% Energy Recharge for each point of Elemental Mastery they possess for 12s, with nearby party members gaining 30% of this buff for the same duration. Multiple instances of this weapon can allow this buff to stack. This effect will still trigger even if the character is not on the field.
- Validated exact facts:
  - EM substat
  - Jinni's Whisper R1: 0.036% ER per EM for 12s every 10s, 30% shared
  - R5 coefficient 0.072%

**Gameplay conditions**

- cần đầu tư Tinh Thông
- tự động kích hoạt mỗi 10s kể cả off-field
- chia 30% cho đồng đội gần

**Rubric assessment (v1.1, SUPPORT)**

Re-checked off-field trigger and party share. S reflects the EM-investment condition; not treated as universal energy like Favonius.

- Criteria applied: Energy generation, Passive trigger conditions, Team restrictions
- Sensitivity analysis: Nếu bỏ EM, buff gần như mất giá trị; R5 nhân đôi hệ số nhưng không đổi điều kiện EM.

**Evidence references**

- genshin-db://weapons/11418
- game-facts.json#11418

**Reason for tier**

S giữ nguyên: buff ER đội hình có điều kiện EM, chạy off-field nhưng không phổ dụng như Favonius.

**Known limitations**

- phụ thuộc EM
- buff chia sẻ chỉ 30%

**Rights verification status**

`publishRightsVerified = false` — Independent mechanical analysis; no external ranking text. Flag stays false.

**Admin decision required**

Verify rights, then approve/reject R1 / Support / S.

### 4. Light of Foliar Incision — 11512 (independent-11512-MAIN_DPS-R1)

- **Type / Role / Refinement:** SWORD / MAIN_DPS / R1
- **Tier:** S · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Whitemoon Bristle ở R1 tăng 4% CRIT Rate và cộng 120% Tinh Thông vào sát thương đòn thường cùng kỹ năng sau khi đòn thường gây sát thương nguyên tố, tồn tại 12s hoặc 28 lần nhận sát thương. Chỉ số phụ CRIT DMG khớp với hiệu ứng này nhưng lợi ích chỉ trọn vẹn khi nhân vật duy trì đòn thường và có hệ số Tinh Thông đáng kể. Vì điều kiện đó, tier S được giữ làm đánh giá có điều kiện thay vì suy từ rarity 5 sao.

**Exact passive facts**

- Effect in genshin-db: `Whitemoon Bristle`, substat `FIGHT_PROP_CRITICAL_HURT`, rarity 5
- Source R1 values: `["4%","120%"]`
- Source R1 text: CRIT Rate is increased by 4%. After Normal Attacks deal Elemental DMG, the Foliar Incision effect will be obtained, increasing DMG dealt by Normal Attacks and Elemental Skills by 120% of Elemental Mastery. This effect will disappear after 28 DMG instances or 12s. You can obtain Foliar Incision once every 12s.
- Validated exact facts:
  - CRIT DMG substat
  - Whitemoon Bristle R1: +4% CRIT Rate, 120% EM added to NA/Skill DMG, 28 instances or 12s
  - R5: +8% CRIT Rate, 240% EM

**Gameplay conditions**

- đòn thường phải gây sát thương nguyên tố
- duy trì đòn thường trong 12s hoặc 28 lần
- cần CRIT Rate và EM

**Rubric assessment (v1.1, MAIN_DPS)**

Re-checked passive compatibility and uptime. S kept as conditional: normal attacks must deal elemental DMG and EM must matter.

- Criteria applied: Personal damage contribution, Passive compatibility, Practical uptime, Team assumptions
- Sensitivity analysis: Nhân vật không dùng đòn thường hoặc không scale EM gần như không hưởng lợi; R5 tăng lên 8% CRIT Rate và 240% EM nhưng điều kiện không đổi.

**Evidence references**

- genshin-db://weapons/11512
- game-facts.json#11512

**Reason for tier**

S giữ nguyên: passive mạnh nhưng bị khóa bởi đòn thường gây sát thương nguyên tố và hệ số EM, nên không xếp SS tổng quát.

**Known limitations**

- không phù hợp mọi kiếm
- điều kiện 28 lần nhận sát thương có thể cắt ngắn buff

**Rights verification status**

`publishRightsVerified = false` — Rubric-based independent explanation; game facts from genshin-db. Flag stays false.

**Admin decision required**

Verify rights, then approve/reject R1 / Main DPS / S.

### 5. Wolf's Gravestone — 12502 (independent-12502-SUPPORT-R1)

- **Type / Role / Refinement:** CLAYMORE / SUPPORT / R1
- **Tier:** A · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Wolfish Tracker ở R1 tăng 20% ATK cho người cầm và 40% ATK cho cả đội trong 12s khi đánh trúng mục tiêu dưới 30% HP, với chu kỳ 30s. Buff mang lại giá trị hỗ trợ rõ nhưng điều kiện HP thấp và thời gian phủ 12s trên chu kỳ 30s khiến hiệu quả không liên tục. Chỉ số phụ ATK% không bổ sung năng lượng hay tiện ích đội hình, nên tier A được giữ sau khi xét cả điều kiện lẫn thời gian phủ.

**Exact passive facts**

- Effect in genshin-db: `Wolfish Tracker`, substat `FIGHT_PROP_ATTACK_PERCENT`, rarity 5
- Source R1 values: `["20%","40%"]`
- Source R1 text: Increases ATK by 20%. On hit, attacks against opponents with less than 30% HP increase all party members' ATK by 40% for 12s. Can only occur once every 30s.
- Validated exact facts:
  - ATK% substat
  - Wolfish Tracker R1: +20% self ATK, +40% party ATK for 12s on targets below 30% HP, 30s ICD
  - R5: +40% / +80%

**Gameplay conditions**

- mục tiêu phải dưới 30% HP
- phải đánh trúng để kích hoạt
- chu kỳ 30s, buff 12s

**Rubric assessment (v1.1, SUPPORT)**

Re-checked buff condition and 12s/30s uptime. A kept; no team energy and no universal utility.

- Criteria applied: Team buffs, Buff uptime, Passive conditions, Role fit
- Sensitivity analysis: Nếu đội không scale ATK hoặc không duy trì được mốc HP thấp, giá trị giảm; R5 tăng lên 80% nhưng điều kiện và uptime vẫn vậy.

**Evidence references**

- genshin-db://weapons/12502
- game-facts.json#12502

**Reason for tier**

A giữ nguyên: buff ATK 40% mạnh nhưng có điều kiện HP <30% và uptime 12/30s, thiếu tiện ích năng lượng.

**Known limitations**

- buff ngắt quãng
- không hỗ trợ năng lượng

**Rights verification status**

`publishRightsVerified = false` — Independent evaluation, not based on recommendation counts. Flag stays false.

**Admin decision required**

Verify rights, then approve/reject R1 / Support / A.

### 6. Favonius Greatsword — 12401 (independent-12401-SUB_DPS-R1)

- **Type / Role / Refinement:** CLAYMORE / SUB_DPS / R1
- **Tier:** A · **Confidence:** LOW
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Windfall ở R1 cho 60% xác suất tạo 6 Năng Lượng mỗi 12s khi bạo kích, và chỉ số phụ Năng Lượng Nạp giúp bản thân người cầm xoay vòng tốt hơn. Sub DPS trọng kiếm thường ở sân ngắn, nên nội tại chỉ sinh hạt nếu có cửa sổ đứng sân để gây bạo kích và tỷ lệ bạo kích đủ cao. Vì thời gian kích hoạt không đảm bảo trong mọi rotation, tier A được giữ kèm độ tin cậy thấp và không được nâng lên khi thiếu điều kiện uptime.

**Exact passive facts**

- Effect in genshin-db: `Windfall`, substat `FIGHT_PROP_CHARGE_EFFICIENCY`, rarity 4
- Source R1 values: `["60%","12"]`
- Source R1 text: CRIT Hits have a 60% chance to generate a small amount of Elemental Particles, which will regenerate 6 Energy for the character. Can only occur once every 12s.
- Validated exact facts:
  - ER substat
  - Windfall R1: 60% chance, 6 Energy, 12s ICD, requires CRIT hit
  - R5: 100% chance, 6s ICD

**Gameplay conditions**

- passive cần CRIT hit
- nhân vật phải đứng sân khi kích hoạt
- 60% chance, 12s ICD, 6 Energy ở R1
- cần CRIT Rate đủ

**Rubric assessment (v1.1, SUB_DPS)**

Re-checked Phase B3: on-field CRIT is mandatory for Windfall, and no concrete rotation or uptime evidence exists for a typical off-field claymore Sub DPS. READY status alone is not a reason to approve. Moved back to NEEDS_MORE_EVIDENCE with confidence LOW; tier A is provisional until evidence is supplied.

- Criteria applied: Off-field effectiveness, Passive trigger conditions, Energy considerations, Rotation assumptions
- Sensitivity analysis: Nếu nhân vật chỉ off-field, particle gần như bằng 0; R5 (100%/6s) cải thiện nhưng vẫn cần on-field crit.

**Evidence references**

- genshin-db://weapons/12401
- game-facts.json#12401

**Reason for tier**

A giữ nhưng confidence hạ LOW: lợi ích Sub DPS phụ thuộc cửa sổ on-field để crit, không có bằng chứng uptime ổn định.

**Known limitations**

- không sinh hạt khi off-field
- confidence thấp do thiếu dữ liệu uptime

**Rights verification status**

`publishRightsVerified = false` — Corrected explanation is original; no external text converted. Flag stays false. Rights review is deferred until evidence is complete.

**Admin decision required**

Do not approve yet. Admin should return REQUEST_CHANGES requesting the rotation/CRIT evidence; re-review tier A after evidence is supplied, then verify rights explicitly.

### 7. Favonius Lance — 13407 (independent-13407-SUPPORT-R1)

- **Type / Role / Refinement:** POLEARM / SUPPORT / R1
- **Tier:** SS · **Confidence:** HIGH
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Favonius Lance có chỉ số phụ Năng Lượng Nạp và Windfall ở R1 tạo 6 Năng Lượng với xác suất 60% mỗi 12s khi bạo kích. Điều kiện cần có tỷ lệ bạo kích đủ dùng và một lần đánh trên sân, phù hợp với Support cán dài có thời gian ra sân ngắn. Đây là đánh giá độc lập theo khả năng nuôi xoay vòng đội hình, không lấy từ bảng xếp hạng bên ngoài hay số lượt đề xuất.

**Exact passive facts**

- Effect in genshin-db: `Windfall`, substat `FIGHT_PROP_CHARGE_EFFICIENCY`, rarity 4
- Source R1 values: `["60%","12"]`
- Source R1 text: CRIT Hits have a 60% chance to generate a small amount of Elemental Particles, which will regenerate 6 Energy for the character. Can only occur once every 12s.
- Validated exact facts:
  - ER substat
  - Windfall R1: 60% chance, 6 Energy, 12s ICD
  - R5: 100% chance, 6s ICD

**Gameplay conditions**

- cần CRIT Rate đủ
- phải có một lần đánh trên sân
- R1 baseline

**Rubric assessment (v1.1, SUPPORT)**

Re-checked trigger and role fit. SS kept: team energy is universal within polearm supports once crit condition is met.

- Criteria applied: Energy generation, Passive trigger conditions, Team flexibility
- Sensitivity analysis: Crit rate thấp làm giảm particle; R5 chỉ tăng độ tin cậy, không đổi vai trò Support.

**Evidence references**

- genshin-db://weapons/13407
- game-facts.json#13407

**Reason for tier**

SS giữ nguyên: ER substat cộng particle là tiện ích năng lượng phổ dụng, điều kiện crit được ghi rõ nhưng dễ đáp ứng.

**Known limitations**

- phụ thuộc CRIT Rate

**Rights verification status**

`publishRightsVerified = false` — Internal analysis; no copied ranking text. Flag stays false.

**Admin decision required**

Verify rights, then approve/reject R1 / Support / SS.

### 8. Staff of Homa — 13501 (independent-13501-MAIN_DPS-R1)

- **Type / Role / Refinement:** POLEARM / MAIN_DPS / R1
- **Tier:** SS · **Confidence:** HIGH
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Reckless Cinnabar ở R1 tăng 20% HP và cộng vào ATK một lượng bằng 0,8% Max HP, cộng thêm 1% Max HP khi người cầm dưới 50% HP. Phần chuyển HP sang ATK áp dụng cho mọi người dùng cán dài chứ không chỉ nhân vật scale HP, nên CRIT DMG cùng ATK cộng thêm tạo nền tảng tự đủ mà không cần điều kiện đội hình. Mốc HP thấp chỉ là phần thưởng bổ sung và không được tính vào căn cứ xếp SS, còn nhân vật có Max HP thấp hoặc scale DEF/HP hưởng ít hơn từ phần ATK. Vì vậy SS được đánh giá cho nhóm Main DPS cán dài nói chung dựa trên stats tự đủ, không suy từ trường hợp mạnh nhất của một vài nhân vật.

**Exact passive facts**

- Effect in genshin-db: `Reckless Cinnabar`, substat `FIGHT_PROP_CRITICAL_HURT`, rarity 5
- Source R1 values: `["20%","0.8%","1%"]`
- Source R1 text: HP increased by 20%. Additionally, provides an ATK Bonus based on 0.8% of the wielder's Max HP. When the wielder's HP is less than 50%, this ATK Bonus is increased by an additional 1% of Max HP.
- Validated exact facts:
  - CRIT DMG substat
  - Reckless Cinnabar R1: +20% HP, 0.8% Max HP to ATK, +1% below 50% HP
  - R5: +40% HP, 1.6% / 1.8%

**Gameplay conditions**

- R1 baseline
- phần ATK từ Max HP áp dụng cho mọi cán dài nhưng tỷ lệ hưởng lợi tùy Max HP
- dưới 50% HP chỉ là phần thưởng, không tính vào căn cứ SS
- nhân vật scale DEF/HP hưởng ít hơn từ phần ATK

**Rubric assessment (v1.1, MAIN_DPS)**

Phase B3 cross-character re-check: SS is justified only by the character-agnostic CRIT DMG + HP-to-ATK base, which applies to every polearm user. The low-HP bonus is explicitly excluded from the SS justification. Characters with low Max HP or DEF/HP scaling benefit less, so SS is not inferred from a few standout users or from Recommended Users lists.

- Criteria applied: Effective stat distribution, Personal damage contribution, Team conditions, Role fit
- Sensitivity analysis: SS chỉ đúng nếu người cầm có Max HP đủ lớn để phần chuyển ATK đáng kể; với nhân vật HP thấp hoặc scale DEF/HP thì CRIT DMG vẫn tốt nhưng tier có thể thấp hơn. R5 tăng hệ số nhưng không đổi cấu trúc đánh giá.

**Evidence references**

- genshin-db://weapons/13501
- game-facts.json#13501

**Reason for tier**

SS giữ nguyên: nền tảng CRIT DMG + ATK từ Max HP tự đủ và không giới hạn ở một vài nhân vật; bonus dưới 50% HP bị loại khỏi căn cứ SS. Không dùng danh sách Recommended Users làm bằng chứng.

**Known limitations**

- mốc HP thấp có rủi ro và không được tính vào SS
- lợi ích tùy Max HP
- nhân vật scale DEF/HP hưởng ít hơn từ phần ATK

**Rights verification status**

`publishRightsVerified = false` — Independent tier decision, not from recommended-user lists. Flag stays false.

**Admin decision required**

Verify rights, then approve/reject R1 / Main DPS / SS.

### 9. Thrilling Tales of Dragon Slayers — 14302 (independent-14302-SUPPORT-R5)

- **Type / Role / Refinement:** CATALYST / SUPPORT / R5
- **Tier:** S · **Confidence:** MEDIUM
- **OLD_TIER:** SS
- **PROPOSED_TIER:** S
- **Admin re-review:** required (tier changed)

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Heritage ở R5 tăng 48% ATK trong 10s cho nhân vật vào sân ngay sau người cầm, với chu kỳ 20s và yêu cầu người cầm rời sân đúng trình tự. Buff chỉ có giá trị với nhân vật scale theo ATK và có thời gian phủ 10s trên chu kỳ 20s, nên không phải hỗ trợ phổ dụng cho mọi vai trò Support. Tier được điều chỉnh từ SS xuống S vì giá trị bị giới hạn bởi hệ số scale, thứ tự đổi người và uptime, dù mức buff tại R5 rất cao.

**Exact passive facts**

- Effect in genshin-db: `Heritage`, substat `FIGHT_PROP_HP_PERCENT`, rarity 3
- Source R5 values: `["48%"]`
- Source R5 text: When switching characters, the new character taking the field has their ATK increased by 48% for 10s. This effect can only occur once every 20s.
- Validated exact facts:
  - HP% substat
  - Heritage R5: +48% ATK for incoming character for 10s, 20s ICD
  - R1: +24% ATK

**Gameplay conditions**

- buff ATK cho nhân vật vào sân ngay sau người cầm
- người cầm phải swap out đúng trình tự
- 10s duration / 20s cooldown
- chỉ có giá trị nếu carry scale ATK

**Rubric assessment (v1.1, SUPPORT)**

OLD_TIER=SS, PROPOSED_TIER=S. Reason: buff is ATK-scaler only, applies to the next character, and covers 10/20s. SS threshold of role universality is not met.

- Criteria applied: Team buffs, Buff uptime, Passive conditions, Role universality
- Sensitivity analysis: Nếu carry scale HP/DEF/EM thì gần như vô dụng; R1 chỉ 24% ATK nên không đạt mức như R5.

**Evidence references**

- genshin-db://weapons/14302
- game-facts.json#14302

**Reason for tier**

OLD_TIER=SS → PROPOSED_TIER=S. Lý do: buff 48% ATK chỉ áp dụng cho nhân vật vào sân kế tiếp, chỉ có ý nghĩa với carry scale ATK và phủ 10/20s; SS đòi hỏi tính phổ dụng mà record không chứng minh được.

**Known limitations**

- không hữu ích với carry không scale ATK
- uptime 10/20s
- phụ thuộc thứ tự swap

**Rights verification status**

`publishRightsVerified = false` — Tier lowered by internal rubric, not copied from an external list. Flag stays false.

**Admin decision required**

Mandatory re-review of the SS→S change, then verify rights and approve/reject R5 / Support / S.

### 10. The Widsith — 14402 (independent-14402-SUB_DPS-R1)

- **Type / Role / Refinement:** CATALYST / SUB_DPS / R1
- **Tier:** A · **Confidence:** MEDIUM
- **OLD_TIER:** S
- **PROPOSED_TIER:** A
- **Admin re-review:** required (tier changed)

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Debut kích hoạt khi nhân vật ra sân, cho một trong ba bản ca ngẫu nhiên trong 10s với chu kỳ 30s; ở R1 các mức là 60% ATK, 48% sát thương nguyên tố hoặc 240 Tinh Thông. Bản ca Tinh Thông không nên xem là vô dụng: với Sub DPS scale EM hoặc đội phản ứng chuyển hóa, 240 EM có thể là bản ca có giá trị cao nhất, trong khi nhóm scale ATK hoặc sát thương nguyên tố hưởng lợi từ hai bản ca còn lại. Vì Sub DPS thường có cửa sổ burst ngắn, buff chỉ có giá trị nếu burst trùng với 10s hiệu lực; nếu kỹ năng và burst bước vào hồi chiêu ngoài cửa sổ 30s thì buff bị lãng phí. Tier điều chỉnh từ S xuống A vì giá trị phụ thuộc nhóm nhân vật và chỉ phủ 10/30s, không phải vì bản ca EM luôn kém.

**Exact passive facts**

- Effect in genshin-db: `Debut`, substat `FIGHT_PROP_CRITICAL_HURT`, rarity 4
- Source R1 values: `["60%","48%","240"]`
- Source R1 text: When the character takes the field, they will gain a random theme song for 10s. This can only occur once every 30s. Recitative: ATK is increased by 60%. Aria: Increases all Elemental DMG by 48%. Interlude: Elemental Mastery is increased by 240.
- Validated exact facts:
  - CRIT DMG substat
  - Debut R1: random 10s theme every 30s: +60% ATK / +48% Elemental DMG / +240 EM
  - R5: 120% / 96% / 480

**Gameplay conditions**

- kích hoạt khi nhân vật ra sân
- ba hiệu ứng ngẫu nhiên và không chọn được bản ca
- 10s duration / 30s cooldown
- cần căn burst window trong 10s hiệu lực
- giá trị tùy nhóm: EM có thể hữu ích với Sub DPS scale EM hoặc đội chuyển hóa

**Rubric assessment (v1.1, SUB_DPS)**

Phase B3 re-check: all three themes were assessed by character group. The EM theme is NOT treated as useless — for EM-scaling or transformative-reaction Sub DPS it can be the best theme, while ATK/Elemental-DMG scalers benefit from the other two. A is kept for the general Sub DPS role because value is group-dependent, the buff lasts only 10s per 30s, and it must align with a short burst window; S would require best-case assumptions.

- Criteria applied: Passive trigger conditions, Passive uptime, Field-time requirements, Expected value, Character-group dependence
- Sensitivity analysis: Sub DPS scale EM có thể xếp cao hơn A trong đội phản ứng chuyển hóa; nhóm scale ATK hoặc damage nguyên tố hưởng lợi ở 2/3 bản ca. Nếu burst không trùng 10s hiệu lực hoặc rơi ngoài chu kỳ 30s, giá trị kỳ vọng giảm mạnh.

**Evidence references**

- genshin-db://weapons/14402
- game-facts.json#14402

**Reason for tier**

OLD_TIER=S → PROPOSED_TIER=A. Lý do: giá trị thay đổi theo nhóm nhân vật (EM có thể là bản ca tốt với Sub DPS scale EM, không phải luôn vô dụng), cộng thêm buff chỉ 10s trên chu kỳ 30s và dễ lệch burst window; A phản ánh kỳ vọng thực tế thay vì buff tốt nhất.

**Known limitations**

- 1/3 bản ca nên không chọn được
- uptime 10/30s
- dễ lệch burst window
- giá trị tùy nhóm nhân vật — EM không phải luôn kém

**Rights verification status**

`publishRightsVerified = false` — Tier change is an internal editorial conclusion; no external tier used. Flag stays false.

**Admin decision required**

Mandatory re-review of the S→A change, then verify rights and approve/reject R1 / Sub DPS / A.

### 11. Prototype Amber — 14406 (independent-14406-SUPPORT-R5)

- **Type / Role / Refinement:** CATALYST / SUPPORT / R5
- **Tier:** A · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Sau khi dùng Năng Lượng Nạp ở R5, Gilding hồi 6 Năng Lượng mỗi 2s trong 6s cho riêng người cầm, tổng 18 Năng Lượng, còn mỗi thành viên đội chỉ hồi 6% Max HP của chính họ mỗi 2s, tổng 18% Max HP mỗi thành viên trong 6 giây trước modifier hồi máu. Không có hồi năng lượng trực tiếp cho cả đội và chỉ số phụ HP% có giá trị hỗ trợ hồi máu nhưng ít giá trị tấn công. Tier A được giữ lại vì khả năng hồi máu đội hình và hỗ trợ burst của người cầm vẫn đáng kể, nhưng phụ thuộc hoàn toàn vào rotation có dùng Burst thường xuyên.

**Exact passive facts**

- Effect in genshin-db: `Gilding`, substat `FIGHT_PROP_HP_PERCENT`, rarity 4
- Source R5 values: `["6","6%"]`
- Source R5 text: Using an Elemental Burst regenerates 6 Energy every 2s for 6s. All party members will regenerate 6% HP every 2s for this duration.
- Validated exact facts:
  - HP% substat
  - Gilding R5: wielder regenerates 6 Energy every 2s for 6s = 18 Energy total
  - All party members regenerate 6% of their own Max HP every 2s for 6s = 18% Max HP total
  - No team-wide Energy regeneration

**Gameplay conditions**

- phải dùng Elemental Burst để kích hoạt
- 6 Energy/2s trong 6s chỉ cho người cầm
- mỗi thành viên hồi 6% Max HP của chính họ mỗi 2s
- tổng 18% Max HP mỗi người trước healing bonus

**Rubric assessment (v1.1, SUPPORT)**

Fact corrected. Tier A re-derived and kept: team healing and wielder burst support remain useful, but losing the imagined team-energy benefit and having an HP% substat prevent S.

- Criteria applied: Team buffs, Utility, Passive trigger conditions, Burst rotation dependence
- Sensitivity analysis: Nếu người cầm không dùng Burst thường xuyên thì gần như không có giá trị; R1 chỉ 4 Energy và 4% HP nên thấp hơn đáng kể.

**Evidence references**

- genshin-db://weapons/14406
- game-facts.json#14406

**Reason for tier**

A giữ sau correction: mất khoản 'energy cho cả đội' từng được giả định, nhưng vẫn có 18% Max HP heal mỗi thành viên và 18 Energy cho người cầm; HP% substat và phụ thuộc Burst kéo giá trị xuống, không đủ cho S.

**Known limitations**

- không hồi Energy cho đồng đội
- phụ thuộc Burst
- HP% ít giá trị tấn công

**Rights verification status**

`publishRightsVerified = false` — Corrected explanation is original GenshinHub text from local game facts. Flag stays false.

**Admin decision required**

Verify the corrected Gilding facts and verify rights explicitly, then approve/reject R5 / Support / A.

### 12. Kagura's Verity — 14509 (independent-14509-SUB_DPS-R1)

- **Type / Role / Refinement:** CATALYST / SUB_DPS / R1
- **Tier:** A · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Kagura Dance of the Sacred Sakura tạo một tầng khi dùng kỹ năng nguyên tố, mỗi tầng kéo dài 24s, tối đa 3 tầng và chỉ khi đủ 3 tầng thì mới nhận thêm 12% sát thương nguyên tố ở R1. Sub DPS cần ba lần dùng kỹ năng trong cửa sổ còn hiệu lực, nên nhân vật có kỹ năng có thời gian hồi ngắn sẽ tích stack ổn định hơn nhiều. Tier A được giữ với giả định ba stack đạt được trong rotation; nếu không, chỉ phần tăng sát thương kỹ năng được tính và không được cộng full passive.

**Exact passive facts**

- Effect in genshin-db: `Kagura Dance of the Sacred Sakura`, substat `FIGHT_PROP_CRITICAL_HURT`, rarity 5
- Source R1 values: `["12%","12%","12%"]`
- Source R1 text: Using an Elemental Skill grants the Kagura Dance effect, increasing the wielding character's Elemental Skill DMG by 12% as well as their Stellar-Conduct DMG by 12% for 24s. Max 3 stacks. This character will gain a 12% All Elemental DMG Bonus when they possess 3 stacks.
- Validated exact facts:
  - CRIT DMG substat
  - Kagura Dance R1: skill grants 24s stack, +12% Skill DMG and +12% Stellar-Conduct DMG, max 3 stacks, +12% All Elemental DMG at 3 stacks
  - R5: 24% values

**Gameplay conditions**

- stack tạo bằng Elemental Skill, không phải bằng thời gian đứng sân
- mỗi tầng 24s, tối đa 3
- cần 3 lần dùng kỹ năng
- 3 stack mới cho +12% elemental DMG ở R1

**Rubric assessment (v1.1, SUB_DPS)**

Re-checked stack trigger. A kept only with 3 stacks reachable in 24s; full passive is not counted when that condition is unmet.

- Criteria applied: Passive trigger conditions, Stack uptime, Off-field effectiveness, Rotation assumptions
- Sensitivity analysis: Nhân vật có skill cooldown dài không đạt 3 stack ổn định; R5 tăng lên 24% nhưng điều kiện stack vẫn vậy.

**Evidence references**

- genshin-db://weapons/14509
- game-facts.json#14509

**Reason for tier**

A giữ nhưng chỉ khi đạt 3 stack trong 24s; không cộng 12% all-elemental DMG khi điều kiện chưa thỏa.

**Known limitations**

- không đạt 3 stack với skill cooldown dài
- không tính full passive khi điều kiện chưa đáp ứng

**Rights verification status**

`publishRightsVerified = false` — Explanation rewritten from local game facts; no external editorial text. Flag stays false.

**Admin decision required**

Verify rights and the stack assumption, then approve/reject R1 / Sub DPS / A.

### 13. The Stringless — 15402 (independent-15402-SUB_DPS-R1)

- **Type / Role / Refinement:** BOW / SUB_DPS / R1
- **Tier:** S · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> Arrowless Song ở R1 tăng 24% sát thương kỹ năng và năng lượng, kết hợp với chỉ số phụ Tinh Thông phù hợp với Sub DPS dùng kỹ năng để gây sát thương. Hiệu quả phản ứng vẫn phụ thuộc vào đội hình, nhưng bản thân mức tăng sát thương kỹ năng và năng lượng hoạt động độc lập với điều kiện đó. Vì vậy tier S được giữ như đánh giá độc lập, không suy từ tần suất được khuyến nghị.

**Exact passive facts**

- Effect in genshin-db: `Arrowless Song`, substat `FIGHT_PROP_ELEMENT_MASTERY`, rarity 4
- Source R1 values: `["24%"]`
- Source R1 text: Increases Elemental Skill and Elemental Burst DMG by 24%.
- Validated exact facts:
  - EM substat
  - Arrowless Song R1: +24% Elemental Skill and Burst DMG
  - R5: +48%

**Gameplay conditions**

- R1 baseline
- Sub DPS dùng kỹ năng và năng lượng
- đội hình có thể kích hoạt phản ứng

**Rubric assessment (v1.1, SUB_DPS)**

Re-checked direct buff versus reaction dependence. S kept because the Skill/Burst bonus works independently of team reactions.

- Criteria applied: Off-field effectiveness, Reaction synergy, Passive trigger conditions, Team flexibility
- Sensitivity analysis: Nếu không có phản ứng thì vẫn giữ 24% Skill/Burst; R5 tăng lên 48%.

**Evidence references**

- genshin-db://weapons/15402
- game-facts.json#15402

**Reason for tier**

S giữ nguyên: buff Skill/Burst 24% hoạt động trực tiếp, EM là substat hữu ích cho Sub DPS phản ứng.

**Known limitations**

- phản ứng phụ thuộc đội hình

**Rights verification status**

`publishRightsVerified = false` — Evidence pointer normalized to resolvable genshin-db and local game facts. Flag stays false.

**Admin decision required**

Verify rights, then approve/reject R1 / Sub DPS / S.

### 14. Aqua Simulacra — 15508 (independent-15508-MAIN_DPS-R1)

- **Type / Role / Refinement:** BOW / MAIN_DPS / R1
- **Tier:** S · **Confidence:** MEDIUM
- **Tier unchanged from B2:** no silent change

**Corrected explanation (original Vietnamese, already applied to the draft)**

> The Cleansing Form ở R1 tăng 16% HP và tăng 20% sát thương khi có kẻ địch ở gần, hiệu ứng vẫn có tác dụng dù nhân vật đang ngoài sân. Chỉ số phụ CRIT DMG và mức tăng sát thương 20% là giá trị cốt lõi, trong khi phần HP chỉ có ích với nhân vật biết tận dụng hoặc cần độ bền. Điều kiện địch ở gần gần như luôn thỏa mãn trong chiến đấu thực tế, nhưng tier S được giữ thay vì SS vì buff khiêm tốn và giá trị HP không phổ dụng cho Main DPS cung.

**Exact passive facts**

- Effect in genshin-db: `The Cleansing Form`, substat `FIGHT_PROP_CRITICAL_HURT`, rarity 5
- Source R1 values: `["16%","20%"]`
- Source R1 text: HP is increased by 16%. When there are opponents nearby, the DMG dealt by the wielder of this weapon is increased by 20%. This will take effect whether the character is on-field or not.
- Validated exact facts:
  - CRIT DMG substat
  - The Cleansing Form R1: +16% HP, +20% DMG when opponents are nearby, effective on-field and off-field
  - R5: +32% HP, +40% DMG
  - NOT a 'no enemies nearby' condition

**Gameplay conditions**

- phải có kẻ địch ở gần
- buff có hiệu lực cả khi off-field
- R1: +16% HP và +20% DMG
- CRIT DMG là substat

**Rubric assessment (v1.1, MAIN_DPS)**

Condition corrected. Tier S re-derived and kept, not raised to SS or best-in-slot: the DMG bonus is modest and the HP bonus is not useful for most bow Main DPS.

- Criteria applied: Effective stat distribution, Passive trigger conditions, Practical uptime, Role fit
- Sensitivity analysis: Nếu nhân vật không dùng HP thì chỉ phần 20% DMG có giá trị; R5 tăng lên 40% nhưng điều kiện không đổi.

**Evidence references**

- genshin-db://weapons/15508
- game-facts.json#15508

**Reason for tier**

S giữ sau correction: điều kiện 'có địch ở gần' dễ đáp ứng nhưng buff chỉ 20% và HP ít giá trị với đa số Main DPS cung; không tự động coi là SS hay best-in-slot.

**Known limitations**

- HP substat-effect không phổ dụng
- buff 20% khiêm tốn

**Rights verification status**

`publishRightsVerified = false` — Corrected condition comes from local game facts; tier is independently judged. Flag stays false.

**Admin decision required**

Verify the corrected proximity condition and verify rights explicitly, then approve/reject R1 / Main DPS / S.

## 4. Rubric validation (v1.1)

- Gameplay strength (`tier`) is recorded separately from evidence quality (`confidence`). Favonius Greatsword keeps tier A but drops to LOW confidence because on-field CRIT uptime is not evidenced.
- Thresholds were re-checked: SS requires role universality; S requires expected value, not best-case. This is why Thrilling Tales moved SS→S (ATK-scalers only, next character only, 10s/20s) and The Widsith moved S→A (1/3 random EM theme, 10s/30s).
- Sensitivity analysis is stored for every record: trigger failure, R1↔R5 scaling, role reassignment and team assumptions are written explicitly. A tier validated here must not be reused for a different role or refinement without a new record.
- Role sensitivity examples: Aqua Simulacra is judged only as Main DPS R1; its off-field DMG bonus would need a separate Sub DPS record. Prototype Amber is judged as Support via healing and wielder burst energy, not via damage.
- No tier was chosen to match Genshin-Builds. The 296 `SOURCE_DERIVED` research records remain excluded and no editorial text from them was copied.

## 5. Publish rights

- All 14 explanations are original GenshinHub Vietnamese text; no external editorial tier-list paragraph was translated, reworded or relabelled as internal content.
- Tiers were derived with the internal rubric. Game facts come from `genshin-db@5.2.15` (game data, not an editorial ranking); exact values and source text are pinned in `game-facts.json`. Effect names in the local dataset are used as-is (e.g. `Gilding`, `The Cleansing Form`, `Kagura Dance of the Sacred Sakura`, `Arrowless Song`).
- Evidence is attributed inside each record (`genshin-db://weapons/<id>` plus `game-facts.json#<id>`), so attribution obligations for game data are recorded.
- `publishRightsVerified` remains **false** on all 14 records. No admin actor was impersonated and no GraphQL guard was bypassed. Rights verification must be performed explicitly by an Admin before any approval.

## 6. Database & migration safety

- No migration was created, edited or resolved; `_prisma_migrations` was not touched. The baseline P3018 gap remains a Phase C1 concern.
- No integration write test was run. All DB access by the builders and tests is read-only (`count`, `findMany`, catalog queries). Development DB was verified read-only: `WeaponTierRank = 0`, `WeaponTierAudit = 0`.
- CharacterBuild, CharacterTierRanking, Weapon Detail UI, Weapon Tier UI, production DB and the 296 research records were not modified.

## 7. Tests

All suites were run sequentially, with no parallel migration/test execution and no browser tests (no UI change).

| Check | Result |
|---|---|
| Game-fact extraction vs local genshin-db 5.2.15 | pass (14/14 exact values and descriptions) |
| `game-facts.test.cjs` (incl. two required regressions) | 5/5 pass |
| `independent.test.cjs` (schema, refinement, uniqueness, independence, approval protection) | 6/6 pass |
| `approval.test.cjs` (final package integrity, tier changes, rights) | 8/8 pass |
| `migration-integrity.test.cjs` (read-only migration evidence) | 4/4 pass |
| Existing B1 TS suites (service / GraphQL / migration / live DB / DataLoader) | 17 + 5 + 5 + 3 + 2 pass |
| Existing B1 script suites (tier-map / pipeline) | 4 + 5 pass |
| `prisma validate`, `prisma migrate status`, `tsc --noEmit`, `node --check` | pass |

**Required regressions added:**
1. Prototype Amber R5: Energy clause is wielder-only; only the HP clause mentions all party members; the corrected draft contains no team-wide Energy claim.
2. Aqua Simulacra R1: source says `When there are opponents nearby` and works off-field; the corrected draft contains no inverted `no enemies nearby` condition.

## 8. Artifacts changed (data only)

Modified:

- `docs/weapon-tier-independent/RUBRIC.md` (v1.1: thresholds, sensitivity, tier-change protocol)
- `backend/scripts/weapon-tier-independent/candidates.input.json` (corrected facts/explanations/conditions for all 14)
- `backend/scripts/weapon-tier-independent/review.input.json` (final per-record admin decisions)
- `backend/scripts/weapon-tier-independent/build-independent.cjs` (oldTier/tierChanged/tierReason/gameplayConditions/sensitivity validation)
- `backend/scripts/weapon-tier-independent/build-approval.cjs` (final package fields and tier-change validation)
- `backend/scripts/weapon-tier-independent/independent.test.cjs`, `approval.test.cjs` (updated for final state)

Generated / new:

- `docs/weapon-tier-independent/game-facts.json`
- `docs/weapon-tier-independent/independent-candidates.json` (regenerated from corrected input)
- `docs/weapon-tier-independent/approval-package.json` (regenerated final package)
- `backend/scripts/weapon-tier-independent/build-game-facts.cjs`, `game-facts.test.cjs`, `build-final-review.cjs`
- `docs/weapon-tier-audit/PHASE_B2_6_FINAL_REVIEW.md` (this report)

## 9. Remaining blockers / Admin actions

1. Admin must decide each of the 14 records individually; none is approved by this phase.
2. `14302` and `14402` require an explicit tier re-review before any approve/reject (SS→S and S→A).
3. Admin must explicitly verify publish rights; no flag was changed automatically.
4. `12401` carries LOW confidence because on-field CRIT uptime is not quantified; Admin may withhold approval.
5. Empty-DB bootstrap (P3018) and unmanaged `CharacterBuild` history remain Phase C1 work; no fix was attempted here.
6. `WeaponTierRank` must stay 0 until a separate, explicitly approved import decision is made; the 296 `SOURCE_DERIVED` records remain excluded.

