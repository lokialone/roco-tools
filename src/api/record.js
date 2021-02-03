import db from '../db'
const Table = 'records'

export async function saveRecord({date, detail, result, stringInfo}) {
    try {
        const data = await db.get(Table).find({date}).value()
        console.log(' xxx----->', data)
        if (data) {
            return db.get(Table).find({date}).assign({
                detail, result, stringInfo
            }).write()
        } else {
            return db.get(Table).push({date, detail, result, stringInfo}).write()
        }
        
        
    } catch (error) {
        
    }
}
export async function getRecord(date) {
    try {
        const res =  await db.get(Table).find({date}).value()
        return res
    } catch(e) {
        console.warn('---?e', e)
    }
}