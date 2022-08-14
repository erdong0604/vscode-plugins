// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const compression = require('./tinypng')
const codePush = require('./push');
const urlOpen = require('./url-open');
const chooseImages = require('./choose');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "compressionimage" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let compressionDisposable = vscode.commands.registerCommand('compressionimage.compress', function (uri) {
    compression(uri.path || '');
	});
  let chooseDisposable = vscode.commands.registerCommand('compressionimage.choose', function (uri) {
    console.log('object :>> ', uri.path);
    chooseImages(uri.path || '')
	});
  let openWindowDisposable = vscode.commands.registerCommand('open.window', function (uri) {
    chooseImages(uri.path || '')
	});
  let pushDisposable = vscode.commands.registerCommand('doing.push', function (uri) {
    codePush()
	});
  let openRepositoryDisposable = vscode.commands.registerCommand('open.repository', function () {
    urlOpen('repository')
	});
  let openBranchDisposable = vscode.commands.registerCommand('open.branch', function () {
    urlOpen('branch')
	});
  let openBuildDisposable = vscode.commands.registerCommand('open.build', function () {
    urlOpen('build')
	});
  let openNuwaDevDisposable = vscode.commands.registerCommand('open.nuwa_dev', function () {
    urlOpen('nuwa-dev')
	});
  
	context.subscriptions.push(compressionDisposable);
	context.subscriptions.push(chooseDisposable);
	context.subscriptions.push(pushDisposable);
	context.subscriptions.push(openRepositoryDisposable);
	context.subscriptions.push(openWindowDisposable);
	context.subscriptions.push(openBranchDisposable);
	context.subscriptions.push(openBuildDisposable);
	context.subscriptions.push(openNuwaDevDisposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
