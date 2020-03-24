var express = require('express');

var app = express();

app.get('/hello', function(req, res) {
    res.send('Hello World');
});

app.get('/resume', function(req, res) {
    res.send('This is a resume page');
});

app.get('/contact', function(req, res) {
    res.send('You are requesting the contact form');
});

/* app.get('/onetwothree', function(req, res){ */
app.get('/one(two)?three', function(req, res){
    res.send('I do not care if you have two or not');
});

app.get('/one*three', function(req, res){
    res.send('I do not care what are in between as long as it starts with one and end with three');
});

app.get('/one(two)+three', function(req, res){
    res.send('You can have as many two as you want');
});

// someDomain.com/products/women/legging/winter-discount

app.get('/products/:gender/:category/:campaign', function(req, res){
    res.send(req.params);
});

app.listen(8000, function(){
    console.log('Listening on port 8000')
});

// domain.com/api/game/flappybird/upvote
// domain.com/api/game/flappybird/downvote

app.get('/api/game/:gameName/:vote', function(req, res) {
    if (req.params.vote === 'upvote') {
        console.log('User sent upvote req');
        score++;
        res.send('You have just upvoted' + req.params.gameName + 'to' + score);
    } else if (req.params.gameName === 'downvote') {
        console.log('User sent downvote req');
        score = (score === 0) ? score : score--;
        res.send('You have downvoted' + req.params.gameName + 'to' + score);
    } else {
        res.send('Request invalid');
    }
});

// API response in json format
/* {
    finalScore: 10,
    upvote: 17,
    downvote: 7
} */

var app = express();
var resp = {
    score: 0,
    upvote: 0,
    downvote: 0
};

app.get('/api/game/:gameName/:vote', function(req, res) {
    if (req.params.vote === 'upvote') {
        console.log('User sent upvote req');
        resp.upvote++;
        resp.score++;
        res.jsonp(resp);
    } else if (req.params.gameName === 'downvote') {
        console.log('User sent downvote req');
        resp.downvote++;
        console.log((resp.score === 0));

        if (resp.score !== 0) {
            resp.score--;
        }
        
        res.jsonp(resp);
    } else {
        res.status(400).jsonp({ error: 'Bad request. Invalid vote' });
    }
});
