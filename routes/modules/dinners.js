  const express = require('express')
  const router = express.Router()
  const Dinner = require('../../models/dinner')

  //進入新增資料頁面
  router.get('/new', (req, res) => {
      return res.render('new')
  })

  //遞交新增資料
  router.post('', (req, res) => {
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
  router.get('/:id', (req, res) => {
      const id = req.params.id
      return Dinner.findById(id)
          .lean()
          .then((dinner) => res.render('show', {
              dinner
          }))
          .catch(error => console.log(error))
  })

  //進入修改餐廳資料頁面
  router.get('/:id/edit', (req, res) => {
      const id = req.params.id
      return Dinner.findById(id)
          .lean()
          .then((dinner) => res.render('edit', {
              dinner
          }))
          .catch(error => console.log(error))
  })

  //將重新編輯餐廳資料上傳並更新
  router.put('/:id', (req, res) => {
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

  //刪除功能
  router.delete('/:id', (req, res) => {
      const id = req.params.id
      return Dinner.findById(id)
          .then(dinner => dinner.remove())
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
  })

  module.exports = router