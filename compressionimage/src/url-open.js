const { getBranch, getRemoteUrl } = require('./utils')
const open = require('open');
let buildUrl = 'http://ops-rider.bilibili.co/App/Mybuild?page=1&per_page=10&searchIndex=cmdb_app_name&searchValue='
const nuwaDev = 'https://ff-dev.bilibili.com/?_port_=8080&_apiEnv_=test04&mode=half&room_id=456&uid=123#/'
const urlOpen = async (type)=> {
  let url = await getRemoteUrl() || ''
  url = url.replace('.git','').trim()
  console.log('url :>> ', url);
  switch(type){
    case 'repository':
      await await open(url.trim());
      break;
    case 'branch':
      const branch = await getBranch()
      await await open(`${url}/-/tree/${branch}`);
      break;
    case 'build':
      let _url = ''
      if(url.indexOf('fuxi') !== -1){
        _url = `${buildUrl}fuxi`
      }else{
        _url = `${buildUrl}nuwa`
      }
      await await open(_url);
      break;
    case 'nuwa-dev':
      await await open(nuwaDev);
      break;
  }
};

module.exports = urlOpen