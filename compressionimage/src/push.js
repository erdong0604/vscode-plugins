const vscode = require('vscode');
const { workspace } =  require('vscode');
const simpleGit = require('simple-git');
const { exit } = require('process');
const push = async ()=> {
  let commitMsg = await vscode.window.showInputBox({
    prompt: '请输入你的Commit Message',
    placeHolder: '示例:(fix: a big bug)',
  });
  if(!commitMsg){
    exit(0)
  }
  commitMsg = commitMsg || 'feat: add'
  const homeDir = workspace.workspaceFolders[0].uri.path
  const gitExecutor = simpleGit(homeDir)
  const {current:branch} = await gitExecutor.status();
  await gitExecutor.add('.');
  await gitExecutor.commit(commitMsg.trim());
  await gitExecutor.pull('origin', branch);
  await gitExecutor.push('origin', branch);
  vscode.window.showInformationMessage('Git Push Success.');
};

module.exports = push