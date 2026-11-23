# Phase D2 — Character Tier Record Diff

**STATUS: REVISION DIFF ONLY. NOT APPROVAL. NO DATABASE WRITE.**

Source: `docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json` (SHA-256 `7b102da59c3fe3c75f084363de5a989e2561c1816cb68737e228f967cc0afc2c`)
Independent review: `/home/tuan/Downloads/GENSHINHUB_PHASE_D_REVIEW_NOT_APPROVAL.md` (SHA-256 `d311acb7bd493a5e927dcc216fe014afd554819ddccd4542c67b269907d7206f`)
Revised draft: `CHARACTER_REVISED_DRAFT.json` (records SHA-256 `1177ecd1536703d83167e0e09d30aa145deb10a66f9e3440839dd450756d896e`)

8 of 9 records were substantively revised. 1 were verified with no content change. 1 record was paused for missing comparative evidence. All 9 proposed tiers are unchanged. The 6 non-ready drafts remain outside this sheet with their original waiting categories.

| Record | Character / role / constellation | Old → proposed tier | Status | Old → new checksum |
|---|---|---|---|---|
| `CHAR-TIER-B2-01` | Xiangling / SUB_DPS / C0 | S → S | REVISED_PENDING_ADMIN_REVIEW | `0336f88f1ad6…` → `722349957f2f…` |
| `CHAR-TIER-B2-02` | Xiangling / SUB_DPS / C6 | S → S | REVISION_READY_FOR_ADMIN_REVIEW | `ddde1a741219…` → `eaf5e65aef86…` |
| `CHAR-TIER-B2-03` | Furina / SUB_DPS / C0 | SS → SS | REVISION_READY_FOR_ADMIN_REVIEW | `75541b909f10…` → `cfbe95edb581…` |
| `CHAR-TIER-B2-04` | Furina / SUPPORT / C0 | SS → SS | REVISION_READY_FOR_ADMIN_REVIEW | `538f11b1a352…` → `9b83756276f3…` |
| `CHAR-TIER-B2-05` | Neuvillette / MAIN_DPS / C0 | SS → SS | REVISION_READY_FOR_ADMIN_REVIEW | `a5f92bff8291…` → `9b9a799d6ed0…` |
| `CHAR-TIER-B2-06` | Raiden Shogun / MAIN_DPS / C0 | S → S | NEEDS_MORE_COMPARATIVE_EVIDENCE | `0a66f70cf363…` → `43a5d660b157…` |
| `CHAR-TIER-B2-07` | Nahida / SUPPORT / C0 | SS → SS | VERIFIED_NO_CONTENT_CHANGE | `5a4394a5aa57…` → `e850190905b6…` |
| `CHAR-TIER-B2-08` | Zhongli / SUPPORT / C0 | S → S | REVISION_READY_FOR_ADMIN_REVIEW | `e4076469882f…` → `18090c05ff53…` |
| `CHAR-TIER-B2-09` | Yelan / SUB_DPS / C0 | S → S | REVISION_READY_FOR_ADMIN_REVIEW | `bb5d45f5c28a…` → `17fc33a57a09…` |

## Record-level diffs

### CHAR-TIER-B2-01 — Xiangling / SUB_DPS / C0

- Change reason: Tier S kept only because the draft already has 80 Energy Burst, ER/battery and Pyronado uptime assumptions; D2 makes the reaction/team assumptions explicit and adds KQM mechanical corroboration without changing the tier.
- Review status: REVISED_PENDING_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Checksum: `0336f88f1ad66bedeccc7a125c90f9abee0a0c5d225fc507062e6a7391a79b89` → `722349957f2f8edac0e92fa0082c0c4d9c3d90f91926c346ecaa9fddef49c483`

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "Có battery hoặc particle đủ để Xiangling cast Burst theo chu kỳ",
  "DPS chủ lực ở gần enemy để Pyronado trúng",
  "Không tính C4/C6"
]
```
- NEW:
```text
[
  "Pyronado Burst costs 80 Energy; maintain near-permanent uptime via ER substats and battery particles.",
  "Xiangling remains off-field while Pyronado follows the active character.",
  "Teammates stay near the enemy so Pyronado and Guoba apply Pyro for Vaporize/Melt/Overload/Burning reactions.",
  "Battery/particle generation is explicit; no C1/C4/C6 benefit is counted in this C0 record."
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Xiangling, Pyronado: \"The Pyronado will move with your character for the ability's duration, dealing Pyro DMG to all opponents in its path.\"",
    "genshin-db/talents Xiangling, Beware, It's Super Hot!: chili pepper cho +10% ATK trong 10s.",
    "genshin-db/constellations Xiangling C6 Condensed Pyronado: +15% Pyro DMG cả đội trong Pyronado (dùng để tách C6 thành record riêng).",
    "GenshinHub development DB: 19 CharacterWeapon rows, 5 CharacterArtifact rows, 8 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Xiangling, Pyronado: Energy Cost = 80 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 86,
    "flex": 80,
    "evidence": 80,
    "constellation": 88,
    "access": 88
  },
  "energyRequirements": "Burst Pyronado costs 80 energy (genshin-db talents attributes); gan nhu luon can ER substat hoac battery Electro/Pyro particle.",
  "reactionCompatibility": "Pyro application dày rất hợp Vaporize, Melt, Overload và Burning.",
  "damageContribution": "Sub-DPS damage chính, có thể vượt đòn on-field trong rotation dài.",
  "teamUtility": "Chủ yếu damage; C0 không có buff đội đáng kể ngoài Pyro application.",
  "constellationEffects": "C0 baseline; C6 được tách record riêng để tránh gộp buff 15% Pyro DMG vào C0.",
  "gameplayAssumptions": "Pyronado duy trì liên tục; Xiangling không đứng on-field lâu.",
  "versionNote": "Release v1.0; snapshot 7.2 local dùng để corroborate, không dùng tier cũ làm ground truth.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Xiangling, Pyronado: \"The Pyronado will move with your character for the ability's duration, dealing Pyro DMG to all opponents in its path.\"",
    "genshin-db/talents Xiangling, Beware, It's Super Hot!: chili pepper cho +10% ATK trong 10s.",
    "genshin-db/constellations Xiangling C6 Condensed Pyronado: +15% Pyro DMG cả đội trong Pyronado (dùng để tách C6 thành record riêng).",
    "GenshinHub development DB: 19 CharacterWeapon rows, 5 CharacterArtifact rows, 8 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Xiangling, Pyronado: Energy Cost = 80 (genshin-db talents.attributes.parameters).",
    "genshin-db@5.2.15/talents Xiangling Pyronado: Energy Cost = 80; Pyronado moves with the active character and deals Pyro DMG in its path.",
    "KQM Theorycrafting Library Xiangling evidence (mechanical corroboration only; no editorial text copied): https://library.keqingmains.com/evidence/characters/pyro/xiangling"
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 86,
    "flex": 80,
    "evidence": 80,
    "constellation": 88,
    "access": 88
  },
  "energyRequirements": "Burst Pyronado costs 80 energy (genshin-db talents attributes); gan nhu luon can ER substat hoac battery Electro/Pyro particle.",
  "reactionCompatibility": "Pyro application dày rất hợp Vaporize, Melt, Overload và Burning.",
  "damageContribution": "Sub-DPS damage chính, có thể vượt đòn on-field trong rotation dài.",
  "teamUtility": "Chủ yếu damage; C0 không có buff đội đáng kể ngoài Pyro application.",
  "constellationEffects": "C0 baseline; C6 được tách record riêng để tránh gộp buff 15% Pyro DMG vào C0.",
  "gameplayAssumptions": "Pyronado duy trì liên tục; Xiangling không đứng on-field lâu.",
  "versionNote": "Release v1.0; snapshot 7.2 local dùng để corroborate, không dùng tier cũ làm ground truth.",
  "confidence": "HIGH"
}
```

**reviewStatus**

Reason: Tier S kept only because the draft already has 80 Energy Burst, ER/battery and Pyronado uptime assumptions; D2 makes the reaction/team assumptions explicit and adds KQM mechanical corroboration without changing the tier.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISED_PENDING_ADMIN_REVIEW
```

---

### CHAR-TIER-B2-02 — Xiangling / SUB_DPS / C6

- Change reason: C6 explanation incorrectly implied a generic team-wide buff and did not exclude Pyronado itself. Revised using genshin-db constellation text plus KQM tested finding that Pyronado does not benefit from C6, while Guoba and other applicable Pyro damage can. Tier unchanged.
- Review status: REVISION_READY_FOR_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Checksum: `ddde1a741219d9d62b4f0bdb9f0c00441dad25a7eee0a76248fde851c04fd56f` → `eaf5e65aef864a44b7e3fafd191d72c76782086d8b81a8bfb00db64212aac3c7`

**explanationVi**

Reason: C6 explanation incorrectly implied a generic team-wide buff and did not exclude Pyronado itself. Revised using genshin-db constellation text plus KQM tested finding that Pyronado does not benefit from C6, while Guoba and other applicable Pyro damage can. Tier unchanged.

