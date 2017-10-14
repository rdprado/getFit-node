/////////////////////
// mongo common
"use strict";

// INSERTION

module.exports = function MongoCommon() {

    var db;
    var collectionName;

    function init(database, collName) {
        db = database;
        collectionName = collName;
    }


    // function updateDoc(filter, paramsToUpdate) {
    //     var p = new Promise(function(resolve,reject){
    //         var colExists = (collInfo)=>{
    //             db.collection(collInfo.name, function (error, collection){
    //                 if(!error){
    //                     collection.updateOne(filter, {$set:paramsToUpdate}).then(function(r){
    //                         resolve();
    //                     })
    //                 } else {
    //                     reject(error);
    //                 }
    //             }
    //         )}
    //     })
    // }

    function updateDoc(filter, paramsToUpdate){
        var p = new Promise(function(resolve, reject){
            var colExists = (collInfo)=>{
                db.collection(collInfo.name, function (error, collection){
                    if(!error){
                        collection.updateOne(filter, {$set:paramsToUpdate}).then(function(r){
                            resolve();
                        })
                    } else {
                        reject(error);
                    }
                }
            )}

            var colDoesNotExist = ()=>{
                resolve();
            };

            doActionDependingIfCollectionExists(colExists, colDoesNotExist);

        });

        return p;
    }

    function addDoc(doc) {
        var p = new Promise(function(resolve, reject) {

            var colExists = (collInfo)=>{
                db.collection(collInfo.name, {strict:true}, function(error, collection) {
                    if(!error){
                        collection.insertOne(doc).then(function(r){
                            resolve();  
                        }, function(err){
                            reject(err);
                        })
                    } else {
                        reject(error);
                    }
                });
            }
            var colDoesNotExist = ()=>{
                db.createCollection(collectionName).then(function(collection){
                    collection.insertOne(doc).then(function(r){
                         resolve();  
                    }, function(err){
                         reject(err);
                    })  
                }, function(err){
                    reject(err);
                });
            };

            doActionDependingIfCollectionExists(colExists, colDoesNotExist);
        })

        return p;
    }

    // // DELETION

    function removeDoc(filter) {
        var p = new Promise(function(resolve, reject){
            var colExists = (collInfo)=>{
                db.collection(collInfo.name, {strict:true}, function(error, collection) {
                    if(!error){
                        collection.deleteOne(filter).then(function(r){
                            resolve();  
                        }, function(err){
                            reject(err);
                        })
                    } else {
                        reject(error);
                    }
                });
            }
            var colDoesNotExist = ()=>{
                resolve();
            };
    
            doActionDependingIfCollectionExists(colExists, colDoesNotExist);
        });

        return p;
    }

    // // RETRIEVAL

     function fetchDocs() {
         var p = new Promise(function(resolve, reject)
         {
            var colExists = (collInfo)=>{
                db.collection(collectionName, {strict:true}, function(error, collection) {
                    if(!error){
                        collection.find({}).toArray().then(function(docs){
                            resolve(docs);  
                        }, function(err){
                            reject(err);
                        })
                    } else {
                        reject(error);
                    }
                });
            }
            var colDoesNotExist = ()=>{
                resolve([]);
            };

            doActionDependingIfCollectionExists(colExists, colDoesNotExist);

         })

         return p;


     }
    // HELPERS


    function doActionDependingIfCollectionExists(colExistsAction, colDoesNotExistAction) {
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
        addDoc: addDoc,
        fetchDocs: fetchDocs,
        removeDoc: removeDoc,
        updateDoc: updateDoc
    };
}