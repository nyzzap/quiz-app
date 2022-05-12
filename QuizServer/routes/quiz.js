const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateCreateQuiz = require('../validations/create-quiz');
const validateDeleteQuiz = require('../validations/delete-quiz');

const QuizHead = require('../models/QuizHead');
const QuizQuestion = require('../models/quizQuestion');

router.post('/create-quiz', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(JSON.stringify(req.body));

    const { errors, isValid } = validateCreateQuiz(req.body);

    if(!isValid) {
        console.log(JSON.stringify(errors));

        return res.status(400).json(errors);
    }
    const newQuizHead = new QuizHead({
        title: req.body.title,
        description: req.body.description,
        userId : req.user.id,
        userName: req.user.name
    });
    // Delete control Unique Title
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
});
router.post('/update-quiz', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(JSON.stringify(req.body));

    const { errors, isValid } = validateCreateQuiz(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const quizDoc = QuizHead.findOne({
        _id: req.body._id,
        authorId: req.user.id //Only owner 
    }).then( (quizDoc) => {
        if(quizDoc){
            //UPDATE DATA HEAD
            quizDoc.title = req.body.title,
            quizDoc.description = req.body.description,
            quizDoc.save().then(()=>{
            // Delete Questions & re-create
            (async function(){
                const deleteManyQuestions = await QuizQuestion.deleteMany({
                    qizHeadId: req.body._id
                });   
                var arrQuestions = req.body.questions.map(function(x) { 
                    return new QuizQuestion({
                        type: x.type,
                        text: x.text,
                        options: x.options,
                        qizHeadId: req.body._id
                    });
                  });
                  const insertMany = await QuizQuestion.insertMany(arrQuestions);   
    
                res.status(200).send('Ok');
            })();
            // Delete Answer's ????????
            // IF NEED it, delete here
            });
        }else{
            return res.status(400).json({
                tittle: 'Quiz not exists'
            });
        }

    });
   
});
router.post('/delete-quiz', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(JSON.stringify(req.body));

    const { errors, isValid } = validateDeleteQuiz(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    QuizHead.findOneAndDelete({
        _id: req.body.quizId,
        authorId: req.user.id //Only owner delete the quiz
    }).then(quiz => {
        console.log(JSON.stringify(quiz));
        if(quiz) {
            // Delete Questions
            (async function(){
                const deleteManyQuestions = await QuizQuestion.deleteMany({
                    qizHeadId: req.body.quizId
                });   
                res.status(200).send('Ok');
            })();
            // Delete Answer's ????????
            // IF NEED it, delete here
        }
        else {
            return res.status(400).json({
                tittle: 'Quiz not exists'
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
router.get('/my-quiz-list', passport.authenticate('jwt', { session: false }), (req, res) => {
    QuizHead.find({
        userId : req.user.id
    }).then(quiz => {
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