# Phase D2 — Weapon Tier Record Diff

**STATUS: REVISION DIFF ONLY. NOT APPROVAL. NO RIGHTS FLIP. NO DATABASE WRITE.**

Source freeze: batch `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e`, manifest `30372bf5de13d50856d479789f64598b53fde474c6043f4787094d5fd628777a`, decision sheet `a100002cc2e5f1815bf20836bda1b111c68d97bd22aa924161541c61df40caf9` — all verified unchanged.
Independent review: `/home/tuan/Downloads/GENSHINHUB_PHASE_D_REVIEW_NOT_APPROVAL.md` (SHA-256 `d311acb7bd493a5e927dcc216fe014afd554819ddccd4542c67b269907d7206f`)
Revised draft: `WEAPON_REVISED_DRAFT.json` (records SHA-256 `eae26ea26b737d8e1cbe6cdabcc340c13575e47af0737a91e6662749b7460185`)

All 14 records received a D2 review dossier. No tier was auto-confirmed. The 2 changed-tier records remain pending separate Admin re-review; 12401 remains blocked; 13501 was paused for comparative evidence. Every `publishRightsVerified` flag remains `false`.

| Candidate | Weapon / role / refinement | Old → proposed tier | Status | Old → new checksum |
|---|---|---|---|---|
| `independent-11401-SUPPORT-R1` | Favonius Sword / SUPPORT / R1 | SS → SS | REVISED_PENDING_ADMIN_REVIEW | `99bcedcc30f0…` → `c272e3d99e0b…` |
| `independent-11403-SUB_DPS-R5` | Sacrificial Sword / SUB_DPS / R5 | S → S | REVISED_PENDING_ADMIN_REVIEW | `79833088e028…` → `9d2ba88fe7e7…` |
| `independent-11418-SUPPORT-R1` | Xiphos' Moonlight / SUPPORT / R1 | S → S | REVISED_PENDING_ADMIN_REVIEW | `3e268bac16e7…` → `44030aa2e627…` |
| `independent-11512-MAIN_DPS-R1` | Light of Foliar Incision / MAIN_DPS / R1 | S → S | REVISED_PENDING_ADMIN_REVIEW | `ff1618139689…` → `65d1680be835…` |
| `independent-12401-SUB_DPS-R1` | Favonius Greatsword / SUB_DPS / R1 | A → A | NEEDS_MORE_EVIDENCE | `4c6d8185295e…` → `4f716a4ea101…` |
| `independent-12502-SUPPORT-R1` | Wolf's Gravestone / SUPPORT / R1 | A → A | REVISED_PENDING_ADMIN_REVIEW | `4831c47ef50d…` → `6f8a75c36bce…` |
| `independent-13407-SUPPORT-R1` | Favonius Lance / SUPPORT / R1 | SS → SS | REVISED_PENDING_ADMIN_REVIEW | `9c05a3f28683…` → `bce10da76bc1…` |
| `independent-13501-MAIN_DPS-R1` | Staff of Homa / MAIN_DPS / R1 | SS → SS | NEEDS_MORE_COMPARATIVE_EVIDENCE | `af208d96f8a5…` → `90da5f517c5f…` |
| `independent-14302-SUPPORT-R5` | Thrilling Tales of Dragon Slayers / SUPPORT / R5 | SS → S | MANDATORY_TIER_RE_REVIEW_PENDING | `14e2cd13fc59…` → `353ed2b6fecc…` |
| `independent-14402-SUB_DPS-R1` | The Widsith / SUB_DPS / R1 | S → A | MANDATORY_TIER_RE_REVIEW_PENDING | `7976f8d5c011…` → `6c8cedf40352…` |
| `independent-14406-SUPPORT-R5` | Prototype Amber / SUPPORT / R5 | A → A | REVISED_PENDING_ADMIN_REVIEW | `25d579067f26…` → `f6ce9d3d53e9…` |
| `independent-14509-SUB_DPS-R1` | Kagura's Verity / SUB_DPS / R1 | A → A | REVISION_READY_FOR_ADMIN_REVIEW | `50bf4af22493…` → `88c4f4340697…` |
| `independent-15402-SUB_DPS-R1` | The Stringless / SUB_DPS / R1 | S → S | REVISED_PENDING_ADMIN_REVIEW | `c4ded204a2e3…` → `53ee1c03f493…` |
| `independent-15508-MAIN_DPS-R1` | Aqua Simulacra / MAIN_DPS / R1 | S → S | REVISED_PENDING_ADMIN_REVIEW | `07431e870377…` → `ca6e01e22ec2…` |

## Mandatory separate tier re-reviews

- `independent-14302-SUPPORT-R5` (14302): **SS → S**. Confirmation: **NO**. Questions: Does Tier measure general team flexibility or best-in-class niche value?; Can a niche best-in-slot weapon qualify for SS under the approved rubric?; Is the 10s/20s uptime plus ATK-scaling restriction sufficient to downrank SS to S?
- `independent-14402-SUB_DPS-R1` (14402): **S → A**. Confirmation: **NO**. Questions: Use expected value over all three themes rather than the best theme only.; Does a 10s/30s random buff with burst-window sensitivity merit A for the evaluated role?; Do EM-scaling Sub DPS cases prevent a universal downrank, or only narrow the scope?

## Record-level diffs

### independent-11401-SUPPORT-R1 — Favonius Sword / SUPPORT / R1

- Change reason: R1 reliability was not quantified; added explicit R1-only expected Energy and on-field CRIT requirements. R5 values are context only and are not used to justify R1 SS.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: SS → SS (unchanged)
- Confidence: HIGH
- Rights verified: false
- Checksum: `99bcedcc30f03b29008f31285c00fdcac1a19dd0337c30764060c99bcfa9dce9` → `c272e3d99e0bf387e9bee7ea9d2382901bb95611ce94c080067916d337c2796a`

**explanationVi**

Reason: R1 reliability was not quantified; added explicit R1-only expected Energy and on-field CRIT requirements. R5 values are context only and are not used to justify R1 SS.

