const express = require('express');
const Article = require('../model/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new',{article:new Article()})
});

router.get('/:id', (req, res) => {
    
})

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown:req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
        
    } catch (err) {
        res.render('new',{article:article})
    }
})


module.exports = router;