- OLD:
```text
Đóng góp: ở C6, Condensed Pyronado cộng thêm 15% Pyro DMG cho toàn đội trong thời gian Pyronado hoạt động, nên giá trị của Xiangling tăng từ damage cá nhân sang buff cho cả rotation Pyro. Đề xuất S, không SS: đây là buff có điều kiện và chỉ có ý nghĩa với Pyro damage, trong khi bản thân vẫn giữ nhu cầu ER cao như C0. Điều kiện: phải duy trì Pyronado và có ít nhất một đồng đội gây Pyro damage; lợi ích gần như bằng zero nếu Burst không lên hoặc đội không dùng Pyro. Constellation: record này đánh giá riêng C6, kế thừa Pyronado cơ bản nhưng không cộng thêm claim từ C1/C4. Hạn chế: chi phí đạt C6 và phạm vi buff hẹp khiến accessibility giảm; local evidence tốt nhưng không đủ để đẩy lên SS.
```
- NEW:
```text
Đóng góp: Condensed Pyronado (C6) cấp 15% Pyro DMG Bonus cho các thành viên đội trong thời gian Pyronado hoạt động, nhưng theo kết quả kiểm chứng cơ chế, bản thân Pyronado đã thi triển không được hưởng buff này. Giá trị tăng thêm vì thế nằm ở các nguồn Pyro damage khác đủ điều kiện (ví dụ Guoba và đồng đội Pyro), không phải ở việc tự cộng 15% vào từng tick Pyronado. Đề xuất S được giữ nguyên: lợi ích có điều kiện, chỉ áp dụng cho Pyro damage và vẫn chịu nhu cầu 80 Energy/ER của C0. Điều kiện: Pyronado phải active, có nguồn Pyro damage khác hưởng lợi và rotation giữ Cha cuộc Burst. C0/C6 được tách bạch: C0 đánh giá damage cá nhân; C6 đánh giá giá trị buff có điều kiện cộng với damage cơ bản, không cộng buff vào Pyronado.
```

**limitations**

Reason: Clarified limitations without changing tier.

- OLD:
```text
[
  "Chỉ hưởng lợi với Pyro damage",
  "Vẫn cần ER và battery như C0",
  "C6 có chi phí cao"
]
```
- NEW:
```text
[
  "Pyronado không được hưởng 15% Pyro DMG của C6 theo tested finding; không được cộng vào damage cá nhân",
  "Chỉ có giá trị khi có nguồn Pyro damage khác hưởng buff",
  "Vẫn cần ER/battery như C0",
  "Chi phí đạt C6 cao"
]
```

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "Pyronado active trong phần lớn rotation",
  "Có ít nhất một Pyro DPS/sub-DPS khác hưởng buff"
]
```
- NEW:
```text
[
  "Pyronado active theo chu kỳ",
  "Có ít nhất một nguồn Pyro damage khác (đồng đội hoặc Guoba) hưởng lợi trong cửa sổ buff",
  "Không cộng C1/C4 vào score",
  "Không tính lại tier S/SS chỉ từ rubric score"
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/constellations Xiangling C6 Condensed Pyronado: \"For the duration of Pyronado, all party members receive a 15% Pyro DMG Bonus.\"",
    "genshin-db/talents Xiangling Pyronado: xác nhận điều kiện kích hoạt buff là thời gian tồn tại của Pyronado.",
    "GenshinHub development DB: 19 CharacterWeapon rows, 5 CharacterArtifact rows, 8 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Xiangling, Pyronado: Energy Cost = 80 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 88,
    "flex": 82,
    "evidence": 80,
    "constellation": 80,
    "access": 66
  },
  "energyRequirements": "Burst Pyronado costs 80 energy, khong doi o C6 (genshin-db talents attributes); van can ER/battery de Pyronado cover rotation.",
  "reactionCompatibility": "Buff 15% Pyro DMG làm mạnh Vaporize/Melt/Overload/Burning nhưng không giúp reaction không có Pyro damage.",
  "damageContribution": "Damage cá nhân giữ nguyên; giá trị tăng thêm nằm ở buff Pyro cho đồng đội.",
  "teamUtility": "Party-wide Pyro DMG bonus là utility rõ ràng hơn C0.",
  "constellationEffects": "C6 là điều kiện định nghĩa; không tự động cộng C1 Pyro RES shred vào score.",
  "gameplayAssumptions": "Pyronado lên đúng chu kỳ và đồng đội Pyro đánh trong thời gian buff.",
  "versionNote": "Release v1.0; cơ chế C6 đối chiếu snapshot 7.2 tại local DB.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/constellations Xiangling C6 Condensed Pyronado: \"For the duration of Pyronado, all party members receive a 15% Pyro DMG Bonus.\"",
    "genshin-db/talents Xiangling Pyronado: xác nhận điều kiện kích hoạt buff là thời gian tồn tại của Pyronado.",
    "GenshinHub development DB: 19 CharacterWeapon rows, 5 CharacterArtifact rows, 8 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Xiangling, Pyronado: Energy Cost = 80 (genshin-db talents.attributes.parameters).",
    "genshin-db@5.2.15/constellations Xiangling C6: \"For the duration of Pyronado, all party members receive a 15% Pyro DMG Bonus.\"",
    "KQM TCL tested finding: \"XL Pyronado Does Not Benefit From Her C6\"; Guoba and the 3rd hit of the initial swings do benefit: https://library.keqingmains.com/evidence/characters/pyro/xiangling",
    "genshin-db@5.2.15/talents Xiangling Pyronado: Energy Cost = 80; Pyronado moves with active character and deals Pyro DMG in its path."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 88,
    "flex": 82,
    "evidence": 80,
    "constellation": 80,
    "access": 66
  },
  "energyRequirements": "Burst Pyronado costs 80 energy, khong doi o C6 (genshin-db talents attributes); van can ER/battery de Pyronado cover rotation.",
  "reactionCompatibility": "Buff 15% Pyro DMG làm mạnh Vaporize/Melt/Overload/Burning nhưng không giúp reaction không có Pyro damage.",
  "damageContribution": "Damage cá nhân giữ nguyên; giá trị tăng thêm nằm ở buff Pyro cho đồng đội.",
  "teamUtility": "Party-wide Pyro DMG bonus là utility rõ ràng hơn C0.",
  "constellationEffects": "C6 là điều kiện định nghĩa; không tự động cộng C1 Pyro RES shred vào score.",
  "gameplayAssumptions": "Pyronado lên đúng chu kỳ và đồng đội Pyro đánh trong thời gian buff.",
  "versionNote": "Release v1.0; cơ chế C6 đối chiếu snapshot 7.2 tại local DB.",
  "confidence": "HIGH",
  "gameFactDiscrepancy": "genshin-db text is broad (\"all party members\"); the KQM tested finding narrows the applied damage sources. This D2 revision follows the tested behavior and does not silently edit the frozen source."
}
```

**reviewStatus**

Reason: C6 explanation incorrectly implied a generic team-wide buff and did not exclude Pyronado itself. Revised using genshin-db constellation text plus KQM tested finding that Pyronado does not benefit from C6, while Guoba and other applicable Pyro damage can. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISION_READY_FOR_ADMIN_REVIEW
```

---

### CHAR-TIER-B2-03 — Furina / SUB_DPS / C0

- Change reason: SUB_DPS explanation reused Fanfare-centric Support reasoning. Rewritten around off-field Salon Hydro damage, HP consumption/scaling and healer constraints while preserving the same proposed tier.
- Review status: REVISION_READY_FOR_ADMIN_REVIEW
- Tier: SS → SS (unchanged)
- Checksum: `75541b909f10a7b23c9936239dcba65c2f4966dfe1e1b8000ec7cbb165a23efc` → `cfbe95edb58192413f61f043c1c165e463c7812cc18166e07f75d63d49aa4f56`

**explanationVi**

Reason: SUB_DPS explanation reused Fanfare-centric Support reasoning. Rewritten around off-field Salon Hydro damage, HP consumption/scaling and healer constraints while preserving the same proposed tier.

