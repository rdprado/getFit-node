var Workout = require('../entities/workout');

var WorkoutRepositoryMongoDB = function() {

    var database;
    const COLLECTION_NAME = 'workouts';

    function init(db) {
        database = db;
    };

    function addWorkout(workout, done) {

        var doc = {date: workout.getDate(), title: workout.getTitle(), comments: workout.getComments()};

        var collectionExistsAction = (collInfo)=> {
            insertInCollection(collInfo.name, doc, ()=> {
                done()
            });
        }

        var collectionDoesNotExistAction = ()=> {
            createCollection(COLLECTION_NAME, (collection)=> {
                collection.insertOne(doc, function (err, result) {
                    done();
                    console.log('created and inserted: ' + result.insertedCount);
                });
            })
        }

        collectionExists(COLLECTION_NAME, collectionExistsAction, collectionDoesNotExistAction);
    }

    function fetchWorkouts(done) {
        var collectionExistsAction = (collInfo)=> {
            fetchDocsFromCollection(collInfo.name, (docs)=>{
                done(docs.map(docToWorkout));
            });
        }

        var collectionDoesNotExistAction = ()=> {
            done([]);
        }

        collectionExists(COLLECTION_NAME, collectionExistsAction, collectionDoesNotExistAction);
    }
	
	function fetchWorkoutTypes(done) {
		var wktTypes = ["Running", "Cycling", "Weights", "Rowing"]
		wktTypes.sort((a, b) => a.localeCompare(b));
		done(wktTypes);
	}

    function docToWorkout(mongoDoc){
        var wkt = Workout();
        wkt.init(mongoDoc.date, mongoDoc.title, mongoDoc.comments);
        return wkt;
    }

    function removeWorkout(date, title, done) {
        database.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
            if(!err){
                col.deleteOne({date: date, title: title}).then(function(result){
                    done();
                    console.log('removed: ' + result.deletedCount);
                }).catch(function(err){
                    console.log(err);
                });
            } 
        });
    }

    // mongo helpers

    function insertInCollection(collectionName, doc, done){
        database.collection(collectionName, {strict:true}, function(err, col) {
            if(!err){
                col.insertOne(doc, function (err, result) {
                    done();
                    console.log('inserted: ' + result.insertedCount + " in " + collectionName);
                });
            } else {
                console.log("err inserting " + doc + " in " + collectionName);
            }
        });
    }

    function collectionExists(collectionName, colExistsAction, colDoesNotExistAction) {
        database.listCollections({name: COLLECTION_NAME})
        .next(function(err, collInfo) {
            if(collInfo) {
                colExistsAction(collInfo)
            } else {
                colDoesNotExistAction();
            }
        })
    }

    function fetchDocsFromCollection(collectionName, done){
        database.collection(collectionName, {strict:true}, function(err, col) {
            if(!err){
                col.find({}).toArray().then(function(docs){
                    done(docs);
                }).catch(function(err){
                    console.log("Error toArray, fetching docs: " + err);
                });
            } else {
                console.log("Error fetching docs from collection " + collectionName +". err= " + err);
                done([]);
            }
        });
    }

    function createCollection(name, done) {
        database.createCollection(name).then(function(collection) {
            done(collection);
        }).catch(function(err){
            console.log("Error create collection: " + err);
        });
    }



    return {
        init: init,
        addWorkout: addWorkout,
		fetchWorkoutTypes: fetchWorkoutTypes,
        fetchWorkouts: fetchWorkouts,
        removeWorkout: removeWorkout
    };
}

module.exports = WorkoutRepositoryMongoDB;
