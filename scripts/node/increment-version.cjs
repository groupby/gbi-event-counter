const incrementVersion = (version, type) => {
  let parts = version.split('.');

  const getNextPatchVersionNumber = () => String(parseInt(parts[2]) + 1);

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
      parts[2] = getNextPatchVersionNumber();
      break;
    case 'dev':
      parts[2] = `${getNextPatchVersionNumber()}-dev`;
      break;
    default:
      throw new Error(`Invalid version type: "${type}". Use "major", "minor", "patch", or "dev".`);
  }
  return parts.join('.');
};

module.exports = {
  incrementVersion,
  incrementMajor: (version) => incrementVersion(version, 'major'),
  incrementMinor: (version) => incrementVersion(version, 'minor'),
  incrementPatch: (version) => incrementVersion(version, 'patch'),
  incrementDev: (version) => incrementVersion(version, 'dev'),
};