- OLD:
```text
Đóng góp: Salon Solitaire triệu hồi ba Salon Member đánh Hydro off-field theo Max HP và tự tiêu HP đồng đội để tăng damage, trong khi Burst tích Fanfare từ mọi thay đổi HP rồi chuyển thành damage bonus và incoming healing bonus cho cả đội. Đề xuất SS vì Furina vừa là nguồn Hydro damage mạnh vừa là một trong những cơ chế buff lớn nhất trò chơi, và tất cả đều có ở C0. Điều kiện: cần một healer hoặc nguồn hồi HP liên tục để Fanfare tăng nhanh; hiệu quả giảm nếu HP đội không dao động hoặc nếu không có healer. Constellation: không phụ thuộc; C0 đã có đầy đủ Fanfare và Salon Members, C1 chỉ cho Fanfare ban đầu và C6 biến cô thành on-field DPS nên tách riêng nếu đánh giá. Hạn chế: consume HP có thể nguy hiểm nếu thiếu heal, và rotation cần thiết kế để vừa drain vừa hồi.
```
- NEW:
```text
Đóng góp trong role SUB_DPS: Salon Members của Ousia Salon Solitaire đánh Hydro off-field theo Max HP và ưu tiên mục tiêu của active character; khi có thành viên trên 50% HP, đòn tăng theo số người (110%/120%/130%/140%) và tiêu HP của họ. Đây là nguồn Hydro damage ngoài sân chính của Furina, không phải mô tả lại record SUPPORT. Burst Fanfare vẫn đóng góp tổng damage đội nhưng được nêu như phần bổ trợ, không thay thế đánh giá damage cá nhân. Đề xuất SS vì mức Hydro damage off-field và đóng góp tổng rất cao ở C0. Điều kiện: cần healer hoặc nguồn hồi HP để HP dao động và để Salon Members tiêu HP an toàn; nếu HP không đổi hoặc rotation thiếu healer, giá trị giảm rõ rệt. Hạn chế: rủi ro khi consume HP, cần quản lý Pneuma/Pousia và không phải mọi đội đều thiết kế được vòng drain/heal tối ưu.
```

**limitations**

Reason: Clarified limitations without changing tier.

- OLD:
```text
[
  "Cần healer để đạt Fanfare cao",
  "Tự consume HP gây rủi ro nếu rotation sai",
  "Pneuma/Pousia alignment cần quản lý"
]
```
- NEW:
```text
[
  "Cần healer/nguồn hồi HP để khai thác tiêu HP và Fanfare",
  "HP consume có thể gây rủi ro nếu rotation sai",
  "Pneuma/Pousia alignment cần quản lý",
  "Không phải support \"set and forget\""
]
```

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "Có healer hoặc nguồn hồi HP liên tục",
  "Rotation cho phép HP dao động để tích Fanfare",
  "Không tính C1/C6"
]
```
- NEW:
```text
[
  "Có healer hoặc nguồn hồi chủ động",
  "Rotation cho phép HP dao động trong Burst",
  "Không tính C1/C6",
  "Đánh giá độc lập với record SUPPORT"
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Furina, Salon Solitaire: Salon Members \"will attack nearby opponents at intervals, dealing Hydro DMG based on Max HP\" và tăng 110%/120%/130%/140% damage theo số character trên 50% HP.",
    "genshin-db/talents Furina, Let the People Rejoice: \"when nearby party members' HP increases or decreases, 1 Fanfare point... Furina will increase the DMG dealt by and Incoming Healing Bonus of all nearby party members.\"",
    "genshin-db/talents Furina, Endless Waltz: overflow heal from nguồn khác cho Furina hồi 2% Max HP mỗi 2s trong 4s.",
    "GenshinHub development DB: 14 CharacterWeapon rows, 3 CharacterArtifact rows, 9 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Furina, Let the People Rejoice: Energy Cost = 60 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 94,
    "flex": 88,
    "evidence": 86,
    "constellation": 90,
    "access": 70
  },
  "energyRequirements": "Burst Let the People Rejoice costs 60 energy (genshin-db talents attributes), khong phai burst rat cao; can ER de giu Burst bao phu rotation va tich Fanfare.",
  "reactionCompatibility": "Hydro damage đều giúp Vaporize/Frozen/Electro-Charged/Bloom; Fanfare buff áp dụng cho mọi nguồn damage.",
  "damageContribution": "Vừa sub-DPS vừa damage-buff; đóng góp tổng rất lớn dù không đứng on-field.",
  "teamUtility": "Damage bonus + incoming healing bonus + Hydro application trong cùng một character.",
  "constellationEffects": "C0 baseline; C6 on-field infusion được tách riêng, không gộp vào record này.",
  "gameplayAssumptions": "Healer active trong Burst; Fanfare đạt mức cao trước khi DPS xả chiêu.",
  "versionNote": "Release v4.2 trong genshin-db; snapshot 7.2 local có 9 team row nên evidence khá chắc.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Furina, Salon Solitaire: Salon Members \"will attack nearby opponents at intervals, dealing Hydro DMG based on Max HP\" và tăng 110%/120%/130%/140% damage theo số character trên 50% HP.",
    "genshin-db/talents Furina, Let the People Rejoice: \"when nearby party members' HP increases or decreases, 1 Fanfare point... Furina will increase the DMG dealt by and Incoming Healing Bonus of all nearby party members.\"",
    "genshin-db/talents Furina, Endless Waltz: overflow heal from nguồn khác cho Furina hồi 2% Max HP mỗi 2s trong 4s.",
    "GenshinHub development DB: 14 CharacterWeapon rows, 3 CharacterArtifact rows, 9 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Furina, Let the People Rejoice: Energy Cost = 60 (genshin-db talents.attributes.parameters).",
    "genshin-db@5.2.15/talents Furina Salon Solitaire: Salon Members attack nearby opponents at intervals, prioritizing active character target, dealing Hydro DMG based on Max HP; attack power scales 110%/120%/130%/140% with number of characters above 50% HP and consumes their HP.",
    "genshin-db@5.2.15/talents Furina Let the People Rejoice: HP increases/decreases grant Fanfare and increase DMG dealt / Incoming Healing Bonus of all nearby party members."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 94,
    "flex": 88,
    "evidence": 86,
    "constellation": 90,
    "access": 70
  },
  "energyRequirements": "Burst Let the People Rejoice costs 60 energy (genshin-db talents attributes), khong phai burst rat cao; can ER de giu Burst bao phu rotation va tich Fanfare.",
  "reactionCompatibility": "Hydro damage đều giúp Vaporize/Frozen/Electro-Charged/Bloom; Fanfare buff áp dụng cho mọi nguồn damage.",
  "damageContribution": "Vừa sub-DPS vừa damage-buff; đóng góp tổng rất lớn dù không đứng on-field.",
  "teamUtility": "Damage bonus + incoming healing bonus + Hydro application trong cùng một character.",
  "constellationEffects": "C0 baseline; C6 on-field infusion được tách riêng, không gộp vào record này.",
  "gameplayAssumptions": "Healer active trong Burst; Fanfare đạt mức cao trước khi DPS xả chiêu.",
  "versionNote": "Release v4.2 trong genshin-db; snapshot 7.2 local có 9 team row nên evidence khá chắc.",
  "confidence": "HIGH",
  "roleSeparation": "This record evaluates Furina as off-field Hydro damage. The SUPPORT record evaluates Fanfare team amplification. Both may exist independently only if the Admin accepts the separate-role policy; approval of one does not approve the other."
}
```

**reviewStatus**

Reason: SUB_DPS explanation reused Fanfare-centric Support reasoning. Rewritten around off-field Salon Hydro damage, HP consumption/scaling and healer constraints while preserving the same proposed tier.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISION_READY_FOR_ADMIN_REVIEW
```

---

### CHAR-TIER-B2-04 — Furina / SUPPORT / C0

- Change reason: SUPPORT explanation separated from SUB_DPS record and focused on Fanfare, team-wide damage amplification, HP fluctuation, healer synergy and failure conditions. Tier unchanged.
- Review status: REVISION_READY_FOR_ADMIN_REVIEW
- Tier: SS → SS (unchanged)
- Checksum: `538f11b1a3522b220f85b6ea206f837c1258b563b960c789c94817bd2d82370d` → `9b83756276f3699eed0e00d3cef7aed77c1efa02d6e93cf251f3ceced48ee383`

**explanationVi**

Reason: SUPPORT explanation separated from SUB_DPS record and focused on Fanfare, team-wide damage amplification, HP fluctuation, healer synergy and failure conditions. Tier unchanged.

- OLD:
```text
Đóng góp: với tư cách support, Furina dùng Fanfare để tăng DMG dealt và Incoming Healing Bonus cho toàn đội, còn Endless Waltz tận dụng healing overflow để hồi tiếp cho party; nhờ vậy cô vừa buff vừa giảm áp lực lên healer. Đề xuất SS vì bộ buff toàn đội này áp dụng cho hầu hết rotation và không bị giới hạn bởi loại vũ khí hay element của DPS. Điều kiện: hiệu quả tỉ lệ thuận với tốc độ dao động HP và chất lượng healer; nếu đội đã có quá nhiều heal overflow mà không có Furina thì Fanfare lên chậm. Constellation: không phụ thuộc; C0 đã có Fanfare đầy đủ, C1 chỉ thêm 150 Fanfare ban đầu và nâng trần. Hạn chế: vẫn consume HP của đồng đội và cần thiết kế rotation cẩn thận, nên đây không phải support "set and forget" như Zhongli.
```
- NEW:
```text
Đóng góp trong role SUPPORT: Let the People Rejoice tạo Fanfare mỗi khi HP thành viên tăng hoặc giảm theo phần trăm Max HP, rồi chuyển thành DMG dealt và Incoming Healing Bonus cho toàn đội. Đây là buff toàn đội, không phải đánh giá lại Hydro damage off-field của record SUB_DPS. Đề xuất SS vì bộ buff ở C0 áp dụng cho hầu hết DPS và không khóa theo loại vũ khí hay element. Điều kiện: cần healer hoặc nguồn hồi chủ động để tạo dao động HP nhanh; nếu đội giữ HP tĩnh, Fanfare lên chậm và buff không đạt giá trị thiết kế. Hạn chế: consume HP và yêu cầu thiết kế rotation khiến Furina không phải support "set and forget"; lợi ích giảm trong đội không đáp ứng điều kiện HP.
```

