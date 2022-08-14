const { window, Uri } = require("vscode");
const fs = require("fs");

/**
 * @desc 选择图片
 */
const selectImage = () => {
  return new Promise((resolve, reject) => {
    window
      .showOpenDialog({
        canSelectFiles: true, // 是否选择文件
        canSelectFolders: false, // 是否可以选择文件夹
        canSelectMany: false, // 是否可以选择多个
        defaultUri: Uri.file("c"), // 默认选择的位置 默认c盘，就会默认到桌面(windows)
        openLabel: "选择", // 选择按钮的文案
        title: "选择需要上传的文件", // 选择弹窗标题
      })
      .then((res) => {
        console.log(res);
        if (res) {
          const filePath = res[0].path.slice(1); // 选择的图片路径前会带一个"/",要删除掉
          resolve(filePath);
        } else {
          reject("取消选择文件");
        }
      });
  });
};

module.exports = {
    selectImage
}
