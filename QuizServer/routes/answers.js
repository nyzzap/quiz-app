const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateCreateAnswers = require('../validations/create-anwers');

const QuizHead = require('../models/QuizHead');
const QuizAnswer = require('../models/quizAnswer');

router.post('/create-answer', passport.authenticate('jwt', { session: false }), function (req, res) {
    const { errors, isValid } = validateCreateAnswers(req.body);
    console.log(JSON.stringify(req.body));

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newAnswers = new QuizAnswer({
        playerName: req.user.name,
        playerId: req.user.id,
        authorName: req.body.authorName,
        authorId: req.body.authorId,
        quizId : req.body.quizId,
        quizTitle: req.body.quizTitle,
        Answers: req.body.Answers
    });
   
    newAnswers.save().then(r => {
        res.status(200).send('Ok');
    });
});

router.get('/list-player', passport.authenticate('jwt', { session: false }), (req, res) => {
    QuizAnswer.find({
        playerId: req.user.id
    }).then(answers => {
        return res.json({
            answers
        });
    });
});
router.get('/list-quiz', passport.authenticate('jwt', { session: false }), (req, res) => {
    QuizAnswer.find({
        quizId: req.query.quizId
    }).then(answers => {
        return res.json({
            answers
        });
    });
});
router.get('/list-author', passport.authenticate('jwt', { session: false }), (req, res) => {
    QuizAnswer.find({
        authorId: req.query.authorId
    }).then(answers => {
        return res.json({
            answers
        });
    });
});
module.exports = router;