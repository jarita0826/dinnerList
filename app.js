	const express = require('express')
	const exphbs = require('express-handlebars')
	const bodyParser = require('body-parser')
	const methodOverride = require('method-override') // 載入 method-override

	const routes = require('./routes')
	require('./config/mongoose')


	const app = express()

	app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
	app.set('view engine', 'hbs')
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(express.static('public'))


	// 設定每一筆請求都會透過 methodOverride 進行前置處理
	app.use(methodOverride('_method'))
	app.use(routes)

	app.listen(3000, () => {
	    console.log('Express is running on http://localhost3000')
	})