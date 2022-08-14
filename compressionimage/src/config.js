
const vscode = require('vscode');
const suffix = 'png|jpg|jpeg|PNG|JPG|JPEG';
const defaultKey = "3Ts6gQrZkMZGNslpKkS18hP61cQB1RKF";
let vscodeConfig = vscode.workspace.getConfiguration();
const tinify = require("tinify");
tinify.key = vscodeConfig.get('compression-image-config') || defaultKey


module.exports = {
  tinify,
  suffix
}