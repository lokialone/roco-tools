import Datastore from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync'
import { app, remote } from 'electron'

// 根据process.type来分辨在哪种模式使用哪种模块
const APP = process.type === 'renderer' ? remote.app : app

// 获取electron应用的用户目录
const STORE_PATH = APP.getPath('userData')
// console.log(STORE_PATH)

if (process.type !== 'renderer') {
    // 如果不存在路径
    if (!fs.pathExistsSync(STORE_PATH)) {
        // 就创建
        fs.mkdirpSync(STORE_PATH)
    }
}


// 以同步的方式初始化lowdb读写的json文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, `/${pkg.name}_lowdb.json`))

// lowdb接管该文件
const db = Datastore(adapter)
// 通过._mixin()引入lodash_id唯一id插件
db._.mixin(LodashId)

// 初始化数据
if(!db.has('records').value()) {
    db.set('records',[]).write()
}

async function saveRecord(date, detail, result) {
    return db.get('records').push({
      date, detail, result
    }).write();
}
async function getRecord(date) {
    return db.get('records').find({date}).value()
}

export default {
    saveRecord,
    getRecord,
}