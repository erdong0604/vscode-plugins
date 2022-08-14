const simpleGit = require('simple-git');
const { workspace } =  require('vscode');
const homeDir = workspace.workspaceFolders[0].uri.path
const gitExecutor = simpleGit(homeDir)
const fs = require("fs");

const getBranch = async () => {
  const { current } = await gitExecutor.status();
  return current
}

const getRepositoryUrl = async () => {
  // const {current} = await gitExecutor.status();
  // return current
}

const getRemoteUrl = async () => {
  const url = await gitExecutor.listRemote(['--get-url']);
  return url
}

function promisify(fn) {
    return function () {
        const args = Array.from(arguments);
        return new Promise((resolve, reject) => {
            args.push((err, value) => {
                if (err)
                    return reject(err);
                resolve(value);
            });
            fn.apply(undefined, args);
        });
    };
}
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
  getBranch,
  getRepositoryUrl,
  gitExecutor,
  getRemoteUrl,
  readFile,
  writeFile
}
