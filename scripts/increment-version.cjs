const fs = require('fs');
const path = require('path');

function incrementVersion(version, type) {
  let parts = version.split('.');

  switch (type) {
    case 'major':
      parts[0] = String(parseInt(parts[0]) + 1);
      parts[1] = '0';
      parts[2] = '0';
      break;
    case 'minor':
      parts[1] = String(parseInt(parts[1]) + 1);
      parts[2] = '0';
      break;
    case 'patch':
      parts[2] = String(parseInt(parts[2]) + 1);
      break;
    case 'dev':
      parts[2] = `${String(parseInt(parts[2]) + 1)}-dev`;
      break;
    default:
      throw new Error('Invalid version type. Use "major", "minor", "patch", or "dev".',);
  }
  return parts.join('.');
}

function updatePackageJson(type) {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const pkg = require(packageJsonPath);
  const currentVersion = pkg.version;
  const newVersion = incrementVersion(currentVersion, type);
  pkg.version = newVersion;
  pkg.main = `dist/${pkg.name}-${pkg.version}.min.js`;
  pkg.types = `dist/${pkg.name}-${pkg.version}.d.ts`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2),);
  console.log(`Version updated to ${newVersion}`);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node increment-version.js <major|minor|patch|dev>');
  process.exit(1);
}

const type = args[0];
updatePackageJson(type);