**limitations**

Reason: Clarified limitations without changing tier.

- OLD:
```text
[
  "Fanfare phụ thuộc dao động HP",
  "Cần healer hoặc nguồn hồi chủ động",
  "Rotation phức tạp hơn support truyền thống"
]
```
- NEW:
```text
[
  "Fanfare phụ thuộc dao động HP",
  "Cần healer hoặc nguồn hồi chủ động",
  "Rotation phức tạp hơn support truyền thống",
  "Không phải buff không điều kiện"
]
```

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "Có healer representative trong đội",
  "Rotation tạo dao động HP liên tục trong Burst",
  "Không tính C1"
]
```
- NEW:
```text
[
  "Có healer representative trong đội",
  "Rotation tạo HP increase/decrease liên tục trong Burst",
  "Không tính C1/C6",
  "Admin phải xác nhận riêng việc tồn tại hai record SUPPORT/SUB_DPS"
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Furina, Let the People Rejoice: Fanfare tăng \"DMG dealt by and Incoming Healing Bonus of all nearby party members\".",
    "genshin-db/talents Furina, Endless Waltz: \"if the source of the healing is not Furina herself and the healing overflows, then Furina will heal nearby party members for 2% of their Max HP once every 2s for the next 4s.\"",
    "genshin-db/talents Furina, Unheard Confession: mỗi 1000 Max HP tăng 0.7% damage Salon Members đến 28%.",
    "GenshinHub development DB: 14 CharacterWeapon rows, 3 CharacterArtifact rows, 9 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Furina, Let the People Rejoice: Energy Cost = 60 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 96,
    "flex": 90,
    "evidence": 86,
    "constellation": 90,
    "access": 68
  },
  "energyRequirements": "Burst Let the People Rejoice costs 60 energy (genshin-db talents attributes); Fanfare chi tich trong Burst nen van can ER du de duy tri uptime.",
  "reactionCompatibility": "DMG bonus của Fanfare áp dụng cho mọi reaction damage; Hydro từ Salon Members hỗ trợ reaction gốc Hydro.",
  "damageContribution": "Thiên về buff hơn là damage trực tiếp trong role SUPPORT.",
  "teamUtility": "Một trong những bộ damage buff toàn đội mạnh nhất ở C0.",
  "constellationEffects": "Chỉ C0; C1 extra Fanfare không được cộng vào record này.",
  "gameplayAssumptions": "Healer hồi đều trong Burst; Fanfare đạt giá trị cao trước khi DPS kết thúc rotation.",
  "versionNote": "Release v4.2; corroborated bởi 9 CharacterTeam row trong snapshot 7.2.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Furina, Let the People Rejoice: Fanfare tăng \"DMG dealt by and Incoming Healing Bonus of all nearby party members\".",
    "genshin-db/talents Furina, Endless Waltz: \"if the source of the healing is not Furina herself and the healing overflows, then Furina will heal nearby party members for 2% of their Max HP once every 2s for the next 4s.\"",
    "genshin-db/talents Furina, Unheard Confession: mỗi 1000 Max HP tăng 0.7% damage Salon Members đến 28%.",
    "GenshinHub development DB: 14 CharacterWeapon rows, 3 CharacterArtifact rows, 9 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Furina, Let the People Rejoice: Energy Cost = 60 (genshin-db talents.attributes.parameters).",
    "genshin-db@5.2.15/talents Furina Let the People Rejoice: nearby party members HP increase/decrease grants Fanfare; Furina increases DMG dealt and Incoming Healing Bonus of all nearby party members based on Fanfare.",
    "genshin-db@5.2.15/talents Furina Endless Waltz: overflow healing from non-Furina sources heals party members for 2% of their Max HP every 2s for 4s."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 96,
    "flex": 90,
    "evidence": 86,
    "constellation": 90,
    "access": 68
  },
  "energyRequirements": "Burst Let the People Rejoice costs 60 energy (genshin-db talents attributes); Fanfare chi tich trong Burst nen van can ER du de duy tri uptime.",
  "reactionCompatibility": "DMG bonus của Fanfare áp dụng cho mọi reaction damage; Hydro từ Salon Members hỗ trợ reaction gốc Hydro.",
  "damageContribution": "Thiên về buff hơn là damage trực tiếp trong role SUPPORT.",
  "teamUtility": "Một trong những bộ damage buff toàn đội mạnh nhất ở C0.",
  "constellationEffects": "Chỉ C0; C1 extra Fanfare không được cộng vào record này.",
  "gameplayAssumptions": "Healer hồi đều trong Burst; Fanfare đạt giá trị cao trước khi DPS kết thúc rotation.",
  "versionNote": "Release v4.2; corroborated bởi 9 CharacterTeam row trong snapshot 7.2.",
  "confidence": "HIGH",
  "roleSeparation": "Separate from the SUB_DPS record; explicit Admin confirmation is still required before both can be approved."
}
```

**reviewStatus**

Reason: SUPPORT explanation separated from SUB_DPS record and focused on Fanfare, team-wide damage amplification, HP fluctuation, healer synergy and failure conditions. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISION_READY_FOR_ADMIN_REVIEW
```

---

### CHAR-TIER-B2-05 — Neuvillette / MAIN_DPS / C0

- Change reason: Clarified A1 stacks: three different relevant Hydro reactions maximize Past Draconic Glories; they are not a universal prerequisite to play. Added explicit C0 interruption and shield/positioning requirements. Tier unchanged.
- Review status: REVISION_READY_FOR_ADMIN_REVIEW
- Tier: SS → SS (unchanged)
- Checksum: `a5f92bff8291740647564f7acc8320a96cc9bcb8fa235011b52cb74c0f7c1805` → `9b9a799d6ed012d55b7843cff4ebfba2dfd5bb6a2606c468ca3d14652b48c41b`

**explanationVi**

Reason: Clarified A1 stacks: three different relevant Hydro reactions maximize Past Draconic Glories; they are not a universal prerequisite to play. Added explicit C0 interruption and shield/positioning requirements. Tier unchanged.

- OLD:
```text
Đóng góp: Neuvillette dùng Charged Attack Equitable Judgment làm nguồn damage chính, được tăng mạnh bởi stack Past Draconic Glories mỗi khi đội trigger từng loại reaction và được cộng Hydro DMG Bonus theo HP hiện tại qua passive thứ hai. Đề xuất SS vì anh tự đủ damage, tự buff và có HP scaling riêng, nhưng vẫn cần đồng đội tạo reaction và bảo vệ khỏi interruption nên chưa tuyệt đối. Điều kiện: cần ít nhất một reaction partner để có stack; ngược lại damage giảm rõ rệt; interruption khi đang charge cũng làm mất giá trị lớn. Constellation: không phụ thuộc; C0 đã có đầy đủ stack và Hydro DMG Bonus, C1 chỉ thêm một stack ban đầu cùng interruption resistance, C6 thêm current nên tách riêng nếu đánh giá. Hạn chế: tốc độ charge chậm, dễ bị ngắt và rotation khá cố định quanh một đòn dài.
```
- NEW:
```text
Đóng góp: Equitable Judgment là nguồn damage chính, được tăng bởi Past Draconic Glories và Hydro DMG Bonus theo HP hiện tại. A1 tạo một stack riêng cho từng loại Elemental Reaction có Hydro do party member kích hoạt (Vaporize, Frozen, Electro-Charged, Bloom, Hydro Swirl/Crystallize, v.v.), tối đa 3 stack; vì vậy cần ba loại khác nhau để tối đa hóa passive, nhưng đây là điều kiện tối ưu hóa chứ không phải yêu cầu bắt buộc để nhân vật chơi được. Đề xuất SS vì damage on-field và self-buff rất mạnh ở C0. Điều kiện: HP duy trì trên ngưỡng passive thứ hai, có reaction partner phù hợp khi muốn full stack, và có shielding, interruption resistance hoặc positioning tốt vì Equitable Judgment dễ bị ngắt ở C0. Hạn chế: charge chậm, rotation khá cố định và phụ thuộc team để đạt giá trị passive tối đa.
```

**limitations**

Reason: Clarified limitations without changing tier.

