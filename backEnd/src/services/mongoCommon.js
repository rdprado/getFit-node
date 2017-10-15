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

    function updateDoc(filter, paramsToUpdate){
        var p = new Promise(function(resolve, reject){

            if(!hasNull(paramsToUpdate))
            {
                var colExists = (collInfo)=>{
                    db.collection(collInfo.name, function (error, collection){
                        if(!error){
                            collection.updateOne(filter, {$set:paramsToUpdate}).then(function(r){
                                resolve();
                            }).catch(function(err){
                                reject(err);
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
            } else {
                reject("Can't update doc to null parameter");
            }

        });

        return p;
    }



    function addDoc(doc) {
        var p = new Promise(function(resolve, reject) {
            if(!hasNull(doc)){
                var colExists = (collInfo)=>{
                    db.collection(collInfo.name, {strict:true}, function(error, collection) {
                        if(!error){
                            collection.insertOne(doc).then(function(r){
                                resolve();  
                            }).catch(function(err){
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
                        }).catch(function(err){
                            reject(err);
                        })  
                    }, function(err){
                        reject(err);
                    });
                };
    
                doActionDependingIfCollectionExists(colExists, colDoesNotExist);
            } else {
                reject("Can't add doc with null parameter");
            }
        })

        return p;
    }

    // // DELETION

    function removeDoc(filter) {
        var p = new Promise(function(resolve, reject){


            var count = 0; 
            
                    for (var key in filter) {
                        count++;
                        if(filter[key] == null) {
                            reject("Can't remove doc with null parameter");
                            return;
                        }
                   }
            
                   if(count == 0) {
                        reject("Can't remove doc with empty filter");
                        return;
                   }


            var colExists = (collInfo)=>{
                db.collection(collInfo.name, {strict:true}, function(error, collection) {
                    if(!error){
                        collection.deleteOne(filter).then(function(r){
                            resolve();  
                        }).catch(function(err){
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
                        }).catch(function(err){
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

    function hasNull(obj){
        for (var key in obj) {
            if(obj[key] == null) {
                return true;
            }
        }
        return false;
    }

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