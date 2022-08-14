const vscode = require('vscode');
const fs = require('fs');
const minimatch = require("minimatch");
const glob = require('glob');
const { tinify, suffix } = require('./config')
const compression = async (filePath)=> {
  // let vscodeConfig = vscode.workspace.getConfiguration();
  // console.log('vscodeConfig :>> ', vscodeConfig);
  // if(!vscodeConfig.get('compression-image-config')){
  //   const key = await vscode.window.showInputBox({
  //     prompt: "请输入你的Tinypng Api Key.",
  //     placeHolder: "提示",
  //   });
  //   vscodeConfig.update('compression-image-config',key,vscode.ConfigurationTarget.Global)
  // }
  // console.log(vscodeConfig.get('compression-image-config'));
  
  let images = [];
  let compressionCount = 0
  if(fs.existsSync(filePath)){
    if (fs.lstatSync(filePath).isDirectory()) {
      images = images.concat(glob.sync(`${filePath}/**/*.+(${suffix})`));
    } else if (minimatch(filePath, `*.+(${suffix})`, {
        matchBase: true
      })) {
      images.push(filePath);
    }
  }
  if(images.length === 0){
    vscode.window.showInformationMessage('No PNG or JPEG images found.');
    return;
  }
  let len=0;
  let errors = [];
  images.forEach(async img => {
    try{
      const source = tinify.fromFile(img);
      source.toFile(img,(err) => {
        len ++;
        if(err){
          errors.push({
            file:img,
            err
          });
        }else{
          compressionCount = tinify.compressionCount
        }
        if(len === images.length){
          // 弹出压缩成功消息
          // 弹出error列表
          if(errors.length > 0){
            return vscode.window.showInformationMessage(`${errors[0].err}.`);
          }
          vscode.window.showInformationMessage(`Compression success And Used ${compressionCount} times.`);
        }
        
      });
    }catch(e){
      console.log('e :>> ', e);
    }
  });
};

module.exports = compression