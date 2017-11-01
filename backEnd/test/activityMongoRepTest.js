"use strict";

var ActivityRepo = require("../src/services/activityRepositoryMongoDB.js")
var Activity = require("../src/entities/activity.js")
var assert = require("assert");

var MongoCommonSpy = function() {
    var addDocCalled = false;
    var removeDocCalled = false;
    var updateDocCalled = false;
    var fetchDocsCalled = false;
    var addedDoc = null;
    var docs = [];

    function init(db, collectionName) {

    }

    function setDocs(Docs) {
        docs = Docs;
    }

    function addDoc(doc) {
        return new Promise(function(resolve, reject){
            addedDoc = doc;
            addDocCalled = true;
            resolve();
        })
    }

    function removeDoc(filter) {
        return new Promise(function(resolve, reject){
            removeDocCalled = true;
            resolve();
        })
    }

    function updateDoc(filter, paramsToUpdate){
        return new Promise(function(resolve, reject){
            updateDocCalled = true;
            resolve()
        })
    }

    function fetchDocs() {
        return new Promise(function(resolve,reject){
            fetchDocsCalled = true;
            resolve(docs);
        })
    }

    function spied() {
        return {
            addDocCalled,
            addedDoc,
            removeDocCalled,
            updateDocCalled,
            fetchDocsCalled
        };
    }

    return {
        init: init,
        addDoc: addDoc,
        removeDoc: removeDoc,
        updateDoc: updateDoc,
        fetchDocs: fetchDocs,
        setDocs: setDocs,
        spied: spied
    }
}

var MongoCommonSpyError = function() {
    var addDocCalled = false;
    var removeDocCalled = false;
    var updateDocCalled = false;
    var fetchDocsCalled = false;
    var addedDoc = null;


    function init(db, collectionName) {

    }

    function addDoc(doc) {
        addDocCalled = true;
        return new Promise(function(resolve,reject){
            reject("err");
        });
    }

    function removeDoc(filter) {
        return new Promise(function(resolve, reject){
            removeDocCalled = true;
            reject("err");
        });
    }

    function updateDoc(filter, paramsToUpdate){
        return new Promise(function(resolve, reject){
            updateDocCalled = true;
            reject("err");
        });
    }

    function fetchDocs() {
        return new Promise(function(resolve, reject){
            fetchDocsCalled = true;
            reject("err");
        });
    }

    function spied() {
        return {
            addDocCalled,
            addedDoc,
            removeDocCalled,
            updateDocCalled,
            fetchDocsCalled
        };
    }

    return {
        init: init,
        addDoc: addDoc,
        removeDoc: removeDoc,
        updateDoc: updateDoc,
        fetchDocs: fetchDocs,
        spied: spied
    }
}

var activityRepo = ActivityRepo();
var mongoCommonSpy = MongoCommonSpy();
var mongoCommonSpyError = MongoCommonSpyError();

// test cases

