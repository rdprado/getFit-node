"use strict";

var ActivityRepo = require("../src/services/activityRepositoryMongoDB.js")
var Activity = require("../src/entities/activity.js")
var assert = require("assert");

var MongoCommonSpy = function() {
    var addDocCalled = false;
    var removeDocCalled = false;
    var updateActivityCalled = false;
    var addedDoc = null;


    function init(db, collectionName) {

    }

    function addDoc(doc) {
        addedDoc = doc;
        addDocCalled = true;
    }

    function removeDoc(filter) {
        removeDocCalled = true;
    }

    function updateActivity(filter, paramsToUpdate){
        updateActivityCalled = true;
    }

    function spied() {
        return {
            addDocCalled,
            addedDoc,
            removeDocCalled,
            updateActivityCalled,
        };
    }

    return {
        init: init,
        addDoc: addDoc,
        removeDoc: removeDoc,
        updateActivity: updateActivity,
        spied: spied
    }
}

var activityRepo = ActivityRepo();
var mongoCommonSpy = MongoCommonSpy();

// test cases

describe('ActivityRepositoryMongoTest', function() {
    before(function() {
        //activityRepo.init(null, mongoCommonSpy);
    });

    beforeEach(function() {
        mongoCommonSpy = MongoCommonSpy();
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

    describe('#testAddActivityNotPassingActivity', function() {
        it('should not add, reject promise with error', function(done) {

            activityRepo.addActivity({}).then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpy.spied().addDocCalled, 0);
                done();
            });
        })
    })

    describe('#testAddActivityEmptyTitle', function() {
        it('should not add, reject promise with error', function(done) {

            var activity = Activity();
            activity.init(new Date(),"","");
            activityRepo.addActivity(activity).then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpy.spied().addDocCalled, 0);
                done();
            });
        })
    })

    describe('#testAddActivityEmptyDate', function() {
        it('should not add, reject promise with error', function(done) {

            var activity = Activity();
            activity.init("","supino","");

            activityRepo.addActivity(activity).then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpy.spied().addDocCalled, 0);
                done();
            });
        })
    })

    describe('#testRemoveActivity', function() {
        it('should obtain activity, convert to obj literal and call mongocommon', function() {
            
            assert.equal(mongoCommonSpy.spied().removeDocCalled, false);
            activityRepo.removeActivity(new Date(), "title");
            assert.equal(mongoCommonSpy.spied().removeDocCalled, true);
        })
    })

    describe('#testRemoveActivityEmptyDate', function() {
        it('should not remove, reject promise with error', function(done) {

            var activity = Activity();
            activity.init("","supino","");

            activityRepo.removeActivity(activity).then(function(){
            }).catch(function(err){
                assert.equal(mongoCommonSpy.spied().removeDocCalled, false);
                done();
            });
        })
    })

    describe('#testUpdateActivity', function() {
        it('should obtain activity, create filter and params to update and call mongocommon update activity', function() {
            var activity = Activity();
            activity.init(new Date(), "title", "instructions");
            assert.equal(mongoCommonSpy.spied().updateActivityCalled, false);
            activityRepo.updateActivity(activity);
            assert.equal(mongoCommonSpy.spied().updateActivityCalled, true);
        })
    })

})