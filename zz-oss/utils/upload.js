const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const vscode = require("vscode");
const ossApi = {
  upload: "https://oss.zmaxis.com/oss/api/upload/image",
  login: "https://oss.zmaxis.com/oss/api/user-login",
  user: "https://oss.zmaxis.com/oss/api/user",
};

let zmOssAccountConfig = vscode.workspace.getConfiguration("zmOss-account.config")

const uploadImage = (context, sourceData, name, ext) => {
  return new Promise(async (resolve, reject) => {
    let Cookie = context.globalState.get("cookie");
    if (!Cookie) {
      Cookie = await ossLogin();
      console.log("Cookie", Cookie);
      context.globalState.update("cookie", Cookie);
    }
    const formData = new FormData();
    //将Buffer写入文件
    fs.writeFileSync(path.join(__dirname, name + ext), sourceData);
    // 根据文件路径创建可读流
    const file = fs.createReadStream(path.join(__dirname, name + ext));
    // 删除文件
    fs.unlinkSync(path.join(__dirname, name + ext));
    formData.append("size", sourceData.length);
    formData.append("file", file);
    axios({
      url: `${ossApi.upload}/${zmOssAccountConfig.folderId}`,
      method: "POST",
      data: formData,
      headers: {
        Cookie,
        ...formData.getHeaders(),
      },
    })
      .then((res) => {
        console.log(res, res);
        resolve(res.data.data.url);
      })
      .catch((err) => {
        // 进这里来一般是未登录。 把登录cookie清除，重试时就会重新获取cookie
        context.globalState.update("cookie", undefined);
        reject("请重试!!!");
      });
  });
};

const ossLogin = () => {
  const data = {
    password: zmOssAccountConfig.password,
    username: zmOssAccountConfig.username
  };
  return new Promise((resolve, reject) => {
    axios({
      url: ossApi.login,
      method: "POST",
      data,
    })
      .then(async (res) => {
        const code = res.data.code;
        if (code !== 200) {
          throw res.data.message;
        }
        let cookie = res.headers["set-cookie"];
        cookie = cookie.map((v) => v.split(";")[0]);
        let _cookiesStr = cookie.join(";");
        const userCookie = await getUserData(_cookiesStr);
        resolve(userCookie);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getUserData = (cks) => {
  let _cookiesStr = "";
  return new Promise((resolve, reject) => {
    axios({
      url: ossApi.user,
      method: "POST",
      headers: {
        Cookie: cks,
      },
    })
      .then((res) => {
        const code = res.data.code;
        if (code !== 200) {
          throw res.data.message;
        }
        let cookie = res.headers["set-cookie"];
        cookie = cookie.map((v) => v.split(";")[0]);
        _cookiesStr = cookie.join(";");
        resolve(_cookiesStr);
      })
      .catch((err) => {
        let errStr = err.toString();
        reject(errStr);
      });
  });
};
// ossLogin();
module.exports = {
  uploadImage,
};