- OLD:
```text
Chỉ số phụ Năng Lượng Nạp và Windfall ở R1 cho xác suất 60% tạo 6 Năng Lượng mỗi 12s khi đánh bạo kích, nên cơ chế sinh hạt đã hoạt động mà không cần tinh luyện sâu. Điều kiện là người cầm phải đạt tỷ lệ bạo kích đủ dùng và có mặt trên sân để gây bạo kích. Đây là đánh giá độc lập theo tiêu chí sinh năng lượng và tính phổ dụng của vai trò Support, không dựa trên độ hiếm hay danh sách nhân vật đề xuất.
```
- NEW:
```text
Windfall ở R1 có 60% xác suất tạo Particle trị 6 Energy cho người cầm sau một cú CRIT, với ICD 12s. Nếu có ít nhất một CRIT trong cửa sổ đủ điều kiện, kỳ vọng ở mức 0,60 × 6 = 3,6 Energy cho người cầm mỗi 12s, không phải 6 Energy đảm bảo; người cầm cần CRIT Rate thực tế và một cửa sổ ra sân để gây CRIT. Chỉ số phụ ER giúp bản thân Favonius Sword xoay Burst tốt hơn, còn Particle chia cho đội phụ thuộc thu thập. Đánh giá SS ở R1 vì tiện ích năng lượng phổ dụng cho Support kiếm có cửa sổ CRIT trên sân; điều kiện này được nêu rõ và không được thay bằng giá trị R5 (100%/6s).
```

**tierJustification**

Reason: R1 reliability was not quantified; added explicit R1-only expected Energy and on-field CRIT requirements. R5 values are context only and are not used to justify R1 SS.

- OLD:
```text
SS giữ nguyên: sinh hạt ER ở R1 hoạt động ngay, phổ dụng cho Support kiếm cần xoay vòng; điều kiện bạo kích được ghi rõ nên không phải buff không điều kiện.
```
- NEW:
```text
SS giữ nguyên như đề xuất chờ Admin: giá trị R1 đã đủ có điều kiện; không dùng R5 để nâng mức tin cậy.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "có tỷ lệ bạo kích đủ dùng",
  "phải ra sân để gây bạo kích",
  "R1 là mức đánh giá"
]
```
- NEW:
```text
[
  "Expected Energy per eligible 12s R1 window = 0.60 × 6 = 3.6 for wielder when a CRIT occurs",
  "R5 100%/6s is context only",
  "CRIT Rate and on-field hit window are mandatory conditions"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "ER substat",
  "Windfall R1: 60% chance, 6 Energy, 12s ICD",
  "Windfall R5: 100% chance, 6s ICD"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R1 Windfall 60% chance, 6 Energy, 12s ICD on CRIT hits.",
  "R5 100%/6s is a different refinement and is not the evaluated configuration."
]
```

**reviewStatus**

Reason: R1 reliability was not quantified; added explicit R1-only expected Energy and on-field CRIT requirements. R5 values are context only and are not used to justify R1 SS.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-11403-SUB_DPS-R5 — Sacrificial Sword / SUB_DPS / R5

- Change reason: Made E-hit, 80% reset, 16s ICD, on-field recast and applicable-character limits explicit; no 100% reset assumption.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `79833088e0284741a1401b572af8f51788c55f627225a0df02f2260bf90cd257` → `9d2ba88fe7e76548a7d441cec191c5f85084802c7395e5aa5b0011d0a8a71897`

**explanationVi**

Reason: Made E-hit, 80% reset, 16s ICD, on-field recast and applicable-character limits explicit; no 100% reset assumption.

- OLD:
```text
Composed ở R5 có xác suất 80% đặt lại thời gian hồi kỹ năng sau khi kỹ năng gây sát thương cho địch, với chu kỳ tối đa một lần mỗi 16s. Để sub DPS hưởng lợi, nhân vật phải trở lại sân và dùng lại kỹ năng, đồng thời kỹ năng đó phải trúng địch; vì vậy lợi ích không được giả định là luôn xảy ra. Lần dùng kỹ năng thứ hai có thể tạo thêm hạt nếu kỹ năng sinh hạt, nhưng cần một cửa sổ ngắn trên sân trong xoay vòng. Với điều kiện được ghi rõ, tier S phản ánh giá trị khi reset hoạt động, không phải mức tự động cho mọi nhân vật.
```
- NEW:
```text
Composed ở R5 chỉ có cơ hội kích hoạt sau khi Elemental Skill gây sát thương cho đối thủ: xác suất 80%, ICD 16s. Để trở thành giá trị Sub DPS, nhân vật phải có Skill gây damage, quay lại sân để recast trong rotation vàSkill đó phải trúng; lần cast thứ hai chỉ sinh thêm Particle nếu Skill có khả năng sinh hạt. Không giả định reset luôn thành công. Vì cần cửa sổ on-field ngắn nên lợi ích không tự động áp dụng cho mọi Sword Sub DPS; tier S được giữ như đề xuất có điều kiện.
```

**tierJustification**

Reason: Made E-hit, 80% reset, 16s ICD, on-field recast and applicable-character limits explicit; no 100% reset assumption.

- OLD:
```text
S giữ nguyên nhưng kèm điều kiện: reset R5 mạnh (80%/16s) chỉ chuyển thành sát thương và năng lượng khi kỹ năng trúng địch và có lần recast trên sân.
```
- NEW:
```text
S giữ nguyên: reset R5 mạnh nhưng chỉ chuyển thành damage/Energy khi trúng và có recast trên sân.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "kỹ năng phải gây damage để có cơ hội reset",
  "xác suất 80% và ICD 16s ở R5",
  "cần on-field recast trong rotation",
  "không giả định reset luôn proc"
]
```
- NEW:
```text
[
  "Skill must damage an opponent",
  "Reset chance is 80%, not 100%",
  "ICD is 16s at R5",
  "Applicable characters need a damaging Skill and a short on-field recast window"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "Composed R1: skill must damage opponent, 40% chance, 30s ICD",
  "Composed R5: 80% chance, 16s ICD"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R5 Composed 80% reset chance, 16s ICD, requires Elemental Skill to damage an opponent."
]
```

**reviewStatus**

Reason: Made E-hit, 80% reset, 16s ICD, on-field recast and applicable-character limits explicit; no 100% reset assumption.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-11418-SUPPORT-R1 — Xiphos' Moonlight / SUPPORT / R1

