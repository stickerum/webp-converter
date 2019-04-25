const exec = require('child_process').execFile; // get child_process module

/**
 * @param {string} command — name of binary package to be executed
 * @return {function(string, string, string|null): Promise<string>}
 */
const command = function (command) {
  return function (inputImage, outputImage, options = '') {
    return new Promise((resolve, reject) => {
      /**
       * Detect OS
       * @type {string}
       */
      const executor = getExecutorPath(command);
      if (!executor) {
        reject(`Unsupported platform: ${process.platform} ${process.arch}`);
        return;
      }

      /**
       * Compose query array
       * @type {Array}
       */
      let query = [];

      query.push(inputImage);

      if (options) {
        options.split(/\s+/).forEach(option => {
          query.push(option);
        });
      }

      query.push('-o');
      query.push(outputImage);

      /**
       * Run target command
       */
      exec(getExecutorPath(command), query, function (error, stdout, stderr) {
        if (error){
          reject(error);
          return;
        }

        resolve(outputImage);
      });
    });
  }
};

/**
 * Compose path to binary file or return null
 * @param {string} appName
 * @return {string|null}
 */
const getExecutorPath = (appName) => {
  switch (process.platform) {
    /** macOS */
    case 'darwin':
      return `${__dirname}/lib/libwebp_osx/bin/${appName}`;

    /** Linux */
    case 'linux':
      return `${__dirname}/lib/libwebp_linux/bin/${appName}`;

    /** Windows */
    case 'win32':
      if (process.arch === 'x64') {
        return `${__dirname}/lib/libwebp_win64/bin/${appName}.exe`;
      }
      return `${__dirname}/lib/libwebp_win32/bin/${appName}.exe`;

    /** Any other systems */
    default:
      return;
  }
};

module.exports = {
  cwebp: command('cwebp'),
  dwebp: command('dwebp'),
  // gif2webp: command('gif2webp'),
  // img2webp: command('img2webp'),
};