- OLD:
```text
[
  "Charged Attack dễ bị interruption",
  "Phụ thuộc đồng đội trigger reaction để đạt stack tối đa",
  "Rotation dài và ít linh hoạt"
]
```
- NEW:
```text
[
  "Charged Attack dễ bị interruption ở C0",
  "Full passive cần ba loại reaction khác nhau; không phải yêu cầu để chơi nhưng là điều kiện tối đa hóa",
  "Rotation dài và ít linh hoạt",
  "Cần kiểm soát HP"
]
```

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "Có ít nhất một đồng đội trigger reaction khác loại",
  "Có shielding/interruption resistance hoặc positioning tốt",
  "Không tính C1/C6",
  "Can it nhat 3 loai Elemental Reaction KHAC NHAU do party member trigger (Vaporize/Frozen/Electro-Charged/Bloom/Hydro Swirl/Hydro Crystallize...) de lay du 3 stack Past Draconic Glories; HP luon tren 30%; co shielding/interruption resistance hoac positioning tot."
]
```
- NEW:
```text
[
  "Có reaction partner phù hợp khi muốn đạt 3 stack",
  "Có shielding/interruption resistance hoặc positioning tốt",
  "Không tính C1/C6",
  "HP duy trì trên 30% theo passive thứ hai"
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Neuvillette, Heir to the Ancient Sea's Authority: reaction tạo stack \"Past Draconic Glories... Charged Attack: Equitable Judgment to deal 110%/125%/160% of its original DMG\".",
    "genshin-db/talents Neuvillette, Discipline of the Supreme Arbitration: \"For each 1% of Neuvillette's current HP greater than 30%... 0.6% Hydro DMG Bonus\", tối đa 30%.",
    "genshin-db/talents Neuvillette, O Tears I Shall Repay: tạo Sourcewater Droplets để hỗ trợ charge.",
    "GenshinHub development DB: 11 CharacterWeapon rows, 6 CharacterArtifact rows, 5 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Neuvillette, O Tears I Shall Repay: Energy Cost = 70 (genshin-db talents.attributes.parameters).",
    "genshin-db/talents Neuvillette, Heir to the Ancient Sea's Authority: \"When a party member triggers a Vaporize, Frozen, Electro-Charged, Lunar-Charged, Bloom, Lunar-Bloom, Hydro Swirl, Hydro Crystallize or a Lunar-Crystallize reaction... 1 stack... Max 3 stacks. The stacks... created by each kind of Elemental Reaction exist independently.\""
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 96,
    "flex": 80,
    "evidence": 86,
    "constellation": 86,
    "access": 74
  },
  "energyRequirements": "Burst 70 năng lượng nhưng không phải nguồn damage chính; ưu tiên HP/CRIT hơn ER cực cao.",
  "reactionCompatibility": "Vaporize, Frozen, Electro-Charged, Bloom và Hydro Swirl/Crystallize đều tạo stack riêng.",
  "damageContribution": "Main carry tuyệt đối; phần lớn damage đến từ Equitable Judgment.",
  "teamUtility": "Ít buff cho đồng đội; outward value nằm ở việc kích hoạt reaction cho stack.",
  "constellationEffects": "C0 baseline; C1 interruption resistance và C6 currents không được cộng vào đây.",
  "gameplayAssumptions": "Equitable Judgment được charge trọn vẹn; HP duy trì trên 30% Max HP.",
  "versionNote": "Release v4.1; snapshot 7.2 local có 5 team row và 6 artifact row.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Neuvillette, Heir to the Ancient Sea's Authority: reaction tạo stack \"Past Draconic Glories... Charged Attack: Equitable Judgment to deal 110%/125%/160% of its original DMG\".",
    "genshin-db/talents Neuvillette, Discipline of the Supreme Arbitration: \"For each 1% of Neuvillette's current HP greater than 30%... 0.6% Hydro DMG Bonus\", tối đa 30%.",
    "genshin-db/talents Neuvillette, O Tears I Shall Repay: tạo Sourcewater Droplets để hỗ trợ charge.",
    "GenshinHub development DB: 11 CharacterWeapon rows, 6 CharacterArtifact rows, 5 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Neuvillette, O Tears I Shall Repay: Energy Cost = 70 (genshin-db talents.attributes.parameters).",
    "genshin-db/talents Neuvillette, Heir to the Ancient Sea's Authority: \"When a party member triggers a Vaporize, Frozen, Electro-Charged, Lunar-Charged, Bloom, Lunar-Bloom, Hydro Swirl, Hydro Crystallize or a Lunar-Crystallize reaction... 1 stack... Max 3 stacks. The stacks... created by each kind of Elemental Reaction exist independently.\"",
    "genshin-db@5.2.15/talents Neuvillette Heir to the Ancient Sea's Authority: one stack per kind of relevant Elemental Reaction, max 3; stacks from each reaction kind exist independently; Equitable Judgment deals 110%/125%/160% of original DMG.",
    "genshin-db@5.2.15/talents Neuvillette Discipline of the Supreme Arbitration: 0.6% Hydro DMG Bonus per 1% current HP above 30%, max 30%.",
    "KQM Neuvillette quick guide (mechanical context only; no editorial text copied): https://keqingmains.com/q/neuvillette-quickguide/"
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 96,
    "flex": 80,
    "evidence": 86,
    "constellation": 86,
    "access": 74
  },
  "energyRequirements": "Burst 70 năng lượng nhưng không phải nguồn damage chính; ưu tiên HP/CRIT hơn ER cực cao.",
  "reactionCompatibility": "Vaporize, Frozen, Electro-Charged, Bloom và Hydro Swirl/Crystallize đều tạo stack riêng.",
  "damageContribution": "Main carry tuyệt đối; phần lớn damage đến từ Equitable Judgment.",
  "teamUtility": "Ít buff cho đồng đội; outward value nằm ở việc kích hoạt reaction cho stack.",
  "constellationEffects": "C0 baseline; C1 interruption resistance và C6 currents không được cộng vào đây.",
  "gameplayAssumptions": "Equitable Judgment được charge trọn vẹn; HP duy trì trên 30% Max HP.",
  "versionNote": "Release v4.1; snapshot 7.2 local có 5 team row và 6 artifact row.",
  "confidence": "HIGH",
  "passiveInterpretation": "Three different reaction types maximize stacks; the character remains playable without all three. This distinction is explicit to avoid turning an optimization condition into a false hard requirement."
}
```

**reviewStatus**

Reason: Clarified A1 stacks: three different relevant Hydro reactions maximize Past Draconic Glories; they are not a universal prerequisite to play. Added explicit C0 interruption and shield/positioning requirements. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISION_READY_FOR_ADMIN_REVIEW
```

---

### CHAR-TIER-B2-06 — Raiden Shogun / MAIN_DPS / C0

- Change reason: Rubric score and mechanical facts alone do not defend Tier S. Status changed to NEEDS_MORE_COMPARATIVE_EVIDENCE with an explicit evidence checklist; the original proposed tier S is preserved but is not review-ready and no explanatory filler was added.
- Review status: NEEDS_MORE_COMPARATIVE_EVIDENCE
- Tier: S → S (unchanged)
- Checksum: `0a66f70cf3639d98046376b4930898020898d245160863f4ce0f9f0e56f703c2` → `43a5d660b157347ffc39ac073b5d38559fc0da7cf072a9a553a3aff946e80a64`

**explanationVi**

Reason: Rubric score and mechanical facts alone do not defend Tier S. Status changed to NEEDS_MORE_COMPARATIVE_EVIDENCE with an explicit evidence checklist; the original proposed tier S is preserved but is not review-ready and no explanatory filler was added.

- OLD:
```text
Đóng góp: Musou Shinsetsu tiêu thụ Resolve tích từ Burst của đồng đội để tạo một đòn AoE lớn rồi chuyển sang Musou Isshin, trong đó đòn thường được tính là Burst damage và hồi năng lượng cho cả đội. Đề xuất S vì combo burst-nuke + energy recharge + coordinated attack từ E rất mạnh, nhưng hiệu quả gắn chặt với việc đồng đội phải dùng Burst thường xuyên nên kém self-sufficient hơn Neuvillette. Điều kiện: cần party có nhiều Burst cost cao để tích Resolve; nếu rotation không tạo đủ stack thì đòn cuối yếu. Constellation: không phụ thuộc; C0 đã có Musou Isshin và energy restore, C2 là constellation quan trọng nhưng không được cộng vào claim C0 và C6 giảm CD cũng tách riêng. Hạn chế: thời gian trên sân dài, dễ bị interruption và phần lớn sức mạnh nằm ở cửa sổ Burst ngắn.
```
- NEW:
```text
Đánh giá D2 cho Raiden Shogun C0 bị tạm dừng vì thiếu comparative evidence. Các yếu tố bắt buộc phải nộp gồm: (1) xác định rõ archetype on-field Main DPS đang đánh giá, ví dụ burst-focused hypercarry với rotation xả Burst của đồng đội; (2) định lượng Resolve tạo ra từ Burst của từng thành viên và chu kỳ Musou Isshin; (3) chứng minh Energy hồi lại cho đội ở C0 và vai trò của Enlightened One; (4) mô tả burst rotation cụ thể và thời gian trên sân; (5) khẳng định mọi claim chỉ dùng C0, không cộng C2 hoặc C6; và (6) so sánh theo game version 7.2 với các Main DPS khác để giải thích vì sao là S thay vì A hoặc SS. Các dữ liệu cơ chế hiện tại chỉ xác nhận Musou Shinsetsu scale theo Resolve, Musou Isshin hồi Energy tối đa 5 lần và Eye of Stormy Judgment tăng Burst DMG theo Energy Cost; chúng không tự chứng minh tier S. Vì vậy proposed tier S được giữ nguyên nhưng record không review-ready cho đến khi checklist trên được bổ sung.
```