- Change reason: Added quantified EM condition, team-share math and comparison with non-EM supports; removed any implication of universal sword-support utility.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `3e268bac16e789d3ddc732a562f5d8db4678f94784f663e5828da8683e36bda7` → `44030aa2e6271b6266ae44d3296554206b0cff0cb1361bba5063de44a8c3a0b2`

**explanationVi**

Reason: Added quantified EM condition, team-share math and comparison with non-EM supports; removed any implication of universal sword-support utility.

- OLD:
```text
Jinni's Whisper ở R1 chuyển 0,036% Năng Lượng Nạp cho mỗi điểm Tinh Thông trong 12s, kích hoạt mỗi 10s và chia 30% cho đồng đội gần đó. Hiệu ứng vẫn chạy khi người cầm không ra sân, nhưng tỷ lệ chia sẻ phụ thuộc vào việc xây dựng đủ Tinh Thông. Đánh giá S phản ánh giá trị năng lượng đội hình có điều kiện, không phải mức phổ dụng như một nguồn hồi năng lượng không điều kiện.
```
- NEW:
```text
Jinni's Whisper R1 cho người cầm 0,036% Energy Recharge cho mỗi điểm EM trong 12s, kích hoạt mỗi 10s và chia 30% giá trị đó cho đồng đội gần; hiệu ứng vẫn chạy off-field. Ví dụ minh họa với 800 EM: 28,8% ER cho người cầm và khoảng 8,64% ER chia cho mỗi đồng đội, trước các giới hạn thực tế. Đây không phải nguồn năng lượng phổ dụng: Support không build EM hưởng rất ít, trong khi Favonius chỉ cần CRIT/on-field. Đánh giá S vì giá trị ER đội hình mạnh nhưng có điều kiện build EM và team share.
```

**tierJustification**

Reason: Added quantified EM condition, team-share math and comparison with non-EM supports; removed any implication of universal sword-support utility.

- OLD:
```text
S giữ nguyên: buff ER đội hình có điều kiện EM, chạy off-field nhưng không phổ dụng như Favonius.
```
- NEW:
```text
S giữ nguyên: buff ER đội hình có điều kiện EM, không phải hỗ trợ phổ dụng cho mọi Sword Support.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "cần đầu tư Tinh Thông",
  "tự động kích hoạt mỗi 10s kể cả off-field",
  "chia 30% cho đồng đội gần"
]
```
- NEW:
```text
[
  "Illustrative 800 EM example is not a universal build target",
  "Party members must be nearby to receive 30% share",
  "Non-EM supports receive little value"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "EM substat",
  "Jinni's Whisper R1: 0.036% ER per EM for 12s every 10s, 30% shared",
  "R5 coefficient 0.072%"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: 0.036% ER per EM for 12s every 10s, 30% shared; triggers off-field."
]
```

**reviewStatus**

Reason: Added quantified EM condition, team-share math and comparison with non-EM supports; removed any implication of universal sword-support utility.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-11512-MAIN_DPS-R1 — Light of Foliar Incision / MAIN_DPS / R1

- Change reason: Restricted the passive to real Elemental Normal Attack + EM/CRIT compatible users and explicitly rejected applying it to every Sword character.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `ff161813968954a2eaf2387b04eed7da6232e9846328160079f571c99e047929` → `65d1680be8357af2876bea3a5a01eb62db29f6f3d60b9ab49588f8cee034d1be`

**explanationVi**

Reason: Restricted the passive to real Elemental Normal Attack + EM/CRIT compatible users and explicitly rejected applying it to every Sword character.

- OLD:
```text
Whitemoon Bristle ở R1 tăng 4% CRIT Rate và cộng 120% Tinh Thông vào sát thương đòn thường cùng kỹ năng sau khi đòn thường gây sát thương nguyên tố, tồn tại 12s hoặc 28 lần nhận sát thương. Chỉ số phụ CRIT DMG khớp với hiệu ứng này nhưng lợi ích chỉ trọn vẹn khi nhân vật duy trì đòn thường và có hệ số Tinh Thông đáng kể. Vì điều kiện đó, tier S được giữ làm đánh giá có điều kiện thay vì suy từ rarity 5 sao.
```
- NEW:
```text
Whitemoon Bristle R1 tăng 4% CRIT Rate; sau khi Normal Attack gây Elemental DMG, hiệu ứng cộng 120% EM vào sát thương Normal Attack và Elemental Skill trong tối đa 28 lần nhận sát thương hoặc 12s. Để đạt giá trị, nhân vật vừa phải có Normal Attack gây sát thương nguyên tố, vừa có mô hình damage hưởng lợi từ EM và CRIT DMG substat. Nhân vật Sword dùng Normal Attack thuần physical hoặc không scale EM gần như không hưởng lợi, nên không thể gán passive cho mọi Sword user. Tier S giữ nguyên như đề xuất có điều kiện.
```

**tierJustification**

Reason: Restricted the passive to real Elemental Normal Attack + EM/CRIT compatible users and explicitly rejected applying it to every Sword character.

- OLD:
```text
S giữ nguyên: passive mạnh nhưng bị khóa bởi đòn thường gây sát thương nguyên tố và hệ số EM, nên không xếp SS tổng quát.
```
- NEW:
```text
S giữ nguyên: passive mạnh nhưng bị giới hạn bởi trigger Elemental Normal Attack và hệ số EM/CRIT.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "đòn thường phải gây sát thương nguyên tố",
  "duy trì đòn thường trong 12s hoặc 28 lần",
  "cần CRIT Rate và EM"
]
```
- NEW:
```text
[
  "Normal Attack must deal Elemental DMG",
  "User must benefit from EM-added damage and CRIT DMG",
  "28 instances or 12s caps uptime; not all Sword users qualify"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "CRIT DMG substat",
  "Whitemoon Bristle R1: +4% CRIT Rate, 120% EM added to NA/Skill DMG, 28 instances or 12s",
  "R5: +8% CRIT Rate, 240% EM"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R1 +4% CRIT Rate, +120% EM to Normal Attack and Elemental Skill DMG after Normal Attack deals Elemental DMG, 28 instances/12s."
]
```

**reviewStatus**

Reason: Restricted the passive to real Elemental Normal Attack + EM/CRIT compatible users and explicitly rejected applying it to every Sword character.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-12401-SUB_DPS-R1 — Favonius Greatsword / SUB_DPS / R1

