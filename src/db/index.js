import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { app, remote } from 'electron'
import fs from 'fs-extra'
import path from 'path'

// console.log('process.type------>', process.type,remote, app)
// 根据process.type来分辨在哪种模式使用哪种模块
const APP = process.type === 'renderer' ? remote.app : app


// 获取electron应用的用户目录
// APP.getPath('userData')
// let STORE_PATH = APP.getPath('userData')
// if (process.type !== 'renderer') {
//     // 如果不存在路径
//     if (!fs.pathExistsSync(STORE_PATH)) {
//         // 就创建
//         fs.mkdirpSync(STORE_PATH)
//     }
// }

const STORE_PATH = path.join(process.cwd(),'database')
    console.log(STORE_PATH)
    if (!fs.pathExistsSync(STORE_PATH)) {
        // 就创建
        fs.mkdirpSync(STORE_PATH)
    }



// 以同步的方式初始化lowdb读写的json文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, `record_lowdb.json`))

// lowdb接管该文件
const db = Datastore(adapter)
// 通过._mixin()引入lodash_id唯一id插件
// db._.mixin(LodashId)

// 初始化数据
if(!db.has('records').value()) {
    db.set('records',[]).write()
}

export default db;