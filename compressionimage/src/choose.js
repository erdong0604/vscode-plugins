const { window, Uri } = require("vscode");
const fs = require('fs');
const glob = require('glob');
const os = require('os'); 
var path = require('path');
const { tinify, suffix } = require('./config')
const { readFile, writeFile } = require('./utils')
const _suffix = suffix.split('|').map(v => `.${v}`)
const selectImage = (dirPath,isCompress) => {
    window
      .showOpenDialog({
        canSelectFiles: true, // 是否选择文件
        canSelectFolders: false, // 是否可以选择文件夹
        canSelectMany: true, // 是否可以选择多个
        defaultUri: Uri.file("~"),
        openLabel: "选择", // 选择按钮的文案
        title: "选择文件", // 选择弹窗标题
      })
      .then((files) => {
        if (files) {
          let images = [];
          if (fs.lstatSync(dirPath).isDirectory()) {
            images = images.concat(glob.sync(`${dirPath}/**/*.+(${suffix})`));
          }
          const hasBasenames = images.map(v => path.basename(v))
         const _files = files.filter(v => {
            const _path = v.path;
            const ext = path.extname(_path)
            return _suffix.includes(ext)
         })
        
          _files.forEach(async ({path:__path}) => {
            const basename = path.basename(__path)
            const genPath = path.join(dirPath,basename)
            if(!hasBasenames.includes(basename)){
              if(isCompress){
                const source = tinify.fromFile(__path);
                source.toFile(genPath,(err) => {
                  console.log('err :>> ', err);
                });
              }else{
                const resources = await readFile(__path)
                await writeFile(genPath,resources)
              }
            }
            
            
          })
        }
      });
};

module.exports = selectImage