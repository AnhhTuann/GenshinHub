export const backupTypeDefs = `#graphql
  type BackupStats { 
    characters: Int!
    weapons: Int!
    artifacts: Int!
    materials: Int! 
  }
  
  type BackupInfo { 
    id: String!
    filename: String!
    createdAt: String!
    sizeBytes: Int!
    stats: BackupStats! 
  }
  
  type BackupData { 
    info: BackupInfo!
    data: JSON! 
  }
  
  type Query {
    listBackups: [BackupInfo!]!
    getBackup(id: String!): BackupData
  }

  type Mutation {
    exportDatabaseToSeeds: Boolean
    createBackup: BackupInfo!
    deleteBackup(id: String!): Boolean
    restoreFromBackup(id: String!): Boolean
    cleanupBackups(keepCount: Int): Int
  }
`;
