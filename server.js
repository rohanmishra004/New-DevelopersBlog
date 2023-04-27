const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 4000
const articleRouter = require('./routers/articles');

//connecting to db
mongoose.connect('mongodb://localhost/DeveloperBlog')

//setting view engine
app.set('view engine', 'ejs')


//url encoded data
app.use(express.urlencoded({extended:false}))

//Server test
app.get('/test', (req, res) => {
    res.send('Server test success')
})


//Routes
app.use('/articles', articleRouter)

//Blog Home Page
app.get('/', (req, res) => {
    const articles = [{
        title: "New Title 1",
        createdAt: new Date(),
        description:"New Description 1"
    },{
        title: "New Title 2",
        createdAt: new Date(),
        description:"New Description 2"
    }]
    res.render('article',{articles:articles})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})