- Change reason: Frozen Group B status is retained. All six required evidence fields remain absent; confidence stays LOW and the record remains blocked and non-importable. The incomplete reason string in the prior sheet is corrected to name all six fields.
- Review status: NEEDS_MORE_EVIDENCE
- Tier: A → A (unchanged)
- Confidence: LOW
- Rights verified: false
- Checksum: `4c6d8185295e9e7abb9f1fdab6d682b85569c5d8b12ca1cbab8e67d20dff051a` → `4f716a4ea1013604e38c04d034a369c0448103b0ae7331ca01ee1bc855886d4f`

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "passive cần CRIT hit",
  "nhân vật phải đứng sân khi kích hoạt",
  "60% chance, 12s ICD, 6 Energy ở R1",
  "cần CRIT Rate đủ"
]
```
- NEW:
```text
[
  "CRIT Rate assumptions: MISSING",
  "Passive proc conditions: MISSING",
  "Rotation: MISSING",
  "Field-time requirements: MISSING",
  "Energy generation assumptions: MISSING",
  "Rubric justification: MISSING"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "ER substat",
  "Windfall R1: 60% chance, 6 Energy, 12s ICD, requires CRIT hit",
  "R5: 100% chance, 6s ICD"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R1 Windfall 60% chance, 6 Energy, 12s ICD on CRIT hits.",
  "Game facts are valid but insufficient; they do not unblock this candidate."
]
```

**reviewStatus**

Reason: Frozen Group B status is retained. All six required evidence fields remain absent; confidence stays LOW and the record remains blocked and non-importable. The incomplete reason string in the prior sheet is corrected to name all six fields.

- OLD:
```text
NEEDS_MORE_EVIDENCE
```
- NEW:
```text
NEEDS_MORE_EVIDENCE
```

---

### independent-12502-SUPPORT-R1 — Wolf's Gravestone / SUPPORT / R1

- Change reason: Explained low-HP trigger, party ATK buff, 12s/30s uptime and why the record is evaluated under SUPPORT rather than personal damage.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: A → A (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `4831c47ef50dd9ec4481101b0c0e408a29b7215e0c78bd3e433503ebbecf6724` → `6f8a75c36bce167607de3199b3a7f50a3da75b6bba659766058bc0fb77f2c903`

**explanationVi**

Reason: Explained low-HP trigger, party ATK buff, 12s/30s uptime and why the record is evaluated under SUPPORT rather than personal damage.

- OLD:
```text
Wolfish Tracker ở R1 tăng 20% ATK cho người cầm và 40% ATK cho cả đội trong 12s khi đánh trúng mục tiêu dưới 30% HP, với chu kỳ 30s. Buff mang lại giá trị hỗ trợ rõ nhưng điều kiện HP thấp và thời gian phủ 12s trên chu kỳ 30s khiến hiệu quả không liên tục. Chỉ số phụ ATK% không bổ sung năng lượng hay tiện ích đội hình, nên tier A được giữ sau khi xét cả điều kiện lẫn thời gian phủ.
```
- NEW:
```text
Wolfish Tracker R1 tăng 20% ATK cho người cầm và, khi một đòn đánh trúng đối thủ dưới 30% HP, tăng 40% ATK cho toàn đội trong 12s với ICD 30s. Đây là party-wide ATK buff nên được đánh giá trong role SUPPORT, không phải chỉ là damage cá nhân; tuy nhiên trigger phụ thuộc mốc HP thấp, phải đánh trúng và uptime chỉ 12/30s. Chỉ số phụ ATK% không bổ sung Energy hay tiện ích phòng thủ. Tier A được giữ vì buff mạnh nhưng ngắt quãng và situational.
```

**tierJustification**

Reason: Explained low-HP trigger, party ATK buff, 12s/30s uptime and why the record is evaluated under SUPPORT rather than personal damage.

- OLD:
```text
A giữ nguyên: buff ATK 40% mạnh nhưng có điều kiện HP <30% và uptime 12/30s, thiếu tiện ích năng lượng.
```
- NEW:
```text
A giữ nguyên: party ATK 40% là support value có thật nhưng uptime 12/30s và điều kiện HP <30% kéo xuống A.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "mục tiêu phải dưới 30% HP",
  "phải đánh trúng để kích hoạt",
  "chu kỳ 30s, buff 12s"
]
```
- NEW:
```text
[
  "On-hit trigger against opponent below 30% HP",
  "Buff duration 12s, ICD 30s",
  "Role classified as SUPPORT because of party-wide ATK buff",
  "Team must scale with ATK"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "ATK% substat",
  "Wolfish Tracker R1: +20% self ATK, +40% party ATK for 12s on targets below 30% HP, 30s ICD",
  "R5: +40% / +80%"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: +20% self ATK; on hit against targets below 30% HP, +40% party ATK for 12s, once every 30s."
]
```

**reviewStatus**

Reason: Explained low-HP trigger, party ATK buff, 12s/30s uptime and why the record is evaluated under SUPPORT rather than personal damage.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-13407-SUPPORT-R1 — Favonius Lance / SUPPORT / R1

- Change reason: Added the same R1-only reliability model as the sword Favonius case and realistic polearm-support on-field CRIT limitation; no R5 extrapolation.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: SS → SS (unchanged)
- Confidence: HIGH
- Rights verified: false
- Checksum: `9c05a3f28683a33234e1ad912882ad281822e53c0db41dcb3944d06212b83e0e` → `bce10da76bc12a1549a15b0086ad2dccd170cdd341b9075b773fd713dcaced25`

**explanationVi**

Reason: Added the same R1-only reliability model as the sword Favonius case and realistic polearm-support on-field CRIT limitation; no R5 extrapolation.

- OLD:
```text
Favonius Lance có chỉ số phụ Năng Lượng Nạp và Windfall ở R1 tạo 6 Năng Lượng với xác suất 60% mỗi 12s khi bạo kích. Điều kiện cần có tỷ lệ bạo kích đủ dùng và một lần đánh trên sân, phù hợp với Support cán dài có thời gian ra sân ngắn. Đây là đánh giá độc lập theo khả năng nuôi xoay vòng đội hình, không lấy từ bảng xếp hạng bên ngoài hay số lượt đề xuất.
```
- NEW:
```text
Favonius Lance có chỉ số phụ ER và Windfall R1: 60% xác suất tạo Particle trị 6 Energy sau CRIT, ICD 12s. Khi có CRIT trong cửa sổ hợp lệ, kỳ vọng là 0,60 × 6 = 3,6 Energy cho người cầm mỗi 12s, không phải 6 Energy đảm bảo. Support cán dài thường có cửa sổ ra sân ngắn nên CRIT Rate thực tế và thời gian xuất hiện là điều kiện quyết định; giá trị R5 100%/6s chỉ là thông tin tham khảo. Đánh giá SS vì tiện ích ER và Particle đội hình rất mạnh khi điều kiện R1 được đáp ứng.
```

**tierJustification**

Reason: Added the same R1-only reliability model as the sword Favonius case and realistic polearm-support on-field CRIT limitation; no R5 extrapolation.

- OLD:
```text
SS giữ nguyên: ER substat cộng particle là tiện ích năng lượng phổ dụng, điều kiện crit được ghi rõ nhưng dễ đáp ứng.
```
- NEW:
```text
SS giữ nguyên như đề xuất chờ Admin, không dùng R5 để biện minh cho độ tin cậy R1.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "cần CRIT Rate đủ",
  "phải có một lần đánh trên sân",
  "R1 baseline"
]
```
- NEW:
```text
[
  "Expected Energy per eligible 12s R1 window = 3.6 when a CRIT occurs",
  "Polearm Support needs a real on-field CRIT window",
  "R5 values are not used"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "ER substat",
  "Windfall R1: 60% chance, 6 Energy, 12s ICD",
  "R5: 100% chance, 6s ICD"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R1 Windfall 60% chance, 6 Energy, 12s ICD on CRIT hits."
]
```

**reviewStatus**

Reason: Added the same R1-only reliability model as the sword Favonius case and realistic polearm-support on-field CRIT limitation; no R5 extrapolation.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-13501-MAIN_DPS-R1 — Staff of Homa / MAIN_DPS / R1

- Change reason: Mechanical facts are verified, but a category-wide SS claim requires version-scoped comparison across varied Polearm Main DPS. Status paused; proposed tier unchanged and no generic defense was invented.
- Review status: NEEDS_MORE_COMPARATIVE_EVIDENCE
- Tier: SS → SS (unchanged)
- Confidence: HIGH
- Rights verified: false
- Checksum: `af208d96f8a5d859d1ed54bcc35d7c95122decec2c7897705aba62282cb17e86` → `90da5f517c5feb9531e47bca67d81033e341ea2629ee59af8e7d4e4491f26831`

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "R1 baseline",
  "phần ATK từ Max HP áp dụng cho mọi cán dài nhưng tỷ lệ hưởng lợi tùy Max HP",
  "dưới 50% HP chỉ là phần thưởng, không tính vào căn cứ SS",
  "nhân vật scale DEF/HP hưởng ít hơn từ phần ATK"
]
```
- NEW:
```text
[
  "Below-50% HP bonus remains excluded from the SS basis",
  "Need examples across varied Polearm MAIN_DPS scalings (ATK, HP, DEF/EM-oriented kits)",
  "Need team examples beyond one or two standout users",
  "Need explicit S-vs-SS threshold justification for the assessed version"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "CRIT DMG substat",
  "Reckless Cinnabar R1: +20% HP, 0.8% Max HP to ATK, +1% below 50% HP",
  "R5: +40% HP, 1.6% / 1.8%"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R1 +20% HP, ATK bonus equal to 0.8% Max HP, +1% Max HP when below 50% HP; CRIT DMG substat.",
  "The below-50% bonus is conditional and excluded from the baseline argument."
]
```