describe('ActivityRepositoryMongoTest', function() {
    before(function() {
        //activityRepo.init(null, mongoCommonSpy);
    });

    beforeEach(function() {
        mongoCommonSpy = MongoCommonSpy();
        mongoCommonSpyError = MongoCommonSpyError(); // fake?
        activityRepo = ActivityRepo();
        activityRepo.init(null, mongoCommonSpy);
    });

    describe('#testAddActivity', function() {
        it('should obtain activity, convert it to obj literal and call mongocommon', function(done) {
            
            var activity = Activity();
            var docToAdd = {date: new Date(), title:"atividade bolada",instructions:""};
            activity.init(docToAdd.date, docToAdd.title, docToAdd.instructions);

            assert.equal(mongoCommonSpy.spied().addDocCalled, false);
            assert.equal(mongoCommonSpy.spied().addedDoc, null);
            activityRepo.addActivity(activity).then(function() {
                assert.equal(mongoCommonSpy.spied().addDocCalled, true);
                assert.equal(JSON.stringify(mongoCommonSpy.spied().addedDoc), JSON.stringify(docToAdd));
                done();
            }).catch(function(err){
                console.log(err);
            });

        })
    })

    describe('#testAddActivityErrorAdding', function() {
        it('should reject', function(done) {
            activityRepo.init(null, mongoCommonSpyError);

            var activity = Activity();
            var docToAdd = {date: new Date(), title:"atividade bolada",instructions:""};
            activity.init(docToAdd.date, docToAdd.title, docToAdd.instructions);

            assert.equal(mongoCommonSpyError.spied().addDocCalled, false);
            assert.equal(mongoCommonSpyError.spied().addedDoc, null);
            activityRepo.addActivity(activity).then(function() {
            }).catch(function(err){
                assert.equal(mongoCommonSpyError.spied().addDocCalled, true);
                assert.equal(mongoCommonSpyError.spied().addedDoc, null);


                assert.equal(err instanceof Error, true);
                assert.equal(err.message != "", true);


                done();
            });

        })
    })

    describe('#testAddActivityNotPassingActivity', function() {
        it('should not add, reject promise with error', function(done) {

            activityRepo.addActivity({v:"v"}).then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpy.spied().addDocCalled, 0);
                done();
            });
        })
    })

    describe('#testRemoveActivity', function() {
        it('should obtain activity, convert to obj literal and call mongocommon', function(done) {
            
            assert.equal(mongoCommonSpy.spied().removeDocCalled, false);
            activityRepo.removeActivity(new Date(), "title").then(function(){
                assert.equal(mongoCommonSpy.spied().removeDocCalled, true);
                done();
            }).catch(function(err){
                console.log(err);
            });
        })
    })


    describe('#testRemoveActivityWithError', function() {
        it('should reject', function(done) {
            
            activityRepo.init(null, mongoCommonSpyError);

            assert.equal(mongoCommonSpyError.spied().removeDocCalled, false);
            activityRepo.removeActivity(new Date(), "title").then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpyError.spied().removeDocCalled, true);
                assert.equal(err instanceof Error, true);
                assert.equal(err.message != "", true);
                done();
            });
        })
    })

    describe('#testUpdateActivity', function() {
        it('should obtain activity, create filter and params to update and call mongocommon update activity', function(done) {
            var activity = Activity();
            activity.init(new Date(), "title", "instructions");
            assert.equal(mongoCommonSpy.spied().updateDocCalled, false);
            activityRepo.updateActivity(activity).then(function(){
                assert.equal(mongoCommonSpy.spied().updateDocCalled, true);
                done();
            }).catch(function(err){
                console.log(err);
            });
            
        })
    })

    describe('#testUpdateActivityWithError', function() {
        it('should reject', function(done) {

            activityRepo.init(null, mongoCommonSpyError);

            var activity = Activity();
            activity.init(new Date(), "title", "instructions");
            assert.equal(mongoCommonSpyError.spied().updateDocCalled, false);
            activityRepo.updateActivity(activity).then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpyError.spied().updateDocCalled, true);
                assert.equal(err instanceof Error, true);
                assert.equal(err.message != "", true);
                done();
            });
        })
    })

    describe('#testUpdateActivityNotPassingActivity', function() {
        it('should reject', function(done) {

            activityRepo.init(null, mongoCommonSpyError);
            assert.equal(mongoCommonSpyError.spied().updateDocCalled, false);
            activityRepo.updateActivity({}).then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpyError.spied().updateDocCalled, false);
                done();
            });
        })
    })

    describe('#testFetchActivities', function() {
        it('should call mongoCommon fetchDocs, return promise with activities', function(done) {
            var activity = Activity();
            activity.init(new Date(), "title", "instructions");
            assert.equal(mongoCommonSpy.spied().fetchDocsCalled, false);

            var docToFetch = {date: new Date(), title: "supino", instructions:"inst"}
            mongoCommonSpy.setDocs([docToFetch]);

            activityRepo.fetchActivities().then(function(activities){
                assert.equal(activities[0].getDate(), docToFetch.date)
                assert.equal(activities[0].getTitle(), docToFetch.title)
                assert.equal(activities[0].getInstructions(), docToFetch.instructions)
                done();
            }).catch(function(err){
                console.log(err);
            });
            
            assert.equal(mongoCommonSpy.spied().fetchDocsCalled, true);
        })
    })

    describe('#testFetchActivitiesWithError', function() {
        it('should reject', function(done) {
            activityRepo.init(null, mongoCommonSpyError);

            var activity = Activity();
            activity.init(new Date(), "title", "instructions");
            assert.equal(mongoCommonSpyError.spied().fetchDocsCalled, false);

            var docToFetch = {date: new Date(), title: "supino", instructions:"inst"}

            activityRepo.fetchActivities().then(function(activities){
            }).catch(function(err){
                assert.equal(mongoCommonSpyError.spied().fetchDocsCalled, true);
                assert.equal(err instanceof Error, true);
                assert.equal(err.message != "", true);
                done();
            });
            
        })
    })
})