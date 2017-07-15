var WorkoutRepositoryMongoDB = function() {

    var database;
    const COLLECTION_NAME = 'workouts';

    function doInit(db) {
        database = db;
    };

    function doAddWorkout(workout, done) {

        var doc = {date: workout.getDate(), title: workout.getTitle(), comments: workout.getComments()};

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

    function doFetchWorkouts(done) {
        database.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
            if(!err){
                col.find({}).toArray().then(function(docs){
                    done(docs);
                }).catch(function(err){
                    console.log(err);
                });
            }
        });
    }

    var publicAPI = {
        init: doInit,
        addWorkout: doAddWorkout,
        fetchWorkouts: doFetchWorkouts 
    };

    return publicAPI;
}

module.exports = WorkoutRepositoryMongoDB;
