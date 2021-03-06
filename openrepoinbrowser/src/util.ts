const { workspace } =  require('vscode');
const { exec } = require('child_process');
const opn = require('opn');
// 打开浏览器(这里只打开默认浏览器)
const openBrowser = (url : String) => {
    return opn(url.trim());
};

// 执行命令获取git仓库地址
const runShell = ():Promise<String> => {
    return new Promise((resolve, reject) => {
        exec(`cd ${workspace.rootPath}&&git remote get-url origin`,(err:any,stdout:any, stderr:any) => {
            if(err){
                // reject('获取git仓库地址时发生错误');
                resolve('https://git.bilibili.co/');
                throw err;
            }else{
                resolve(stdout);
            }
        });
    });
};
const getRepositoryUrl = async () => {
    const url = await runShell();
    return url;
};
export default {
    openBrowser,
    getRepositoryUrl
};