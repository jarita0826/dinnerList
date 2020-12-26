const Dinner = require('../dinner') // 載入 dinner model
const db = require('../../config/mongoose')

//依助教指導載入json做為種子資料(當前目錄)
const restList = require('./restaurant.json')

const db = mongoose.connection

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < restList.results.length; i++) {
        Dinner.create(restList.results[i])
    }
    console.log('done')
})