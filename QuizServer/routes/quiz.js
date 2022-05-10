const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateCreateQuiz = require('../validations/create-quiz');

const QuizHead = require('../models/QuizHead');
const QuizQuestion = require('../models/quizQuestion');

router.post('/create-quiz', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(JSON.stringify(req.body));

    const { errors, isValid } = validateCreateQuiz(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    QuizHead.findOne({
        title: req.body.title
    }).then(quiz => {
        if(quiz) {
            return res.status(400).json({
                tittle: 'Quiz Title already exists'
            });
        }
        else {
            const newQuizHead = new QuizHead({
                title: req.body.title,
                description: req.body.description,
                userId : req.user.id,
                userName: req.user.name
            });
            newQuizHead.save().then(quizHead => {
                
                var arrQuestions = req.body.questions.map(function(x) { 
                    console.log(JSON.stringify(x));
                    return new QuizQuestion({
                        type: x.type,
                        text: x.text,
                        options: x.options,
                        qizHeadId:  quizHead._id
                    });
                  });
                  console.log(JSON.stringify(arrQuestions));
                  (async function(){
                    const insertMany = await QuizQuestion.insertMany(arrQuestions);   
                    res.status(200).send('Ok');
                })();
            });
           
        }
    });
});

router.get('/global-list', passport.authenticate('jwt', { session: false }), (req, res) => {
    QuizHead.find().then(quiz => {
        
        return res.json({
            quiz
        });
    });
});
router.get('/questions', passport.authenticate('jwt', { session: false }), (req, res) => {
    QuizQuestion.find({
        qizHeadId: req.query.id
    }).then(questions => {
        return res.json({
            questions
        });
    });
});

module.exports = router;