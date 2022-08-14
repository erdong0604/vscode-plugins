const { window, commands } = require("vscode");
const { selectImage } = require("./utils/");
const { compressionImage } = require("./utils/tinify");
const { uploadImage } = require("./utils/upload");
const { insertText, calcCursorPosition } = require("./utils/utils");
const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let zmOss = commands.registerCommand("zm-oss.helloWorld", async function () {
    context.globalState.update('a','b');
    console.log("globalState", context.globalState.keys(),context.globalState.get('a'),context.globalState.get('c'));
    try {
      console.log(111);
      // 获取选择的文件路径
      const selectFilePath = await selectImage();
      // 获取当前光标位置。(这样就可以不用等待上传，待上传完自动插入。)
      console.log(222);
      const position = calcCursorPosition();
      console.log(333);
      // 获取压缩后的文件数据 buffer, 文件名 name
      const { data: compressionData, name, ext} = await compressionImage(
        selectFilePath
      );
      console.log(444);

      // 通过压缩后的文件数据 上传至oss,得到url
      const imageUrl = await uploadImage(context, compressionData, name, ext);
      // 插入文本
      console.log(555);
      insertText(position, imageUrl);
      console.log(666);
      window.showInformationMessage(`Upload Successed!!!      ${imageUrl}`);
    } catch (e) {
      console.log(11111111111111111111111111111111);
      console.log(e);
      window.showErrorMessage(e);
    }
  });

  context.subscriptions.push(zmOss);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
