const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Article = require('./model/article')
require('dotenv').config()
const methodOverride = require('method-override');
const port = process.env.PORT || 4000
const articleRouter = require('./routers/articles');

//connecting to db
mongoose.connect('mongodb://localhost/DeveloperBlog')

//setting view engine
app.set('view engine', 'ejs')


//url encoded data
app.use(express.urlencoded({extended:false}))

//method-overriding
app.use(methodOverride('_method'))


//Server test
app.get('/test', (req, res) => {
    res.send('Server test success')
})

//Blog Home Page
app.get('/', async (req, res) => {
    const articles =  await Article.find().sort({createdAt:'desc'})
    res.render('article',{articles:articles})
})

//Routes
app.use('/articles', articleRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})