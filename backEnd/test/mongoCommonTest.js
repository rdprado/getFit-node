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


            db.createCollection(COLLECTION_NAME).then(function(collection){


                db.command( {
                    collMod: COLLECTION_NAME,
                    //validator: { $or: [ { date: { $exists: true } }, { title: { $exists: true } } ] },
                    validator: { $or: [ { test: { $exists: true } }  ] },
                    validationLevel: "moderate"
                 } )


                done();
            }).catch(function(err){
                    console.log(err);
            })
            //done();
        });
    });

    beforeEach(function(done){
        mongoCommon = MongoCommon();
        mongoCommon.init(db, COLLECTION_NAME);

        db.collection(COLLECTION_NAME, function(error, collection){
            collection.deleteMany({}).then(function(){
                done();
            });
        })

        // db.collections().then(function(collections) {
        //     async.each(collections, function(collection, singleDone) {
        //         db.dropCollection(collection.collectionName).then(function(){
        //             singleDone();
        //         });
        //       }, done)
        //   });
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

    // describe('#testDBHasTestCollectionAfterAddingDoc', function() {
    //     it('should return 1 collection', function(done) {

    //         var checkCollectionCount = ()=>{
    //              db.collections(function(err, collections) {
    //                  assert.equal(null, err);
    //                  assert.equal(collections.length, 1);
    //                  done();
    //              });
    //         }

    //         mongoCommon.addDoc({test:"testDoc"})
    //         .then(function(){
    //             checkCollectionCount();
    //         }, function(err){
    //             console.log(err);
    //         });  
    //     });
    //   });

    describe('#testDBCanAddDoc', function() {
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

    // describe('#testDBAddDocWithNULLvalue', function() {
    //     it('should not add', function(done) {

    //         mongoCommon.addDoc({test:null}).then(function(){
    //         }).catch(function(err){

    //             db.collections().then(function(collections){
    //                 collections.length == 0;
    //                 done();
    //             }).catch(function(err){
    //                 console.log(err);
    //             })

    //         }) 
    //     });
    // });

    // describe('#testDBCanAddDocWithNULLKey', function() {
    //     it('should not add', function(done) {

    //         mongoCommon.addDoc({null:null}).then(function(){
    //         }).catch(function(err){

    //             db.collections().then(function(collections){
    //                 collections.length == 0;
    //                 done();
    //             }).catch(function(err){
    //                 console.log(err);
    //             })

    //         }) 
    //     });
    // });

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

    // describe('#testDBCanFetchWhenNoCollectionCreated', function() {
    //     it('should return 0 doc', function(done) {
    //         mongoCommon.fetchDocs().then(function(docs){
    //             assert.equal(docs.length, 0);
    //             done();
    //         })
            
    //     });
    // });

    describe('#testDBCanFetchDocs', function() {
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

    // describe('#testDBRemoveDocNoCollection', function() {
    //     it('should do nothing and give no errors', function(done) {
    //         mongoCommon.removeDoc({t:2}).then(function(){
    //             mongoCommon.fetchDocs().then(function(docs){
    //                 assert.equal(docs.length, 0);
    //                 done();
    //             }).catch(function(err){
    //                 console.log(err);
    //             })
                
    //         })
            
    //     });
    // });

    describe('#testDBRemoveDocEmptyFilter', function() {
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

    describe('#testDBRemoveDocWithFilter', function() {
        it('should return 0 doc', function(done) {

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

    describe('#testDBDontRemoveDocWithWrongFilter', function() {
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

    describe('#testDBDontRemoveDocWithNullFilterArg', function() {
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

    describe('#testDBRemoveDocWithNullFilterAndNullArg', function() {
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

    describe('#testDBRemoveDocWithNullFilterAndValidArg', function() {
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

    // describe('#testDBUpdateDocNoCollection', function(){
    //     it('should do nothing, no errors', function(done){
    //         mongoCommon.updateDoc({}, {}).then(function(){
    //             mongoCommon.fetchDocs().then(function(docs){
    //                 assert.equal(docs.length, 0);
    //                 done();
    //             })
    //         });  
    //     })
    // })

    describe('#testDBUpdateNonExistentDoc', function(){
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

    describe('#testDBUpdateNonExistentDocNullFilter', function(){
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

    describe('#testDBUpdateNonExistentDocNullFilterValue', function(){
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

    // describe('#testDBUpdateExistentDocNullValue', function(){
    //     it('should reject', function(done){

    //         var docToAdd = {testKey:"testValue", a:1};
    //         var existentDoc = {testKey:"testValue"};
    //         var updateParams = {a:null};

    //         mongoCommon.addDoc(docToAdd).then(function(){
    //             mongoCommon.updateDoc(existentDoc, updateParams).then(function(){
    //             }).catch(function(err){
    //                 mongoCommon.fetchDocs().then(function(docs){
    //                     assert.equal(docs.length, 1);
    //                     assert.equal(docs[0].a, 1);
    //                     done();
    //                 })
    //             });
    //         })
    //     })
    // })
    

    describe('#testDBUpdateExistentDoc', function(){
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
})



