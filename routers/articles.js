const express = require('express');
const Article = require('../model/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new',{article:new Article()})
});

router.get('/edit/:id',async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('edit',{article:article})
})



router.post('/', async (req, res,next) => {
    req.article = new Article()
    next()
},saveArticleAndRedirect('new'))

router.get('/:slug', async(req, res) => {
    const article = await Article.findOne({slug:req.params.slug})
    if (article == null) {
        res.redirect('/')
    }
    res.render('show',{article:article})
})

//deleting blogs
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

//Updating fields
router.put('/:id', async (req, res,next) => {
    req.article = await Article.findById(req.params.id)
    next()
},saveArticleAndRedirect('new'))



function saveArticleAndRedirect(path) {
    return async(req, res) => {
        let article = req.article
        article.title=req.body.title
        article.description=req.body.description
        article.markdown=req.body.markdown
    
        try {
            article =await article.save()
            res.redirect(`/articles/${article.id}`)
        } catch (e) {
            res.render(`${path}`, {article:article})
        }
    }
}


module.exports = router;