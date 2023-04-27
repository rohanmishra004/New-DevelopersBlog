const express = require('express');
const Article = require('../model/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new',{article:new Article()})
});

router.get('/:slug', async(req, res) => {
    const article = await Article.findOne({slug:req.params.slug})
    if (article == null) {
        res.redirect('/')
    }
    res.render('show',{article:article})
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown:req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
        
    } catch (err) {
        res.render('new',{article:article})
    }
})

//deleting blogs
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router;