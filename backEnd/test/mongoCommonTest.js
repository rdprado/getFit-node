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
            db = database;

            db.createCollection(COLLECTION_NAME).then(function(collection){

                // Mongo schema

                db.command( {
                    collMod: COLLECTION_NAME,
                    validator: { $and: 
                        [
                            { test: { $exists: true } },
                            { test:{$type: "string" }}
                        ]
                    },
                    validationLevel: "strict"
                 } )


                done();
            }).catch(function(err){
                    console.log(err);
            })
        });
    });

    beforeEach(function(done){
        mongoCommon = MongoCommon();
        mongoCommon.init(db, COLLECTION_NAME);

        db.collection(COLLECTION_NAME, function(error, collection){
            collection.deleteMany({}).then(function(result){
                done();
            });
        })
    });

    after(function(done){
        db.dropDatabase().then(function(){
            done();
        }).catch(function(err){
            console.log("TEST ERR " + err);
        })
    });

  // test cases

    describe('#testNewDBHasCollection', function() {
      it('should return 1 when DB is new', function(done) {
        
        db.collections(function(err, collections) {
             assert.equal(null, err);
             assert.equal(collections.length, 1);
             done();
        });
      });
    });

    describe('#testCanAddDoc', function() {
        it('should return 1 doc', function(done) {

            var checkDoc =()=>{ 
                db.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
                    col.find({}).toArray().then(function(docs){
                        assert.equal(docs.length, 1);
                        assert.equal(docs[0].test, "testDoc");
                        done();
                    })
                });
            }

            var docToAdd = {test:"testDoc"}

             mongoCommon.addDoc(docToAdd)
            .then(function(){
                checkDoc();
            }, function(err){
                console.log(err);
            });
        });
    });

    describe('#testWontAddDocWithWrongSchemaKey', function() {
        it('should reject', function(done) {

            var checkDoc =()=>{ 
                db.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
                    col.find({}).toArray().then(function(docs){
                        assert.equal(docs.length, 0);
                        done();
                    })
                });
            }

            var docToAdd = {INVALID:"testDoc"}

             mongoCommon.addDoc(docToAdd)
            .then(function(){
            }).catch(function(err){
                checkDoc();
            });
        });
    });


    describe('#testWontAddDocWithNullArgWhenSchemaRequiresString', function() {
        it('should reject', function(done) {

            var checkDoc =()=>{ 
                db.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
                    col.find({}).toArray().then(function(docs){
                        assert.equal(docs.length, 0);
                        done();
                    })
                });
            }

            var docToAdd = {test:null}

             mongoCommon.addDoc(docToAdd)
            .then(function(){
            }).catch(function(err){
                checkDoc();
            });
        });
    });

    describe('#testWontAddDocWithWrongSchemaValue', function() {
        it('should reject', function(done) {

            var docToAdd = {test:2}

            mongoCommon.addDoc(docToAdd)
            .then(function(){
            }).catch(function(err){
                db.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
                    col.find({}).toArray().then(function(docs){
                        assert.equal(docs.length, 0);
                        done();
                    })
                });
            });
        });
    });

    describe('#testCanAddMultipleDocs', function() {
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
                    db.collection(COLLECTION_NAME, {strict:true}, function(err, col) {
                        col.find({}).toArray().then(function(docs){
                            assert.equal(docs.length, 2);
                            done();
                        })
                    });
                }).catch(
                 function(err){
                    console.log("first doc err " + err);
                });
            }).catch(function(err){
                console.log("second doc err " + err);
            });   
        });
    });

    describe('#testCanFetchDocs', function() {
        it('should return 2 docs', function(done) {

            mongoCommon.addDoc({test:"testDoc"}).then(function(){
                mongoCommon.addDoc({test:"testDoc2"}).then(function(){
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

    describe('#testWontRemoveDocPassingEmptyFilter', function() {
        it('should reject', function(done) {

            mongoCommon.addDoc({test:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({}).then(function(){
                }).catch(function(err){
                    mongoCommon.fetchDocs().then(function(docs){
                         assert.equal(docs.length, 1);
                         done();
                    })
                })
            }).catch(function(err){
                console.log(err);
            });  
        });
    });

    describe('#testRemoveDoc', function() {
        it('should remove and collection have 0 docs', function(done) {

            mongoCommon.addDoc({test:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({test: "testDoc2"}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 0);
                        done();
                    })
                })
            }).catch(function(err){
                console.log(err);
            });  
        });
    });

    describe('#testWontRemoveDocWithPassinAWrongFilterValue', function() {
        it('should return 1 doc', function(done) {

            mongoCommon.addDoc({test:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({test: "testDoc3"}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        done();
                    })
                })
            }).catch(function(err){
                console.log(err);
            });  
        });
    });

    describe('#testWontRemoveDocWithPassingANullFilterArg', function() {
        it('should reject', function(done) {

            mongoCommon.addDoc({test:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({test: null}).then(function(){
                    
                }).catch(function(err){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        done();
                    })
                })
            }).catch(function(err){
                console.log(err);
            });  
        });
    });

    describe('#testWontRemoveDocPassingANullFilterAndNullArg', function() {
        it('should reject', function(done) {

            mongoCommon.addDoc({test:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({null: null}).then(function(){   
                }).catch(function(err){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        done();
                    }).catch(function(err){
                        console.log(err);
                    })
                })
            }).catch(function(err){
                console.log(err);
            });  
        });
    });

    describe('#testWontRemoveDocPassingANullFilterAndValidArg', function() {
        it('should reject', function(done) {

            mongoCommon.addDoc({test:"testDoc2"}).then(function(){
                mongoCommon.removeDoc({null: "a"}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        done();
                    }).catch(function(err){
                        console.log(err);
                    })
                })
            }).catch(function(err){
                console.log(err);
            });  
        });
    });

    describe('#testWontUpdateNonExistentDoc', function(){
        it('should do nothing and no errors', function(done){


            var docToAdd = {test:"testValue", a:1};
            var nonExistentDocFilter = {test:"testValue2"};
            var updateParams = {a:2}

            mongoCommon.addDoc(docToAdd).then(function(){
                mongoCommon.updateDoc(nonExistentDocFilter, updateParams).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        assert.equal(docs[0].a, 1);
                        done();
                    })
                });
            })
        })
    })

    describe('#testWontUpdateNonExistentDocWithNullFilterKey', function(){
        it('should do nothing and no errors', function(done){

            var docToAdd = {test:"testValue", a:1};
            var nonExistentDoc = {null:"testValue2"};
            var updateParams = {a:2};

            mongoCommon.addDoc(docToAdd).then(function(){
                mongoCommon.updateDoc(nonExistentDoc, updateParams).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        assert.equal(docs[0].a, 1);
                        done();
                    })
                });
            })
        })
    })

    describe('#testWontUpdateNonExistentDocNullFilterValue', function(){
        it('should do nothing and no errors', function(done){

            var docToAdd = {test:"testValue", a:1};
            var nonExistentDoc = {test:null};
            var updateParams = {a:2};

            mongoCommon.addDoc(docToAdd).then(function(){
                mongoCommon.updateDoc(nonExistentDoc, updateParams).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        assert.equal(docs[0].a, 1);
                        done();
                    })
                });
            })
        })
    })

    describe('#testUpdateExistentDocAddingNewField', function(){
        it('should do nothing and no errors', function(done){

            var docToAdd = {test:"testValue", a:1};
            var nonExistentDoc = {test:"testValue"};

            mongoCommon.addDoc(docToAdd).then(function(){
                mongoCommon.updateDoc(nonExistentDoc, {a:2}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        assert.equal(docs[0].a, 2);
                        done();
                    })
                });
            })
        })
    })

    describe('#testUpdateExistentDoc', function(){
        it('should do nothing and no errors', function(done){

            var docToAdd = {test:"testValue", a:1};
            var nonExistentDoc = {test:"testValue"};

            mongoCommon.addDoc(docToAdd).then(function(){
                mongoCommon.updateDoc(nonExistentDoc, {test:"test"}).then(function(){
                    mongoCommon.fetchDocs().then(function(docs){
                        assert.equal(docs.length, 1);
                        assert.equal(docs[0].test, "test");
                        done();
                    })
                });
            })
        })
    })

    describe('#testWontUpdateDocPassingAnInvalidWrongSchema', function(){
        it('should do nothing and no errors', function(done){

            var docToAdd = {test:"testValue", a:1};
            var nonExistentDoc = {test:"testValue"};

            mongoCommon.addDoc(docToAdd).then(function(){
                mongoCommon.updateDoc(nonExistentDoc, {test:2}).then(function(){
                }).catch(function(err){
                    done();
                });
            })
        })
    })
})



