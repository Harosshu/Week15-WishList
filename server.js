const express = require('express');
const Wish = require('./model/wish');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    Wish.fetchAllWishes(wishesFromFile => {
        console.log('Wishes from file:', wishesFromFile); 
        res.render('index', { myWishes: wishesFromFile });
    });
});


app.post('/wish', (req, res) => {
    const userData = req.body.userWish;

    const newWish = new Wish(userData);
    newWish.saveWish();
    res.redirect('/');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
