  const express = require('express')
  const router = express.Router()

  const Dinner = require('../../models/dinner')

  router.get('/', (req, res) => {
      // 取出 Dinner model 裡的所有資料
      Dinner.find()
          // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
          .lean()
          // 將資料傳給 index 樣板
          .then(dinners => res.render('index', {
              dinners
          }))
          // 錯誤處理
          .catch(error => console.error(error))
  })


  module.exports = router