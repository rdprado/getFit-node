var ActivityFactory = require('../services/activityFactory');

var ActivityRepositoryMongoDB = function() {

    var database;
    const COLLECTION_NAME = 'activities';

    var activityNamesPerType = [ 
        { 
            activityType: "Aerobic",
            names: ["Running", "Cycling", "Rowing"] 
        },
        { 
            activityType: "Anaerobic",
            names: ["Weights"]
        },

    ];

    function init(db) {
        database = db;
    }

    function activityTypeForName(activityName) {
        for(pair in activityNamesPerType) {
            if(activityNamesPerType[pair].names.indexOf(activityName) >= 0) {
                return activityNamesPerType[pair].activityType;
            } 
        }
        return '';
    }

    function addActivity(activity, done) {
        var doc = activity.toObjLiteral();
        addDoc(doc, done);
    }

    function removeActivity(date, title, done) {
        var filter = {date: date, title: title};
        removeDoc(filter, done);
    }

    function fetchActivities(done) {
        var mapCB = (mongoDoc) => {
            return ActivityFactory().createActivity(activityTypeForName(mongoDoc.name), mongoDoc);
        }

        fetchDocs(done, mapCB);
    }

    function fetchActivityNames(done) {
        done(activityNamesPerType);
    }

    /////////////////////
    // mongo common

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

    function fetchDocs(done, mapCB) {
        var collectionExistsAction = (collInfo)=> {
            fetchDocsFromCollection(collInfo.name, (docs)=>{
                done(docs.map(mapCB));
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
        activityTypeForName: activityTypeForName,
        addActivity: addActivity,
        fetchActivityNames: fetchActivityNames,
        fetchActivities: fetchActivities,
        removeActivity: removeActivity
    };
}

module.exports = ActivityRepositoryMongoDB;
