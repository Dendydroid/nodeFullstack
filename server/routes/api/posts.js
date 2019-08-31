const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET POSTS
router.get('/', async (req, res) => {
   const posts = await loadPostsCollection();
   res.send(await posts.find({}).toArray());
});
//ADD POSTS

router.post('/addPost', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//DELETE POSTS

router.delete('/deletePost/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb://taras:nuckmuckluck1@localhost:27017/nodeApp', {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    return client.db('nodeApp').collection('posts');
}

module.exports = router;