**reviewStatus**

Reason: Mechanical facts are verified, but a category-wide SS claim requires version-scoped comparison across varied Polearm Main DPS. Status paused; proposed tier unchanged and no generic defense was invented.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
NEEDS_MORE_COMPARATIVE_EVIDENCE
```

---

### independent-14302-SUPPORT-R5 — Thrilling Tales of Dragon Slayers / SUPPORT / R5

- Change reason: D2 adds a separate tier-semantics dossier for SS→S. No confirmation is granted; the proposed S remains pending and the Admin must decide whether tier measures universal flexibility or niche best-in-slot value.
- Review status: MANDATORY_TIER_RE_REVIEW_PENDING
- Tier: SS → S (proposed change, NOT confirmed)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `14e2cd13fc59cf36709fcf2189ad9f9ea825f4c76adfd669b1d4fcc9667f7c57` → `353ed2b6feccc42d45e6cb711c4f689e2c828e828a25beae992d5cc9ba5b568a`

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "buff ATK cho nhân vật vào sân ngay sau người cầm",
  "người cầm phải swap out đúng trình tự",
  "10s duration / 20s cooldown",
  "chỉ có giá trị nếu carry scale ATK"
]
```
- NEW:
```text
[
  "48% ATK applies only to the next character taking the field",
  "Duration 10s, ICD 20s",
  "Benefit requires an ATK-scaling carry and correct swap order",
  "Tier-semantics question remains unresolved"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "HP% substat",
  "Heritage R5: +48% ATK for incoming character for 10s, 20s ICD",
  "R1: +24% ATK"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R5 +48% ATK to incoming character for 10s, once every 20s.",
  "R1 +24% ATK is context only."
]
```

**reviewStatus**

