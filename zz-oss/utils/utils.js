const vscode = require("vscode");
const { activeTextEditor } = vscode.window;
const path = require("path");
/**
 * @desc 插入文本至光标所在位置
 * @param {string} text 要插入的文本
 *
 */
const insertText = (position, text) => {
  activeTextEditor.edit((editBuilder) => {
    // 插入文本
    editBuilder.insert(position, text);
  });
};
/**
 * @desc 计算当前光标所在位置
 * @return Position
 */
const calcCursorPosition = () => {
  // 计算光标所在位置
  const position = new vscode.Position(
    activeTextEditor.selection.active.line,
    activeTextEditor.selection.active.character
  );
  return position;
};

/**
 * @desc 获取文件名
 */
const getFileName = (filePath) => {
  let _index = filePath.lastIndexOf(".");
  const ext = filePath.slice(_index);
  const name = path.basename(filePath, ext);
  return {
    name,
    ext,
  };
};
module.exports = {
  insertText,
  getFileName,
  calcCursorPosition
};