**limitations**

Reason: Clarified limitations without changing tier.

- OLD:
```text
[
  "Phụ thuộc đồng đội dùng Burst để tích Resolve",
  "Thời gian on-field dài",
  "Cần ER cao để tự xoay Burst"
]
```
- NEW:
```text
[
  "Chưa có archetype on-field được định nghĩa đủ rõ",
  "Chưa có định lượng Resolve/Energy theo rotation representative",
  "Chưa có so sánh version-scoped với Main DPS khác",
  "C2/C6 bị loại trừ và không được dùng để nâng tier"
]
```

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "Party có ít nhất hai unit hay dùng Burst",
  "Raiden đứng on-field đủ lâu để dùng Musou Isshin",
  "Không tính C2/C6"
]
```
- NEW:
```text
[
  "Bắt buộc nộp: archetype burst-focused on-field tại C0",
  "Bắt buộc nộp: số Resolve từ party Bursts và rotation mẫu",
  "Bắt buộc nộp: Energy restore của Musou Isshin/Enlightened One ở C0",
  "Không tính C2/C6",
  "Chưa có so sánh v7.2 đủ điều kiện"
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Raiden Shogun, Secret Art: Musou Shinsetsu: damage \"increased based on the number of Chakra Desiderata's Resolve stacks consumed\" và Musou Isshin attacks \"regenerate Energy for all nearby party members\".",
    "genshin-db/talents Raiden Shogun, Transcendence: Baleful Omen: Eye of Stormy Judgment tăng Elemental Burst DMG dựa trên Energy Cost và coordinated attack mỗi 0.9s.",
    "genshin-db/talents Raiden Shogun, Enlightened One: ER vượt 100% cho 0.4% Electro DMG và 0.6% energy restore mỗi 1%.",
    "GenshinHub development DB: 14 CharacterWeapon rows, 4 CharacterArtifact rows, 7 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Raiden Shogun, Secret Art: Musou Shinsetsu: Energy Cost = 90 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 86,
    "flex": 78,
    "evidence": 82,
    "constellation": 84,
    "access": 72
  },
  "energyRequirements": "Burst 90 năng lượng; ER là stat ưu tiên hàng đầu để tự maintenance và tối ưu Enlightened One.",
  "reactionCompatibility": "Electro-Charged, Overload và Aggravate đều dùng được; Burst damage không bị reaction khuếch đại trực tiếp.",
  "damageContribution": "Main carry trong cửa sổ Musou Isshin; ngoài ra có off-field coordinated damage từ Eye.",
  "teamUtility": "Energy restore toàn đội và Burst DMG bonus từ Eye là utility đáng kể.",
  "constellationEffects": "C0 baseline; C2 DEF ignore và C6 burst CD reduction không được cộng vào score.",
  "gameplayAssumptions": "Resolve tích ở mức cao trước khi cast Burst; Musou Isshin hoàn thành 5 nhịp hồi năng lượng.",
  "versionNote": "Release v2.1; snapshot 7.2 local có 7 team row làm corroboration.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Raiden Shogun, Secret Art: Musou Shinsetsu: damage \"increased based on the number of Chakra Desiderata's Resolve stacks consumed\" và Musou Isshin attacks \"regenerate Energy for all nearby party members\".",
    "genshin-db/talents Raiden Shogun, Transcendence: Baleful Omen: Eye of Stormy Judgment tăng Elemental Burst DMG dựa trên Energy Cost và coordinated attack mỗi 0.9s.",
    "genshin-db/talents Raiden Shogun, Enlightened One: ER vượt 100% cho 0.4% Electro DMG và 0.6% energy restore mỗi 1%.",
    "GenshinHub development DB: 14 CharacterWeapon rows, 4 CharacterArtifact rows, 7 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Raiden Shogun, Secret Art: Musou Shinsetsu: Energy Cost = 90 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 86,
    "flex": 78,
    "evidence": 82,
    "constellation": 84,
    "access": 72
  },
  "energyRequirements": "Burst 90 năng lượng; ER là stat ưu tiên hàng đầu để tự maintenance và tối ưu Enlightened One.",
  "reactionCompatibility": "Electro-Charged, Overload và Aggravate đều dùng được; Burst damage không bị reaction khuếch đại trực tiếp.",
  "damageContribution": "Main carry trong cửa sổ Musou Isshin; ngoài ra có off-field coordinated damage từ Eye.",
  "teamUtility": "Energy restore toàn đội và Burst DMG bonus từ Eye là utility đáng kể.",
  "constellationEffects": "C0 baseline; C2 DEF ignore và C6 burst CD reduction không được cộng vào score.",
  "gameplayAssumptions": "Resolve tích ở mức cao trước khi cast Burst; Musou Isshin hoàn thành 5 nhịp hồi năng lượng.",
  "versionNote": "Release v2.1; snapshot 7.2 local có 7 team row làm corroboration.",
  "confidence": "HIGH",
  "comparativeEvidenceStatus": "MISSING. Existing evidence verifies mechanics only; no version-scoped comparative dossier exists in the frozen source."
}
```

**reviewStatus**

Reason: Rubric score and mechanical facts alone do not defend Tier S. Status changed to NEEDS_MORE_COMPARATIVE_EVIDENCE with an explicit evidence checklist; the original proposed tier S is preserved but is not review-ready and no explanatory filler was added.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
NEEDS_MORE_COMPARATIVE_EVIDENCE
```

---

### CHAR-TIER-B2-07 — Nahida / SUPPORT / C0

- Change reason: Existing draft already covers Seed of Skandha marking, Tri-Karma Purification, Dendro application, EM share in Shrine of Maya, reaction teammates and mark-maintenance limits. Verified against genshin-db; no content change.
- Review status: VERIFIED_NO_CONTENT_CHANGE
- Tier: SS → SS (unchanged)
- Checksum: `5a4394a5aa57e6ba10904bd2c0d0febd0a8c3cf49bebe05d4a119efb12029bc8` → `e850190905b6801552e71bf1c2966de86645c958249b2637547f94e82657c782`

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Nahida, All Schemes to Know: \"mark up to 8 opponents hit with the Seed of Skandha\" và Tri-Karma Purification kích hoạt khi trigger reactions hoặc Dendro Core damage.",
    "genshin-db/talents Nahida, Illusory Heart: Shrine of Maya nhận effect riêng cho Pyro/Electro/Hydro và vẫn có hiệu lực khi Nahida không on-field miễn party ở trong field.",
    "genshin-db/talents Nahida, Compassion Illuminated: active character nhận 25% EM từ party member cao nhất, tối đa 250 EM.",
    "GenshinHub development DB: 18 CharacterWeapon rows, 6 CharacterArtifact rows, 9 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Nahida, Illusory Heart: Energy Cost = 50 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 96,
    "flex": 92,
    "evidence": 88,
    "constellation": 92,
    "access": 78
  },
  "energyRequirements": "Burst Illusory Heart costs 50 energy (genshin-db talents attributes), khong phai 80; Skill co duration dai nen ER vua phai la du neu rotation on dinh.",
  "reactionCompatibility": "Quicken/Aggravate/Spread, Bloom/Hyperbloom/Burgeon đều được hưởng từ mark và EM share.",
  "damageContribution": "Off-field Dendro damage đáng kể nhưng role SUPPORT vẫn ưu tiên mark và buff.",
  "teamUtility": "EM sharing + reaction enable + Dendro application trong một slot.",
  "constellationEffects": "C0 baseline; C6 Karmic Oblivion không được cộng vào record này.",
  "gameplayAssumptions": "Mark được refresh theo chu kỳ; party trigger reaction liên tục trong Shrine.",
  "versionNote": "Release v3.2; snapshot 7.2 local corroborate với 9 team row.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Nahida, All Schemes to Know: \"mark up to 8 opponents hit with the Seed of Skandha\" và Tri-Karma Purification kích hoạt khi trigger reactions hoặc Dendro Core damage.",
    "genshin-db/talents Nahida, Illusory Heart: Shrine of Maya nhận effect riêng cho Pyro/Electro/Hydro và vẫn có hiệu lực khi Nahida không on-field miễn party ở trong field.",
    "genshin-db/talents Nahida, Compassion Illuminated: active character nhận 25% EM từ party member cao nhất, tối đa 250 EM.",
    "GenshinHub development DB: 18 CharacterWeapon rows, 6 CharacterArtifact rows, 9 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Nahida, Illusory Heart: Energy Cost = 50 (genshin-db talents.attributes.parameters).",
    "genshin-db@5.2.15/talents Nahida All Schemes to Know: marks up to 8 opponents; Tri-Karma Purification triggers on reactions on marked opponents or Dendro Core damage.",
    "genshin-db@5.2.15/talents Nahida Compassion Illuminated: active character inside Shrine gains 25% of highest party EM, max 250 EM."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 96,
    "flex": 92,
    "evidence": 88,
    "constellation": 92,
    "access": 78
  },
  "energyRequirements": "Burst Illusory Heart costs 50 energy (genshin-db talents attributes), khong phai 80; Skill co duration dai nen ER vua phai la du neu rotation on dinh.",
  "reactionCompatibility": "Quicken/Aggravate/Spread, Bloom/Hyperbloom/Burgeon đều được hưởng từ mark và EM share.",
  "damageContribution": "Off-field Dendro damage đáng kể nhưng role SUPPORT vẫn ưu tiên mark và buff.",
  "teamUtility": "EM sharing + reaction enable + Dendro application trong một slot.",
  "constellationEffects": "C0 baseline; C6 Karmic Oblivion không được cộng vào record này.",
  "gameplayAssumptions": "Mark được refresh theo chu kỳ; party trigger reaction liên tục trong Shrine.",
  "versionNote": "Release v3.2; snapshot 7.2 local corroborate với 9 team row.",
  "confidence": "HIGH"
}
```

**reviewStatus**

Reason: Existing draft already covers Seed of Skandha marking, Tri-Karma Purification, Dendro application, EM share in Shrine of Maya, reaction teammates and mark-maintenance limits. Verified against genshin-db; no content change.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
VERIFIED_NO_CONTENT_CHANGE
```

