"use strict"

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb';
var assert = require('assert');

const COLLECTION_NAME = "Activities";

exports.start = function (done) {
    MongoClient.connect(url, function(err, db) {
        
            assert.equal(null, err);
        
            db.listCollections({name: COLLECTION_NAME}).next(function(err, collinfo) {
                if (!collinfo) {
                    db.createCollection(COLLECTION_NAME).then(function(collection){
                        
                        // Mongo schema
                
                        db.command( {
                            collMod: COLLECTION_NAME,
                            validator: { $and: 
                                [
                                    { date: { $exists: true } },
                                    { date:{$type: "date" }}, 
                                    { title: { $exists: true } },
                                    { date:{$type: "string" }}
                                ]
                            },
                            validationLevel: "strict"
                            } )
                
                
                        
                        done(db);
                        console.log("Server ready");
                    }).catch(function(err){
                            console.log(err);
                    })
                } else {
                    done(db);
                }
            });



        });
}