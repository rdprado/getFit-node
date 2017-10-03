"use strict";

var ActivityRepo = require("../src/services/activityRepositoryMongoDB.js")
var activityRepo = ActivityRepo();

var Activity = require("../src/entities/activity.js");
var activity = Activity();

var assert = require("assert");

var MongoCommonSpy = function() {
    var addDocCalledWithObjLiteral = false;

    function init(db, mongoCommon){
    }

    function addDoc(doc) {
        if( typeof(doc.date) == "object" && 
             typeof(doc.title) == "string" && 
             typeof(doc.comments) == "string") {
                 addDocCalledWithObjLiteral = true;
        }
    }

    function getAddDocCalled() {
        return addDocCalledWithObjLiteral;
    }
    return {
        init: init,
        addDoc: addDoc,
        getAddDocCalled: getAddDocCalled
    }
}

var mongoCommonSpy = MongoCommonSpy()

describe('ActivityRepositoryMongoTest', function() {
    before(function() {
        activityRepo.init(null, mongoCommonSpy);
    });

    beforeEach(function() {
    });

    describe('#testAddActivity', function() {
        it('should obtain activity, convert to obj literal and call mongocommon', function() {
            
            var activity = Activity();
            console.log(activity);
            activity.init(new Date(), "title", "comments");
            assert.equal(mongoCommonSpy.getAddDocCalled(), false);
            activityRepo.addActivity(activity);
            assert.equal(mongoCommonSpy.getAddDocCalled(), true);
        })
    })

  // test cases

})