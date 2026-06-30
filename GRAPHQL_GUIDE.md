# Hướng dẫn sử dụng GraphQL API - GenshinHub

Tài liệu này cung cấp hướng dẫn chi tiết về cách sử dụng GraphQL API trong dự án GenshinHub, bao gồm các queries và mutations tương ứng với từng bảng dữ liệu (model) trong database (Prisma).

## Cấu trúc chung

GraphQL endpoint thường nằm ở: `http://localhost:<PORT>/graphql` (backend).
Bạn có thể sử dụng Apollo Studio, GraphQL Playground hoặc các công cụ như Postman để thực thi các query này.

---

## 1. Bảng Character (Nhân vật)

Bảng này chứa thông tin cơ bản, chỉ số, đội hình, vũ khí và thánh di vật khuyên dùng cho nhân vật.

### Queries

**Lấy danh sách tất cả nhân vật:**
```graphql
query GetCharacters {
  characters {
    id
    nameEn
    nameVi
    element
    rarity
    weapon
    tier
  }
}
```

**Lấy thông tin chi tiết một nhân vật:**
```graphql
query GetCharacter($id: String!) {
  character(id: $id) {
    id
    nameEn
    titleVi
    baseHp
    baseAtk
    bestWeapons {
      nameEn
      rank
    }
    teams {
      name
      rank
      members {
        characterId
        role
      }
    }
  }
}
```

**Lấy danh sách nhân vật theo loại vũ khí:**
```graphql
query GetCharactersByWeapon($weaponType: String!) {
  charactersByWeaponType(weaponType: $weaponType) {
    id
    nameEn
    element
    rarity
  }
}
```

### Mutations

**Thêm mới hoặc cập nhật nhân vật (Upsert):**
```graphql
mutation UpsertCharacter($input: CharacterInput!) {
  upsertCharacter(input: $input) {
    id
    nameEn
  }
}
```

**Xóa nhân vật:**
```graphql
mutation DeleteCharacter($id: String!) {
  deleteCharacter(id: $id)
}
```

**Cập nhật Splash Art:**
```graphql
mutation UpdateSplashArt($id: String!, $splashArtUrl: String!) {
  updateCharacterSplashArt(id: $id, splashArtUrl: $splashArtUrl) {
    id
    splashArtUrl
  }
}
```

**Cập nhật Tier List của nhân vật:**
```graphql
mutation UpdateTier($id: String!, $tier: String!, $role: String!) {
  updateCharacterTierList(id: $id, tier: $tier, role: $role) {
    id
    tier
    role
  }
}
```

---

## 2. Bảng Weapon (Vũ khí chung trong Bách khoa toàn thư)

### Queries

**Lấy danh sách vũ khí:**
```graphql
query GetWeapons {
  weapons {
    id
    nameEn
    type
    rarity
    baseAtk
  }
}
```

**Chi tiết một vũ khí:**
```graphql
query GetWeapon($id: String!) {
  weapon(id: $id) {
    id
    passiveDescVi
    subStat
    subStatValue
  }
}
```

### Mutations

**Upsert và Delete vũ khí:**
```graphql
mutation UpsertWeapon($input: WeaponInput!) {
  upsertWeapon(input: $input) {
    id
    nameEn
  }
}

mutation DeleteWeapon($id: String!) {
  deleteWeapon(id: $id)
}
```

**Cập nhật Tier List của vũ khí:**
```graphql
mutation UpdateWeaponTier($id: String!, $tier: String!) {
  updateWeaponTierList(id: $id, tier: $tier) {
    id
    tier
  }
}
```

---

## 3. Bảng ArtifactSet (Thánh Di Vật)

### Queries

**Lấy danh sách Thánh di vật:**
```graphql
query GetArtifacts {
  artifacts {
    id
    nameEn
    nameVi
    piece2DescVi
    piece4DescVi
  }
}
```

**Chi tiết một bộ Thánh di vật:**
```graphql
query GetArtifact($id: String!) {
  artifactSet(id: $id) {
    id
    rarityList
  }
}
```

### Mutations