---

### CHAR-TIER-B2-08 — Zhongli / SUPPORT / C0

- Change reason: Old explanation understated Zhongli by focusing on shield survival and saying direct damage support was almost absent. Revised to include Jade Shield 20% Elemental and Physical RES shred, its team damage amplification value, uptime/safety and personal-damage limits. Tier unchanged.
- Review status: REVISION_READY_FOR_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Checksum: `e4076469882f22b097ca886e8537c8a291781b08c70f67d72c10e82fe61155d0` → `18090c05ff53a8c3b13ca97bc9690fa050ce589df883e2e4bbb207f07cdfd19d`

**explanationVi**

Reason: Old explanation understated Zhongli by focusing on shield survival and saying direct damage support was almost absent. Revised to include Jade Shield 20% Elemental and Physical RES shred, its team damage amplification value, uptime/safety and personal-damage limits. Tier unchanged.

- OLD:
```text
Đóng góp: Jade Shield của Zhongli có absorption theo Max HP và làm giảm Elemental RES của đối thủ khi có đồng đội được shield bảo vệ, trong khi Planet Befall petrify và gây Geo damage; ông vì thế là lựa chọn bảo vệ cực ổn định. Đề xuất S vì shield và RES shred hoạt động ở C0 với rất ít twist, nhưng đóng góp damage trực tiếp khiêm tốn nên không đạt SS. Điều kiện: cần giữ shield còn nguyên để RES shred có hiệu lực; hiệu quả giảm khi shield vỡ liên tục hoặc khi party đã có shield khác. Constellation: không phụ thuộc; C0 đã có shield, shred và burst, C1 chỉ thêm stele còn C6 mới chuyển damage thành heal nên tách riêng. Hạn chế: slot support của anh thiếu buff damage trực tiếp và Geo construct có thể tương tác lạ với một số địa hình.
```
- NEW:
```text
Đóng góp: Jade Shield có absorption theo Max HP và 150% hiệu quả chống Elemental/Physical damage. Khishield còn bảo vệ nhân vật, nó làm giảm Elemental RES và Physical RES của đối thủ trong AoE nhỏ tới 20%, không stack; đây là area damage amplification có ý nghĩa với cả đội dù không phải DMG Bonus trực tiếp. Planet Befall thêm Petrification và kiểm soát địch. Đề xuất S vì shield, RES shred và interruption resistance hoạt động ổn định ở C0, trong khi damage cá nhân và buff trực tiếp khác khiêm tốn nên chưa đạt SS. Điều kiện: phải duy trì shield để giữ RES shred; hiệu quả giảm khi shield vỡ liên tục hoặc địch nằm ngoài AoE. Hạn chế: ít direct damage buff, Geo construct có thể cản địa hình và giá trị tùy vào carry có hưởng lợi từ RES shred.
```

**limitations**

Reason: Clarified limitations without changing tier.

- OLD:
```text
[
  "Ít damage buff trực tiếp",
  "RES shred mất khi shield vỡ",
  "Geo construct có thể gây cản trở"
]
```
- NEW:
```text
[
  "RES shred biến mất khi shield vỡ hoặc ngoài AoE",
  "Không phải DMG Bonus trực tiếp và không hỗ trợ mọi loại carry như nhau",
  "Damage cá nhân khiêm tốn",
  "Geo construct có thể gây cản trở"
]
```

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "Shield được duy trì trong phần lớn rotation",
  "Đội ưu tiên survivability hơn damage buff",
  "Không tính C6"
]
```
- NEW:
```text
[
  "Jade Shield duy trì trong phần lớn rotation",
  "Đội có carry hưởng lợi từ Elemental/Physical RES shred",
  "Không tính C6"
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Zhongli, Dominus Lapidis: Jade Shield absorption scales with Max HP, 150% absorption vs Elemental/Physical DMG và \"decrease the Elemental R[ES]\" của character được bảo vệ.",
    "genshin-db/talents Zhongli, Planet Befall: \"dealing massive Geo DMG... applying the Petrification status\".",
    "genshin-db/talents Zhongli, Dominance of Earth: Planet Befall damage tăng 33% Max HP (chỉ làm reference cho damage, không dùng làm tier).",
    "GenshinHub development DB: 13 CharacterWeapon rows, 6 CharacterArtifact rows, 7 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Zhongli, Planet Befall: Energy Cost = 40 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 84,
    "flex": 80,
    "evidence": 82,
    "constellation": 94,
    "access": 84
  },
  "energyRequirements": "Burst Planet Befall costs 40 energy (genshin-db talents attributes), khong phai 80; shield la nguon chinh nen ER quan trong hon damage stat.",
  "reactionCompatibility": "Geo không tạo reaction khuếch đại; shield giúp giữ reaction setup ổn định bằng interruption resistance.",
  "damageContribution": "Rất thấp trong role SUPPORT; giá trị nằm ở shield và petrify.",
  "teamUtility": "Shield + RES shred + crowd control là bộ phòng thủ rất đầy đủ.",
  "constellationEffects": "C0 baseline; C6 damage-to-heal không được cộng vào đây.",
  "gameplayAssumptions": "Shield còn nguyên trong lúc DPS xả chiêu; petrify dùng để lock mục tiêu nguy hiểm.",
  "versionNote": "Release v1.1; snapshot 7.2 local có 7 team row làm corroboration.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Zhongli, Dominus Lapidis: Jade Shield absorption scales with Max HP, 150% absorption vs Elemental/Physical DMG và \"decrease the Elemental R[ES]\" của character được bảo vệ.",
    "genshin-db/talents Zhongli, Planet Befall: \"dealing massive Geo DMG... applying the Petrification status\".",
    "genshin-db/talents Zhongli, Dominance of Earth: Planet Befall damage tăng 33% Max HP (chỉ làm reference cho damage, không dùng làm tier).",
    "GenshinHub development DB: 13 CharacterWeapon rows, 6 CharacterArtifact rows, 7 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Zhongli, Planet Befall: Energy Cost = 40 (genshin-db talents.attributes.parameters).",
    "genshin-db@5.2.15/talents Zhongli Dominus Lapidis: Jade Shield has 150% absorption against Elemental/Physical DMG; protected characters decrease opponents Elemental RES and Physical RES by 20% in a small AoE; effect cannot stack.",
    "KQM Zhongli quick guide (mechanical context only; no editorial text copied): https://keqingmains.com/q/zhongli-quickguide/"
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 84,
    "flex": 80,
    "evidence": 82,
    "constellation": 94,
    "access": 84
  },
  "energyRequirements": "Burst Planet Befall costs 40 energy (genshin-db talents attributes), khong phai 80; shield la nguon chinh nen ER quan trong hon damage stat.",
  "reactionCompatibility": "Geo không tạo reaction khuếch đại; shield giúp giữ reaction setup ổn định bằng interruption resistance.",
  "damageContribution": "Rất thấp trong role SUPPORT; giá trị nằm ở shield và petrify.",
  "teamUtility": "Shield + RES shred + crowd control là bộ phòng thủ rất đầy đủ.",
  "constellationEffects": "C0 baseline; C6 damage-to-heal không được cộng vào đây.",
  "gameplayAssumptions": "Shield còn nguyên trong lúc DPS xả chiêu; petrify dùng để lock mục tiêu nguy hiểm.",
  "versionNote": "Release v1.1; snapshot 7.2 local có 7 team row làm corroboration.",
  "confidence": "HIGH",
  "damageAmplificationClarification": "20% RES shred is team damage amplification through enemy resistance reduction, not a direct DMG Bonus stat."
}
```

**reviewStatus**

Reason: Old explanation understated Zhongli by focusing on shield survival and saying direct damage support was almost absent. Revised to include Jade Shield 20% Elemental and Physical RES shred, its team damage amplification value, uptime/safety and personal-damage limits. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISION_READY_FOR_ADMIN_REVIEW
```

