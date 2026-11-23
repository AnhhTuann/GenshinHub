const semver = require('semver');

async function checkVersion(installed, fetchRegistry = fetch) {
  const response = await fetchRegistry('https://registry.npmjs.org/genshin-db/latest', {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`npm registry HTTP ${response.status}`);
  const latest = (await response.json()).version;
  if (!semver.valid(installed) || !semver.valid(latest)) {
    throw new Error('Invalid genshin-db version');
  }
  const updateAvailable = semver.gt(latest, installed);
  return {
    installed,
    latest,
    updateAvailable,
    majorChange: updateAvailable && semver.major(latest) !== semver.major(installed),
    releaseNotes: 'https://github.com/theBowja/genshin-db/releases',
  };
}

module.exports = { checkVersion };

if (require.main === module) {
  checkVersion(require('genshin-db/package.json').version)
    .then(result => console.log(JSON.stringify(result, null, 2)))
    .catch(error => {
      console.error(error);
      process.exitCode = 1;
    });
}