Reason: D2 adds a separate tier-semantics dossier for SS→S. No confirmation is granted; the proposed S remains pending and the Admin must decide whether tier measures universal flexibility or niche best-in-slot value.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
MANDATORY_TIER_RE_REVIEW_PENDING
```

---

### independent-14402-SUB_DPS-R1 — The Widsith / SUB_DPS / R1

- Change reason: D2 adds an explicit expected-value model for S→A. EM theme is not treated as useless; no confirmation is granted and the proposed A remains pending.
- Review status: MANDATORY_TIER_RE_REVIEW_PENDING
- Tier: S → A (proposed change, NOT confirmed)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `7976f8d5c0119eba5c393b495e4445f60d22486f2e4b33e6bcb799cbbc620df9` → `6c8cedf40352a1af1323fb041be8666bb9bd96a35b59a37ff958f78555ab795f`

**explanationVi**

Reason: D2 adds an explicit expected-value model for S→A. EM theme is not treated as useless; no confirmation is granted and the proposed A remains pending.

- OLD:
```text
Debut kích hoạt khi nhân vật ra sân, cho một trong ba bản ca ngẫu nhiên trong 10s với chu kỳ 30s; ở R1 các mức là 60% ATK, 48% sát thương nguyên tố hoặc 240 Tinh Thông. Bản ca Tinh Thông không nên xem là vô dụng: với Sub DPS scale EM hoặc đội phản ứng chuyển hóa, 240 EM có thể là bản ca có giá trị cao nhất, trong khi nhóm scale ATK hoặc sát thương nguyên tố hưởng lợi từ hai bản ca còn lại. Vì Sub DPS thường có cửa sổ burst ngắn, buff chỉ có giá trị nếu burst trùng với 10s hiệu lực; nếu kỹ năng và burst bước vào hồi chiêu ngoài cửa sổ 30s thì buff bị lãng phí. Tier điều chỉnh từ S xuống A vì giá trị phụ thuộc nhóm nhân vật và chỉ phủ 10/30s, không phải vì bản ca EM luôn kém.
```
- NEW:
```text
Debut R1 chọn ngẫu nhiên một trong ba bản ca khi nhân vật vào sân, mỗi bản 10s trên chu kỳ 30s: +60% ATK, +48% Elemental DMG hoặc +240 EM. Với phân bổ ngẫu nhiên, mỗi bản có kỳ vọng 1/3 trước khi xét độ phù hợp nhân vật; bản ca EM có thể là bản tốt nhất cho Sub DPS scale EM hoặc đội chuyển hóa, nên không được gọi là vô dụng. Giá trị thực tế phụ thuộc việc căn burst window vào 10s hiệu lực và nhóm nhân vật hưởng lợi. Đề xuất A (từ S) vì expected value thấp hơn best-case, nhưng thay đổi này bắt buộc phải do Admin xác nhận riêng.
```

**tierJustification**

Reason: D2 adds an explicit expected-value model for S→A. EM theme is not treated as useless; no confirmation is granted and the proposed A remains pending.

- OLD:
```text
OLD_TIER=S → PROPOSED_TIER=A. Lý do: giá trị thay đổi theo nhóm nhân vật (EM có thể là bản ca tốt với Sub DPS scale EM, không phải luôn vô dụng), cộng thêm buff chỉ 10s trên chu kỳ 30s và dễ lệch burst window; A phản ánh kỳ vọng thực tế thay vì buff tốt nhất.
```
- NEW:
```text
S → A là proposed diff, chưa được xác nhận. Mô hình expected value 1/3 + uptime 10/30s được nộp để Admin re-review.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "kích hoạt khi nhân vật ra sân",
  "ba hiệu ứng ngẫu nhiên và không chọn được bản ca",
  "10s duration / 30s cooldown",
  "cần căn burst window trong 10s hiệu lực",
  "giá trị tùy nhóm: EM có thể hữu ích với Sub DPS scale EM hoặc đội chuyển hóa"
]
```
- NEW:
```text
[
  "Each of the three songs has 1/3 base probability",
  "Buff lasts 10s per 30s cycle",
  "Burst window alignment materially changes value",
  "EM theme can be valuable for EM-scaling Sub DPS or transformative teams"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "CRIT DMG substat",
  "Debut R1: random 10s theme every 30s: +60% ATK / +48% Elemental DMG / +240 EM",
  "R5: 120% / 96% / 480"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R1 random 10s theme every 30s: +60% ATK / +48% Elemental DMG / +240 EM."
]
```

**reviewStatus**

Reason: D2 adds an explicit expected-value model for S→A. EM theme is not treated as useless; no confirmation is granted and the proposed A remains pending.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
MANDATORY_TIER_RE_REVIEW_PENDING
```

---

### independent-14406-SUPPORT-R5 — Prototype Amber / SUPPORT / R5

