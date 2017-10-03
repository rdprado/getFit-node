"use strict";

var assert = require("assert");
var async = require('async');
var MongoClient = require('mongodb').MongoClient

var MongoCommon = require("../src/services/mongoCommon.js")

var db;
var mongoCommon;

const COLLECTION_NAME = "testCollectionMongo";

describe('MongoCommon', function(){
    before(function(done){

        var url = 'mongodb://localhost:27017/testdb';
        MongoClient.connect(url, function(err, database) {
            if (err) {
                return done(err);
            }

            db = database;
            done();
        });
    });

    beforeEach(function(done){
        mongoCommon = MongoCommon();
        mongoCommon.init(db, COLLECTION_NAME);

        db.collections().then(function(collections) {
            async.each(collections, function(collection, singleDone) {
                db.dropCollection(collection.collectionName).then(function(){
                    singleDone();
                });
              }, done)
          });
    });

  // test cases

    describe('#testNewDBHasNoTestCollection', function() {
      it('should return 0 when DB is new', function(done) {
        
        db.collections(function(err, collections) {
             assert.equal(null, err);
             assert.equal(collections.length, 0);
             done();
        });
      });
    });

    describe('#testDBHasTestCollectionAfterAddingDoc', function() {
        it('should return 1 collection', function(done) {

            var checkCollectionCount = ()=>{
                 db.collections(function(err, collections) {
                     assert.equal(null, err);
                     assert.equal(collections.length, 1);
                     done();
                 });
            }

            mongoCommon.addDoc({test:"testDoc"})
            .then(function(){
                checkCollectionCount();
            }, function(err){
                console.log(err);
            });  
        });
      });

    describe('#testDBCanAddDoc', function() {
        it('should return 1 doc', function(done) {

            var checkDocCount =()=>{ 
                db.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
                    col.find({}).toArray().then(function(docs){
                        assert.equal(docs.length, 1);
                        done();
                    })
                });
            }

             mongoCommon.addDoc({test:"testDoc"})
            .then(function(){
                checkDocCount();
            }, function(err){
                console.log(err);
            });
        });
    });

    describe('#testDBCanAddMultipleDocs', function() {
        it('should return 2 docs', function(done) {

            var checkDocCount =()=>{ 
                db.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
                    col.find({}).toArray().then(function(docs){
                        assert.equal(docs.length, 2);
                        done();
                    })
                });
            }

            mongoCommon.addDoc({test:"testDoc"})
            .then(function(){
                mongoCommon.addDoc({test:"testDoc"}).then(function(){
                    checkDocCount();
                }, function(err){
                    console.log("first doc err " + err);
                });
            }, function(err){
                console.log("second doc err " + err);
            });   
        });
    });

    describe('#testDBCanFetchWhenNoCollectionCreated', function() {
        it('should return 0 doc', function(done) {
            mongoCommon.fetchDocs().then(function(docs){
                assert.equal(docs.length, 0);
                done();
            })
            
        });
    });

    describe('#testDBCanFetchDocs', function() {
        it('should return 2 docs', function(done) {
            mongoCommon.addDoc({test:"testDoc"}).then(function(){
                mongoCommon.addDoc({test2:"testDoc2"}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 2);
                        done();
                    })
                }, function(err){
                    console.log(err);
                });    
            })
        });
    });

    describe('#testDBRemoveDocNoCollection', function() {
        it('should return 2 docs', function(done) {
            mongoCommon.removeDoc({}).then(function(){
                done()
            })
        });
    });

    describe('#testDBRemoveDoc', function() {
        it('should return 0 doc', function(done) {

            mongoCommon.addDoc({test2:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 0);
                        done();
                    })
                })
            }, function(err){
                console.log(err);
            });  
        });
    });

    describe('#testDBRemoveDocWithFilter', function() {
        it('should return 0 doc', function(done) {

            mongoCommon.addDoc({test2:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({test2: "testDoc2"}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 0);
                        done();
                    })
                })
            }, function(err){
                console.log(err);
            });  
        });
    });

    describe('#testDBDontRemoveDocWithWrongFilter', function() {
        it('should return 0 doc', function(done) {

            mongoCommon.addDoc({test2:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({test2: "testDoc3"}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        done();
                    })
                })
            }, function(err){
                console.log(err);
            });  
        });
    });
})



