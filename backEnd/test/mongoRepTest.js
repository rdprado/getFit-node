var assert = require("assert");
//var MongoCommon = require("../src/services/mongoCommon.js")
var ActivityRepository = require("../src/services/activityRepositoryMongoDB.js")

//var mongoCommon = MongoCommon();

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient

var db;

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
        db.dropCollection("activities", function(err, result) {
             done();
        });
    });

  // test cases

    describe('#testDBHasNoActivityCollectionBeforeAddingActivity', function() {
      it('should return 0 when DB is new', function(done) {
        
        db.collections(function(err, collections) {
             assert.equal(null, err);
             assert.equal(collections.length, 0);
             done();
        });
      });
    });

    describe('#testDBHasActivityCollectionAfterAddingActivity', function() {
        it('should return 1 collection', function(done) {
        
            var activityRepository = ActivityRepository();
            activityRepository.init(db);

            var done2 = ()=>{
                db.collections(function(err, collections) {
                    assert.equal(null, err);
                    assert.equal(collections.length, 1);
                    done();
                });
            }

            activityRepository.addActivity({test:"testDoc"}, done2)   
        });
      });

      describe('#testDBHasActivityAfterAddingActivity', function() {
        it('should return 1 collection', function(done) {
        
            var activityRepository = ActivityRepository();
            activityRepository.init(db);

            var done2 =()=>{ 
                db.collection("activities", {strict:true}, function(err, col) {
                    col.find({}).toArray().then(function(docs){
                        assert.equal(docs.length, 1);
                        done();
                    })
                });
            }

            activityRepository.addActivity({test:"testDoc"}, done2)   
        });
      });
})



