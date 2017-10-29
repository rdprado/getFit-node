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

            db.collection(collectionName, function (error, collection){
                if(!error){
                    collection.updateOne(filter, {$set:paramsToUpdate}).then(function(r){
                        resolve();
                    }).catch(function(err){
                        reject(err);
                    })
                } else {
                    reject(error);
                }
            })
        });

        return p;
    }

    function addDoc(doc) {
        var p = new Promise(function(resolve, reject) {

            db.collection(collectionName, {strict:true}, function(error, collection) {
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


            db.collection(collectionName, {strict:true}, function(error, collection) {
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
        });

        return p;
    }

    // // RETRIEVAL

     function fetchDocs() {
         var p = new Promise(function(resolve, reject)
         {

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
         })

         return p;


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