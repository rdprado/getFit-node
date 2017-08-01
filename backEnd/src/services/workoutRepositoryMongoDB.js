var Workout = require('../entities/workout');

var WorkoutRepositoryMongoDB = function() {

    var database;
    const COLLECTION_NAME = 'workouts';

    function init(db) {
        database = db;
    };

    function addWorkout(workout, done) {

        var doc = {ID:workout.getID(), date: workout.getDate(), title: workout.getTitle(), comments: workout.getComments()};

        database.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
            if(!err){
                col.insertOne(doc, function (err, result) {
                    done();
                    console.log('inserted: ' + result.insertedCount);
                });
            } else {
                database.createCollection(COLLECTION_NAME).then(function(err, result) {
                    database.collection(COLLECTION_NAME, {strict:true}, function(err, col1) {
                        col1.insertOne(doc, function (err, result) {
                            console.log('created collections and inserted: ' + result.insertedCount);
                            done();
                        });
                    });
                });
            }
        });
    }

    function fetchWorkouts(done) {
        database.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
            if(!err){
                col.find({}).toArray().then(function(docs){
                    done(docs.map(toWorkout));
                }).catch(function(err){
                    console.log(err);
                });
            }
        });
    }

    function toWorkout(mongoDoc){
        var wkt = Workout();
        wkt.init("", mongoDoc.date, mongoDoc.title, mongoDoc.comments);
        return wkt;
    }

    function removeWorkout(id, done) {
        database.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
            if(!err){
                col.deleteOne({ID: id}).then(function(result){
                    done();
                    console.log('removed: ' + result.deletedCount);
                }).catch(function(err){
                    console.log(err);
                });
            } 
        });
    }


    return {
        init: init,
        addWorkout: addWorkout,
        fetchWorkouts: fetchWorkouts,
        removeWorkout: removeWorkout
    };
}

module.exports = WorkoutRepositoryMongoDB;