- Change reason: Verified the corrected Gilding facts and separated verbatim genshin-db values from mechanical interpretation of wielder-only Energy and per-character own-Max-HP healing.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: A → A (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `25d579067f2654c8eb4f591a6eeee33ce0ef78965cb8414621fc69ddc6711e0d` → `f6ce9d3d53e9c1482e657e09add62f06f1f0e601101c6dce131e08a65e4abc11`

**explanationVi**

Reason: Verified the corrected Gilding facts and separated verbatim genshin-db values from mechanical interpretation of wielder-only Energy and per-character own-Max-HP healing.

- OLD:
```text
Sau khi dùng Năng Lượng Nạp ở R5, Gilding hồi 6 Năng Lượng mỗi 2s trong 6s cho riêng người cầm, tổng 18 Năng Lượng, còn mỗi thành viên đội chỉ hồi 6% Max HP của chính họ mỗi 2s, tổng 18% Max HP mỗi thành viên trong 6 giây trước modifier hồi máu. Không có hồi năng lượng trực tiếp cho cả đội và chỉ số phụ HP% có giá trị hỗ trợ hồi máu nhưng ít giá trị tấn công. Tier A được giữ lại vì khả năng hồi máu đội hình và hỗ trợ burst của người cầm vẫn đáng kể, nhưng phụ thuộc hoàn toàn vào rotation có dùng Burst thường xuyên.
```
- NEW:
```text
Sau khi dùng Elemental Burst, Gilding R5 hồi 6 Energy mỗi 2s trong 6s cho riêng người cầm, tổng 18 Energy. Các thành viên đội không nhận Energy trực tiếp; mỗi người hồi 6% Max HP của chính họ mỗi 2s trong cùng 6s, tổng 18% Max HP mỗi người trước healing modifiers. Chỉ số phụ HP% hỗ trợ healing nhưng ít giá trị tấn công, và toàn bộ hiệu ứng phụ thuộc việc dùng Burst thường xuyên. Tier A được giữ vì team healing và hỗ trợ Burst cho người cầm vẫn đáng kể nhưng không đủ cho S.
```

**tierJustification**

Reason: Verified the corrected Gilding facts and separated verbatim genshin-db values from mechanical interpretation of wielder-only Energy and per-character own-Max-HP healing.

- OLD:
```text
A giữ sau correction: mất khoản 'energy cho cả đội' từng được giả định, nhưng vẫn có 18% Max HP heal mỗi thành viên và 18 Energy cho người cầm; HP% substat và phụ thuộc Burst kéo giá trị xuống, không đủ cho S.
```
- NEW:
```text
A giữ nguyên: 18 Energy chỉ cho wielder, 18% own Max HP healing cho mỗi member, Burst-dependent.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "phải dùng Elemental Burst để kích hoạt",
  "6 Energy/2s trong 6s chỉ cho người cầm",
  "mỗi thành viên hồi 6% Max HP của chính họ mỗi 2s",
  "tổng 18% Max HP mỗi người trước healing bonus"
]
```
- NEW:
```text
[
  "No direct team-wide Energy regeneration",
  "Each teammate heals from their own Max HP",
  "18% total is before healing modifiers",
  "Burst-dependent activation"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "HP% substat",
  "Gilding R5: wielder regenerates 6 Energy every 2s for 6s = 18 Energy total",
  "All party members regenerate 6% of their own Max HP every 2s for 6s = 18% Max HP total",
  "No team-wide Energy regeneration"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R5 regenerates 6 Energy every 2s for 6s for wielder; all party members regenerate 6% of their own Max HP every 2s.",
  "Wielder-only Energy and modifier ordering are mechanical interpretation consistent with the source values, not verbatim additions."
]
```

**reviewStatus**

Reason: Verified the corrected Gilding facts and separated verbatim genshin-db values from mechanical interpretation of wielder-only Energy and per-character own-Max-HP healing.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-14509-SUB_DPS-R1 — Kagura's Verity / SUB_DPS / R1

- Change reason: Removed the assumption that three stacks are automatic. Added realistic stack conditions and named Catalyst Sub DPS examples that can or cannot maintain three Skill stacks within 24s. Tier unchanged.
- Review status: REVISION_READY_FOR_ADMIN_REVIEW
- Tier: A → A (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `50bf4af224937eaf825459f7c2dab84aea3cd36c634493631a606862acb9b381` → `88c4f434069705901ba1e8b58286c1afb4858b583f14a6970bea58fd8558deeb`

**explanationVi**

Reason: Removed the assumption that three stacks are automatic. Added realistic stack conditions and named Catalyst Sub DPS examples that can or cannot maintain three Skill stacks within 24s. Tier unchanged.

- OLD:
```text
Kagura Dance of the Sacred Sakura tạo một tầng khi dùng kỹ năng nguyên tố, mỗi tầng kéo dài 24s, tối đa 3 tầng và chỉ khi đủ 3 tầng thì mới nhận thêm 12% sát thương nguyên tố ở R1. Sub DPS cần ba lần dùng kỹ năng trong cửa sổ còn hiệu lực, nên nhân vật có kỹ năng có thời gian hồi ngắn sẽ tích stack ổn định hơn nhiều. Tier A được giữ với giả định ba stack đạt được trong rotation; nếu không, chỉ phần tăng sát thương kỹ năng được tính và không được cộng full passive.
```
- NEW:
```text
Mỗi lần dùng Elemental Skill tạo một tầng Kagura Dance, mỗi tầng 24s, tối đa 3; mỗi tầng tăng 12% Skill DMG và 12% Stellar-Conduct DMG ở R1, và chỉ khi có đủ 3 tầng mới nhận thêm 12% All Elemental DMG. Không được mặc định Sub DPS luôn full-stack. Các Catalyst có nhiều lần dùng Skill trong 24s như Yae Miko, hoặc Nahida/Sucrose trong rotation phù hợp, có thể đạt 3 stack; nhân vật có Skill cooldown dài hoặc chỉ dùng một lần mỗi rotation thường không duy trì được full passive. Vì vậy giá trị được tính theo số tầng thực tế, không cộng 12% elemental DMG khi điều kiện chưa thỏa. Tier A giữ nguyên như đề xuất chờ Admin.
```

**tierJustification**

Reason: Removed the assumption that three stacks are automatic. Added realistic stack conditions and named Catalyst Sub DPS examples that can or cannot maintain three Skill stacks within 24s. Tier unchanged.

- OLD:
```text
A giữ nhưng chỉ khi đạt 3 stack trong 24s; không cộng 12% all-elemental DMG khi điều kiện chưa thỏa.
```
- NEW:
```text
A giữ nguyên nhưng chỉ với stack assumption thực tế; không cộng full passive mặc định.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "stack tạo bằng Elemental Skill, không phải bằng thời gian đứng sân",
  "mỗi tầng 24s, tối đa 3",
  "cần 3 lần dùng kỹ năng",
  "3 stack mới cho +12% elemental DMG ở R1"
]
```
- NEW:
```text
[
  "Stacks are created by Elemental Skill uses, not by time on-field",
  "Each stack lasts 24s, max 3",
  "Three stacks within 24s are character- and rotation-dependent",
  "12% All Elemental DMG applies only at 3 stacks"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "CRIT DMG substat",
  "Kagura Dance R1: skill grants 24s stack, +12% Skill DMG and +12% Stellar-Conduct DMG, max 3 stacks, +12% All Elemental DMG at 3 stacks",
  "R5: 24% values"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: Skill grants a 24s stack, max 3; +12% Skill DMG and +12% Stellar-Conduct DMG per stack; +12% All Elemental DMG at 3 stacks."
]
```

**reviewStatus**

Reason: Removed the assumption that three stacks are automatic. Added realistic stack conditions and named Catalyst Sub DPS examples that can or cannot maintain three Skill stacks within 24s. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISION_READY_FOR_ADMIN_REVIEW
```

---

### independent-15402-SUB_DPS-R1 — The Stringless / SUB_DPS / R1

- Change reason: Replaced ambiguous wording with explicit Elemental Skill and Elemental Burst damage tags and limited EM/reaction value to applicable teams. Tier unchanged.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `c4ded204a2e3c98b210583071984ca6607cb109d47de5e861fbb671e29bdc448` → `53ee1c03f49387df21ef034804503958bfa43a2e131e5c6c4ddb7d5a69eff67f`

**explanationVi**

Reason: Replaced ambiguous wording with explicit Elemental Skill and Elemental Burst damage tags and limited EM/reaction value to applicable teams. Tier unchanged.

- OLD:
```text
Arrowless Song ở R1 tăng 24% sát thương kỹ năng và năng lượng, kết hợp với chỉ số phụ Tinh Thông phù hợp với Sub DPS dùng kỹ năng để gây sát thương. Hiệu quả phản ứng vẫn phụ thuộc vào đội hình, nhưng bản thân mức tăng sát thương kỹ năng và năng lượng hoạt động độc lập với điều kiện đó. Vì vậy tier S được giữ như đánh giá độc lập, không suy từ tần suất được khuyến nghị.
```
- NEW:
```text
Arrowless Song R1 tăng 24% sát thương của Elemental Skill và Elemental Burst, không phải mọi nguồn damage. Với Sub DPS, chỉ các hit được hệ thống gán tag Skill hoặc Burst mới hưởng mức +24%; các hit off-field thuộc loại khác không tự động được cộng. EM secondary stat hữu ích trong đội phản ứng, nhưng bản thân mức tăng Skill/Burst hoạt động độc lập với việc có reaction hay không. Tier S giữ nguyên như đề xuất, không suy từ tần suất khuyến nghị hay rarity.
```

**tierJustification**

Reason: Replaced ambiguous wording with explicit Elemental Skill and Elemental Burst damage tags and limited EM/reaction value to applicable teams. Tier unchanged.

- OLD:
```text
S giữ nguyên: buff Skill/Burst 24% hoạt động trực tiếp, EM là substat hữu ích cho Sub DPS phản ứng.
```
- NEW:
```text
S giữ nguyên: +24% Skill/Burst trực tiếp, EM hỗ trợ reaction team; không áp dụng cho damage source khác.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "R1 baseline",
  "Sub DPS dùng kỹ năng và năng lượng",
  "đội hình có thể kích hoạt phản ứng"
]
```
- NEW:
```text
[
  "Only game-tagged Elemental Skill / Elemental Burst damage receives +24%",
  "Off-field damage must be checked by damage type, not visual appearance",
  "EM value depends on reaction teams"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "EM substat",
  "Arrowless Song R1: +24% Elemental Skill and Burst DMG",
  "R5: +48%"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: +24% Elemental Skill and Elemental Burst DMG at R1; EM substat."
]
```

**reviewStatus**

Reason: Replaced ambiguous wording with explicit Elemental Skill and Elemental Burst damage tags and limited EM/reaction value to applicable teams. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### independent-15508-MAIN_DPS-R1 — Aqua Simulacra / MAIN_DPS / R1

- Change reason: Preserved the corrected proximity condition, stated on/off-field effect explicitly and limited HP value to characters/teams that use it. Tier unchanged.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Confidence: MEDIUM
- Rights verified: false
- Checksum: `07431e870377f01815f9d071b363040a5f7124c5b3420308382a71620e0874e8` → `ca6e01e22ec2114ba18985b47c20813af57055ef2bbe6fd79c5f7f748a0820e2`

**explanationVi**

Reason: Preserved the corrected proximity condition, stated on/off-field effect explicitly and limited HP value to characters/teams that use it. Tier unchanged.

- OLD:
```text
The Cleansing Form ở R1 tăng 16% HP và tăng 20% sát thương khi có kẻ địch ở gần, hiệu ứng vẫn có tác dụng dù nhân vật đang ngoài sân. Chỉ số phụ CRIT DMG và mức tăng sát thương 20% là giá trị cốt lõi, trong khi phần HP chỉ có ích với nhân vật biết tận dụng hoặc cần độ bền. Điều kiện địch ở gần gần như luôn thỏa mãn trong chiến đấu thực tế, nhưng tier S được giữ thay vì SS vì buff khiêm tốn và giá trị HP không phổ dụng cho Main DPS cung.
```
- NEW:
```text
The Cleansing Form R1 tăng 16% HP và tăng 20% DMG dealt khi có đối thủ ở gần; hiệu ứng DMG có tác dụng dù người cầm on-field hay off-field. Điều kiện đúng là "có địch ở gần", không phải "không có địch ở gần". CRIT DMG là substat có giá trị phổ dụng, trong khi phần HP chỉ hữu ích với Bow Main DPS có mô hình hoặc nhu cầuHP rõ ràng. Tier S được giữ vì buff 20% ổn định nhưng khiêm tốn và giá trị HP không phổ dụng cho mọi Main DPS cung; không tự động coi là best-in-slot hay SS.
```

**tierJustification**

Reason: Preserved the corrected proximity condition, stated on/off-field effect explicitly and limited HP value to characters/teams that use it. Tier unchanged.

- OLD:
```text
S giữ sau correction: điều kiện 'có địch ở gần' dễ đáp ứng nhưng buff chỉ 20% và HP ít giá trị với đa số Main DPS cung; không tự động coi là SS hay best-in-slot.
```
- NEW:
```text
S giữ nguyên: +20% DMG có điều kiện proximity dễ đáp ứng, CRIT DMG mạnh, HP value thay đổi theo nhân vật.
```

**exactGameplayAssumptions**

Reason: Made gameplay assumptions explicit and machine-reviewable.

- OLD:
```text
[
  "phải có kẻ địch ở gần",
  "buff có hiệu lực cả khi off-field",
  "R1: +16% HP và +20% DMG",
  "CRIT DMG là substat"
]
```
- NEW:
```text
[
  "Opponents must be nearby; condition is not reversed",
  "DMG bonus works off-field",
  "HP scaling/benefit varies by Bow Main DPS",
  "Proximity is practical but must be stated correctly"
]
```

**gameFacts**

Reason: Re-verified against genshin-db@5.2.15 / game-facts.json without copying external editorial text.

- OLD:
```text
[
  "CRIT DMG substat",
  "The Cleansing Form R1: +16% HP, +20% DMG when opponents are nearby, effective on-field and off-field",
  "R5: +32% HP, +40% DMG",
  "NOT a 'no enemies nearby' condition"
]
```
- NEW:
```text
[
  "genshin-db@5.2.15: R1 +16% HP and +20% DMG when opponents are nearby; works on-field and off-field."
]
```

**reviewStatus**

Reason: Preserved the corrected proximity condition, stated on/off-field effect explicitly and limited HP value to characters/teams that use it. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

