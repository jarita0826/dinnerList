  const express = require('express')
  const router = express.Router()

  // 引入 home 模組程式碼
  const home = require('./modules/home')

  // 引入 todos 模組程式碼
  const dinners = require('./modules/dinners')

  // 將網址結構符合 / 字串的 request 導向 home 模組 
  router.use('/', home)
  router.use('/dinners', dinners)

  module.exports = router