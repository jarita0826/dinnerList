	const express = require('express')
	const app = express()
	const port = 3000

	const mongoose = require('mongoose') // 載入 mongoose
	const exphbs = require('express-handlebars')
	const bodyParser = require('body-parser')
	const Dinner = require('./models/dinner') // 載入 dinner model

	// 設定連線到 mongoDB
	mongoose.connect('mongodb://localhost/dinnerList', {
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

	app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
	app.set('view engine', 'hbs')
	app.use(bodyParser.urlencoded({ extended: true }))

	app.get('/', (req, res) => {
	    // 取出 Dinner model 裡的所有資料
	    Dinner.find()
	        // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
	        .lean()
	        // 將資料傳給 index 樣板
	        .then(dinners => res.render('index', { dinners }))
	        // 錯誤處理
	        .catch(error => console.error(error))
	})

	//進入新增資料頁面
	app.get('/dinners/new', (req, res) => {
	    return res.render('new')
	})

	//遞交新增資料
	app.post('/dinners', (req, res) => {
	    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

	    // 存入資料庫
	    return Dinner.create({
	            name,
	            name_en,
	            category,
	            image,
	            location,
	            phone,
	            google_map,
	            rating,
	            description
	        })
	        // 新增完成後導回首頁
	        .then(() => res.redirect('/'))
	        .catch(error => console.log(error))
	})

	//瀏覽餐廳詳細資料
	app.get('/dinners/:id', (req, res) => {
	    const id = req.params.id
	    return Dinner.findById(id)
	        .lean()
	        .then((dinner) => res.render('show', { dinner }))
	        .catch(error => console.log(error))
	})

	//進入修改餐廳資料頁面
	app.get('/dinners/:id/edit', (req, res) => {
	    const id = req.params.id
	    return Dinner.findById(id)
	        .lean()
	        .then((dinner) => res.render('edit', { dinner }))
	        .catch(error => console.log(error))
	})

	//將重新編輯餐廳資料上傳並更新
	app.post('/dinners/:id/edit', (req, res) => {
	    const id = req.params.id
	    const {
	        name,
	        name_en,
	        category,
	        image,
	        location,
	        phone,
	        google_map,
	        rating,
	        description
	    } = req.body
	    return Dinner.findById(id)
	        .then(dinner => {
	            dinner.name = name
	            dinner.name_en = name_en
	            dinner.category = category
	            dinner.image = image
	            dinner.location = location
	            dinner.phone = phone
	            dinner.google_map = google_map
	            dinner.rating = rating
	            dinner.description = description
	            return dinner.save()
	        })
	        .then(() => res.redirect(`/dinners/${id}`))
	        .catch(error => console.log(error))
	})

	app.listen(port, () => {
	    console.log(`Express is running on http://localhost:${port}`)
	})