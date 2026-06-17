import { exportDatabaseToSeeds } from './src/exportData';
exportDatabaseToSeeds().then(() => console.log('Done')).catch(console.error);