---

### CHAR-TIER-B2-09 — Yelan / SUB_DPS / C0

- Change reason: Made the 70-energy Burst cost and Normal Attack coordination explicit in the explanation, alongside off-field Hydro damage, ramping team damage buff and rotation/ER assumptions. Tier unchanged.
- Review status: REVISION_READY_FOR_ADMIN_REVIEW
- Tier: S → S (unchanged)
- Checksum: `bb5d45f5c28afb2b2fd61ef4bd5c0431c54b9d99b593fb4a0fe38951cc2eb225` → `17fc33a57a09cc045cbaedf06dae6d00c400b3f8a4f184b1f69401ac4fbc9d00`

**explanationVi**

Reason: Made the 70-energy Burst cost and Normal Attack coordination explicit in the explanation, alongside off-field Hydro damage, ramping team damage buff and rotation/ER assumptions. Tier unchanged.

- OLD:
```text
Đóng góp: Exquisite Throw từ Depth-Clarion Dice bắn coordinated Hydro damage theo Max HP mỗi khi active character Normal Attack, và passive Adapt With Ease tăng dần DMG dealt của active character tới 50% trong suốt Burst. Đề xuất S vì cô kết hợp Hydro damage off-field và damage buff toàn đội trong một slot, nhưng buff bị mất nếu recast Burst và damage phụ thuộc nhịp Normal Attack. Điều kiện: cần active character đánh Normal Attack thường xuyên và giữ Exquisite Throw trong duration; nếu recast Burst sớm thì buff reset. Constellation: không phụ thuộc; C0 đã có coordinated attack và buff, C1 chỉ thêm charge skill còn C6 biến cô thành on-field DPS nên tách riêng nếu đánh giá. Hạn chế: defensive utility kém hơn Xingqiu và local DB có 4 weapon row, 3 artifact row, 8 team row nên evidence khá nhưng không dùng để copy tier.
```
- NEW:
```text
Đóng góp: Depth-Clarion Dice có chi phí 70 Energy và tạo Exquisite Throw, gây Hydro coordinated damage theo Max HP khi active character dùng Normal Attack. Adapt With Ease tăng DMG dealt của active character bắt đầu ở 1% và cộng 3.5% mỗi giây, tối đa 50% trong suốt Burst. Đề xuất S vì Yelan kết hợp off-field Hydro damage và ramping damage buff trong một slot. Điều kiện: DPS chính phải dùng Normal Attack thường xuyên, Exquisite Throw phải duy trì và cần ER đủ để giữ Burst; recast sớm làm mất buff đang tích. Hạn chế: phụ thuộc nhịp Normal Attack, defensive utility thấp hơn Xingqiu và Rotation cần tránh recast ngoài chu kỳ.
```

**limitations**

Reason: Clarified limitations without changing tier.

- OLD:
```text
[
  "Buff mất nếu recast Burst",
  "Phụ thuộc Normal Attack của active character",
  "Không có damage reduction như Xingqiu"
]
```
- NEW:
```text
[
  "Phụ thuộc Normal Attack của active character",
  "Recast Burst làm mất ramp buff",
  "Cần ER đúng chu kỳ 70-energy Burst",
  "Không có damage reduction như Xingqiu"
]
```

**teamAssumptions**

Reason: Made gameplay/team assumptions explicit.

- OLD:
```text
[
  "DPS chính dùng Normal Attack",
  "Exquisite Throw duy trì trong suốt rotation",
  "Không tính C6"
]
```
- NEW:
```text
[
  "DPS chính dùng Normal Attack",
  "Không recast Burst trong lúc buff đang tích",
  "ER đủ để duy trì Exquisite Throw",
  "Không tính C6"
]
```

**evidence**

Reason: Added or verified evidence attribution; frozen source was not edited.

- OLD:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Yelan, Depth-Clarion Dice: Exquisite Throw \"will initiate a coordinated attack... dealing Hydro DMG based on Yelan's Max HP\" khi active character Normal Attack.",
    "genshin-db/talents Yelan, Adapt With Ease: active character \"deals 1% more DMG... increases by a further 3.5% DMG every second. The maximum increase to DMG dealt is 50%\".",
    "genshin-db/talents Yelan, Turn Control: HP tăng 6%/12%/18%/30% theo số element type trong party.",
    "GenshinHub development DB: 4 CharacterWeapon rows, 3 CharacterArtifact rows, 8 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Yelan, Depth-Clarion Dice: Energy Cost = 70 (genshin-db talents.attributes.parameters)."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 86,
    "flex": 84,
    "evidence": 80,
    "constellation": 90,
    "access": 76
  },
  "energyRequirements": "Burst Depth-Clarion Dice costs 70 energy (genshin-db talents attributes), khong phai 80; can ER de giu Exquisite Throw lien tuc vi buff tich theo thoi gian.",
  "reactionCompatibility": "Hydro coordinated attack hỗ trợ Vaporize/Frozen/Electro-Charged; DMG bonus từ passive buff mọi nguồn damage.",
  "damageContribution": "Sub-DPS damage khá tốt, cộng thêm damage buff cho active character.",
  "teamUtility": "Damage buff dạng ramp là điểm mạnh chính ngoài Hydro application.",
  "constellationEffects": "C0 baseline; C6 Mastermind on-field arrows không được cộng vào.",
  "gameplayAssumptions": "Không recast Burst trong lúc buff đang tích; active character Normal Attack liên tục.",
  "versionNote": "Release v2.7; snapshot 7.2 local có 8 team row làm corroboration.",
  "confidence": "HIGH"
}
```
- NEW:
```text
{
  "rubric": "GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)",
  "primaryEvidence": [
    "genshin-db/talents Yelan, Depth-Clarion Dice: Exquisite Throw \"will initiate a coordinated attack... dealing Hydro DMG based on Yelan's Max HP\" khi active character Normal Attack.",
    "genshin-db/talents Yelan, Adapt With Ease: active character \"deals 1% more DMG... increases by a further 3.5% DMG every second. The maximum increase to DMG dealt is 50%\".",
    "genshin-db/talents Yelan, Turn Control: HP tăng 6%/12%/18%/30% theo số element type trong party.",
    "GenshinHub development DB: 4 CharacterWeapon rows, 3 CharacterArtifact rows, 8 CharacterTeam rows (7.2 snapshot, corroboration only; không dùng tier cũ làm đáp án).",
    "genshin-db/talents Yelan, Depth-Clarion Dice: Energy Cost = 70 (genshin-db talents.attributes.parameters).",
    "genshin-db@5.2.15/talents Yelan Depth-Clarion Dice: Energy Cost = 70; Exquisite Throw coordinates Hydro DMG based on Max HP when active character uses Normal Attack.",
    "genshin-db@5.2.15/talents Yelan Adapt With Ease: active character DMG dealt rises 1% + 3.5%/s to max 50%; effect is dispelled if Burst is recast."
  ],
  "reviewer": "GenshinHub Tier Editorial (Phase B2 draft; Admin reviewer chưa gán)",
  "verifiedAt": "2026-11-20",
  "rubricScores": {
    "kit": 86,
    "flex": 84,
    "evidence": 80,
    "constellation": 90,
    "access": 76
  },
  "energyRequirements": "Burst Depth-Clarion Dice costs 70 energy (genshin-db talents attributes), khong phai 80; can ER de giu Exquisite Throw lien tuc vi buff tich theo thoi gian.",
  "reactionCompatibility": "Hydro coordinated attack hỗ trợ Vaporize/Frozen/Electro-Charged; DMG bonus từ passive buff mọi nguồn damage.",
  "damageContribution": "Sub-DPS damage khá tốt, cộng thêm damage buff cho active character.",
  "teamUtility": "Damage buff dạng ramp là điểm mạnh chính ngoài Hydro application.",
  "constellationEffects": "C0 baseline; C6 Mastermind on-field arrows không được cộng vào.",
  "gameplayAssumptions": "Không recast Burst trong lúc buff đang tích; active character Normal Attack liên tục.",
  "versionNote": "Release v2.7; snapshot 7.2 local có 8 team row làm corroboration.",
  "confidence": "HIGH"
}
```

**reviewStatus**

Reason: Made the 70-energy Burst cost and Normal Attack coordination explicit in the explanation, alongside off-field Hydro damage, ramping team damage buff and rotation/ER assumptions. Tier unchanged.

- OLD:
```text
READY_FOR_ADMIN_REVIEW
```
- NEW:
```text
REVISION_READY_FOR_ADMIN_REVIEW
```

