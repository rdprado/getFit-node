var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET hello page. */
router.get('/helloworld', function(req, res, next) {
    res.render('helloworld', { title: 'Hello, World!' });
});

// dependency injection
var WorkoutRepository = require('../src/services/workoutRepository')
var workoutRepository = new WorkoutRepository(null)

var AddWorkoutUseCase = require('../src/scenes/addWorkoutUseCase')
var addWorkoutUseCase = new AddWorkoutUseCase(workoutRepository);

// dependency injection
/* GET workouts. */
router.get('/workouts', function(req, res, next) {
    res.render('workouts', {
        workoutName:'Free Workout'
    });
});

router.post('/workouts', function(req, res, next) {
    var requestModel = {
        date: Date.now,
        title: "Running",
        comments: "easy"
    }

    addWorkoutUseCase.addWorkout(requestModel);

    // var db = req.db;
    // var workoutsCollection = db.get('workouts');
    // exercisesCollection.insert({name:req.body.workoutName, exerciseName:req.body.exerciseName, sets:req.body.sets, reps:req.body.reps});
     res.send('Post page');
});

/* GET exercises page. */
// router.get('/exerciselist', function(req, res, next) {
//     console.log(process.cwd());
//     var db = req.db;
//     var collection = db.get('exercises');
//     collection.find({}, {}, function(e, docs){
//         res.render('exerciselist', {
//             "exerciselist" : docs
//         });
//     });
// });
//
// router.get('/exerciselist/:exercisename', function(req, res, next) {
//     var db = req.db;
//     var exercises = db.collection('exercises');
//     var exerciseName = req.params.exercisename;
//     exercises.find({name:exerciseName}, function(e, exerciseDoc){
//         res.render('exercise', {
//             "exercise" : exerciseDoc[0]
//         });
//     });
// });
//
//
// #<{(| GET diary page. |)}>#
// router.get('/diary', function(req, res, next) {
//
//     var db = req.db;
//     var diaryCollection = db.get('diary');
//
//     diaryCollection.find({}, {}, function(e, diaryDocs) {
//
//         diaryDocs.forEach(function(diaryDoc) {
//
//             var exercisesCollection = db.get('exercises');
//             exercisesCollection.find({}, {}, function(e, exerciseDocs) {
//                 var diaryEntries = [];
//                 diaryEntries.push([diaryDoc, exerciseDocs]);
//                 res.render('diary', {
//                     "diary" : diaryEntries
//                 });
//             })
//         });
//     });
// });
//
// router.post('/exerciseList', function (req, res, next) {
//     var db = req.db;
//     var exercisesCollection = db.get('exercises');
//     exercisesCollection.insert({name:req.body.title});
//     console.log(req.body.title);
//     console.log(req.body.description);
//     res.send('Post page');
// });
//
// router.post('/exerciselist/:exercisename/delete', function(req, res, next) {
//     var db = req.db;
//     var exercises = db.collection('exercises');
//     var exerciseName = req.params.exercisename;
//     exercises.remove({name:exerciseName}, function(e, doc){
//         res.send('Post page');
//     });
// });
module.exports = router;
