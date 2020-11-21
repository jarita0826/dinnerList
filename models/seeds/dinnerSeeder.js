const mongoose = require('mongoose')
const Dinner = require('../dinner') // 載入 dinner model
mongoose.connect('mongodb://localhost/dinnerList', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//依助教指導載入json做為種子資料(當前目錄)
const restList = require('./restaurant.json')
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < restList.results.length; i++) {
        Dinner.create(restList.results[i])
    }
    console.log('done')
})