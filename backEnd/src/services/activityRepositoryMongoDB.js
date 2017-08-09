var Activity = require('../entities/activity');

var ActivityRepositoryMongoDB = function() {

    var database;
    const COLLECTION_NAME = 'activities';

    function init(db) {
        database = db;
    };

    function addActivity(activity, done) {
        var doc = {date: activity.getDate(), title: activity.getTitle(), comments: activity.getComments()};
		addDoc(doc, done);
    }
	
	function removeActivity(date, title, done) {
		var filter = {date: date, title: title};
        removeDoc(filter, done);
    }
	
    function fetchActivities(done) {
        fetchDocs(done);
    }
	
	function fetchActivityTypes(done) {
		var activityTypes = ["Running", "Cycling", "Weights", "Rowing"]
		activityTypes.sort((a, b) => a.localeCompare(b));
		done(activityTypes);
	}

	/////////////////////
    // mongo helpers

	// INSERTION
	
	function addDoc(doc, done) {
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
	
	function createCollection(name, done) {
        database.createCollection(name).then(function(collection) {
            done(collection);
        }).catch(function(err){
            console.log("Error create collection: " + err);
        });
    }
	
	// DELETION
	
	function removeDoc(filter, done) {
		database.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
            if(!err){
                col.deleteOne(filter).then(function(result){
                    done();
                    console.log('removed: ' + result.deletedCount);
                }).catch(function(err){
                    console.log(err);
                });
            } 
        });
	}
	
	// RETRIEVAL
	
	function fetchDocs(done) {
		var collectionExistsAction = (collInfo)=> {
            fetchDocsFromCollection(collInfo.name, (docs)=>{
                done(docs.map(docToActivity));
            });
        }

        var collectionDoesNotExistAction = ()=> {
            done([]);
        }

        collectionExists(COLLECTION_NAME, collectionExistsAction, collectionDoesNotExistAction);
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
	
	function docToActivity(mongoDoc){
        var activity = Activity();
        activity.init(mongoDoc.date, mongoDoc.title, mongoDoc.comments);
        return activity;
    }
	
	// HELPERS
	
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

	// API

    return {
        init: init,
        addActivity: addActivity,
		fetchActivityTypes: fetchActivityTypes,
        fetchActivities: fetchActivities,
        removeActivity: removeActivity
    };
}

module.exports = ActivityRepositoryMongoDB;
