/**
 * tinifyPng 压缩
 * api 地址 https://tinypng.com/developers/reference/nodejs
 *
 */
const fs = require("fs");
const tinify = require("tinify");
const { getFileName } = require("./utils");
tinify.key = "98L2HJc0ZgZn5LP7ngcH9bZ5kZPZNpgX"; // 开发者秘钥
const vscode = require("vscode");

const allowedFiles = [".png", ".jpg", ".jpeg", ".wpg"];
/**
 * @param { path } filePath 选择的文件路径
 */
const compressionImage = (filePath) => {
  return new Promise((resolve, reject) => {
    // 获取文件名和文件后缀
    const { name, ext } = getFileName(filePath);
    // 检验选择的文件
    if (!allowedFiles.includes(ext)) {
      throw "选择文件格式不支持";
    }
    fs.readFile(filePath, function (err, sourceData) {
      if (err) {
        throw "读取文件数据失败";
      }
      tinify.fromBuffer(sourceData).toBuffer(function (err, resultData) {
        if (err) {
          console.log("tinify err", err);
          return reject("tinify 压缩文件失败");
        }
        resolve({
          data: resultData,
          name,
          ext
        });
      });
    });
  });
};

module.exports = {
  compressionImage,
};