**Upsert và Delete Thánh di vật:**
```graphql
mutation UpsertArtifact($input: ArtifactSetInput!) {
  upsertArtifactSet(input: $input) {
    id
    nameEn
  }
}

mutation DeleteArtifact($id: String!) {
  deleteArtifactSet(id: $id)
}
```

---

## 4. Bảng Material (Nguyên liệu)

### Queries

**Lấy danh sách nguyên liệu:**
```graphql
query GetMaterials {
  materials {
    id
    nameEn
    type
    rarity
  }
}
```

### Mutations

**Upsert và Delete Nguyên liệu:**
```graphql
mutation UpsertMaterial($input: MaterialInput!) {
  upsertMaterial(input: $input)
}

mutation DeleteMaterial($id: String!) {
  deleteMaterial(id: $id)
}
```

---

## 5. Các bảng quan hệ của Character (Teams, Build, Talent)

Các thay đổi trên Team, Build vũ khí, Thánh di vật riêng lẻ cho từng nhân vật.

### Mutations cho Team (Đội hình)

**Thêm đội hình cho nhân vật:**
```graphql
mutation AddTeam($characterId: String!, $name: String!, $rank: String!, $description: String!, $members: [TeamMemberInput!]!) {
  addCharacterTeam(characterId: $characterId, name: $name, rank: $rank, description: $description, members: $members)
}
```

**Cập nhật / Xóa đội hình:**
```graphql
mutation UpdateTeam($teamId: String!, $name: String!, $rank: String!, $description: String!, $members: [TeamMemberInput!]!) {
  updateCharacterTeam(teamId: $teamId, name: $name, rank: $rank, description: $description, members: $members)
}

mutation RemoveTeam($teamId: String!) {
  removeCharacterTeam(teamId: $teamId)
}
```

### Mutations cho Builds (Vũ khí / Thánh di vật được khuyên dùng)

**Vũ khí:**
```graphql
mutation AddCharWeapon($characterId: String!, $weaponId: String!, $rank: Int!, $isF2P: Boolean!) {
  addCharacterWeapon(characterId: $characterId, weaponId: $weaponId, rank: $rank, isF2P: $isF2P)
}

mutation RemoveCharWeapon($id: String!) {
  removeCharacterWeapon(id: $id)
}
```

**Thánh di vật:**
```graphql
mutation AddCharArtifact($characterId: String!, $setNameEn: String!, $setNameVi: String!, $pieces: Int!, $sands: [String!]!, $goblet: [String!]!, $circlet: [String!]!, $subStatsPriority: [String!]!) {
  addCharacterArtifact(characterId: $characterId, setNameEn: $setNameEn, setNameVi: $setNameVi, pieces: $pieces, sands: $sands, goblet: $goblet, circlet: $circlet, subStatsPriority: $subStatsPriority)
}
```

**Cập nhật chỉ số khuyên dùng & Thiên phú:**
```graphql
mutation UpdateTalents($id: String!, $talentPriority: [String!]!) {
  updateCharacterTalents(id: $id, talentPriority: $talentPriority) {
    id
    talentPriority
  }
}

mutation UpdateArtifactStats($id: String!, $sands: [String!]!, $goblet: [String!]!, $circlet: [String!]!, $subStatsPriority: [String!]!) {
  updateCharacterArtifactStats(id: $id, sands: $sands, goblet: $goblet, circlet: $circlet, subStatsPriority: $subStatsPriority)
}
```

---

## 6. Tính năng khác

**Enka Showcase (Lấy dữ liệu người chơi qua UID):**
```graphql
query GetShowcase($uid: String!) {
  showcase(uid: $uid) {
    nickname
    level
    characters
  }
}
```

**Tạo Backup JSON mới:**
```graphql
mutation CreateBackup {
  createBackup {
    id
    filename
    createdAt
    sizeBytes
  }
}
```

**Phục hồi Backup:**
```graphql
mutation RestoreBackup($filename: String!) {
  restoreBackup(filename: $filename)
}
```

**Danh sách Backup:**
```graphql
query ListBackups {
  listBackups {
    id
    filename
    createdAt
    sizeBytes
  }
}
```

**Generate AI Character:**
```graphql
mutation GenerateChar($prompt: String!) {
  generateCharacterAI(prompt: $prompt)
}
```
