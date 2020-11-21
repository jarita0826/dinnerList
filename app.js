	const express = require('express')
	const app = express()
	const port = 3000

	const mongoose = require('mongoose') // 載入 mongoose

	// 設定連線到 mongoDB
	mongoose.connect('mongodb://localhost/todo-list', {
	    useNewUrlParser: true,
	    useUnifiedTopology: true
	})

	// 取得資料庫連線狀態
	const db = mongoose.connection

	// 連線異常
	db.on('error', () => {
	    console.log('mongodb error!')
	})

	// 連線成功
	db.once('open', () => {
	    console.log('mongodb connected!')
	})

	app.get('/', (req, res) => {
	    res.send(`This is my first Express Web App`)
	})

	app.listen(port, () => {
	    console.log(`Express is running on http://localhost:${port}`)
	})