
// var mongo = require('mongodb');
// var MongoClient = require('mongodb').MongoClient

/////////////////////
// mongo common

// INSERTION

module.exports = function MongoCommon() {

    var db;
    var collectionName;

    // function connect(url, done) {
    //         MongoClient.connect(url, function(err, database) {
    //             if (err) {
    //                 return done(err);
    //             }

    //             db = database;
    //             console.log("DB CONNECTED");

    //             done();
    //         });
    // }

    // function getDB(){
    //     return db;
    // }


    // function test() {
    //     console.log("test OK");
    // };

    function init(database, collName) {
        db = database;
        collectionName = collName;
    }

    // return {
    //     connect: connect,
    //     getDB: getDB,
    //     test: test,
    //     init: init
    // };


    function addDoc(doc, done) {
        //  var collectionExistsAction = (collInfo)=> {
        //      insertInCollection(collectionName, doc, ()=> {
        //          done()
        //      });
        //  }

        var collectionDoesNotExistAction = ()=> {

            createCollection(collectionName, (collection)=> {
                collection.insertOne(doc, function (err, result) {
                    done();
                    //console.log('created and inserted: ' + result.insertedCount);
                });
            })
        }
        collectionExists(collectionName, ()=>{}, collectionDoesNotExistAction);
    }

    function insertInCollection(collectionName, doc, done){
        db.collection(collectionName, {strict:true}, function(err, col) {
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

        db.createCollection(name).then(function(collection) {
            done(collection);
        }).catch(function(err){
            console.log("Error create collection: " + err);
        });
    }

    // // DELETION

    // function removeDoc(filter, done) {
    //     database.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
    //         if(!err){
    //             col.deleteOne(filter).then(function(result){
    //                 done();
    //                 console.log('removed: ' + result.deletedCount);
    //             }).catch(function(err){
    //                 console.log(err);
    //             });
    //         } 
    //     });
    // }

    // // RETRIEVAL

    // function fetchDocs(done, mapCB) {
    //     var collectionExistsAction = (collInfo)=> {
    //         fetchDocsFromCollection(collInfo.name, (docs)=>{
    //             done(docs.map(mapCB));
    //         });
    //     }

    //     var collectionDoesNotExistAction = ()=> {
    //         done([]);
    //     }

    //     collectionExists(COLLECTION_NAME, collectionExistsAction, collectionDoesNotExistAction);
    // }

    // function fetchDocsFromCollection(collectionName, done){
    //     database.collection(collectionName, {strict:true}, function(err, col) {
    //         if(!err){
    //             col.find({}).toArray().then(function(docs){
    //                 done(docs);
    //             }).catch(function(err){
    //                 throw new Error("Workouts Repository Error | Cannote Fetch | Cannot find documents in collection with name" + collectionName + ". >> " + err);
    //             });
    //         } else {
    //             throw new Error("Workouts Repository Error | Cannot Fetch | Cannot fetch collection with name " + collectionName + ". >> " + err);
    //             done([]);
    //         }
    //     });
    // }


    // HELPERS

    function collectionExists(collectionName, colExistsAction, colDoesNotExistAction) {
       db.listCollections({name: collectionName})
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
        addDoc: addDoc
    };
}