var WorkoutRepository = function(db){
    this.db = db;
    this.workoutsCollectionName = 'workouts';
}

WorkoutRepository.prototype.addWorkout = function(workout) {
    var db = this.db;
    var wktColName = this.workoutsCollectionName;

    db.collection(wktColName, {strict:true}, function(err, col) {
        if(err){
            db.createCollection(wktColName, function(err, result) {
                if(err){
                    console.log("could not create workouts collection" + err);
                } else {
                    col.insertOne({date: "test", title: "title", comments: "comments"}, function (err, r) {
                        console.log('db inserterd: ' + r.insertedCount);
                    });
                }
            });
        } else { 
            db.collection(wktColName, {strict:true}, function(err, col1) {
                if(err){
                    console.log("error inserting: " + err)
                } else {
                    col1.insertOne({date: "test", title: "title", comments: "comments"}, function (err, r) {
                        console.log('db inserterd: ' + r.insertedCount);
                    });
                }
            });
        }

    });
};

var test = require('assert');

WorkoutRepository.prototype.fetchWorkouts = function(cb) {

    var db = this.db;
    var wktColName = this.workoutsCollectionName;

    // var wks = [];

    var col = db.collection(wktColName);
    var items = col.find({}).toArray().then(function(result){
        cb(result);
        // result.forEach(function(doc){
        //     console.log(doc);
        //     wks.push(doc);
        // })
    }).catch(function(err){
        console.log(err);
    });
    // console.log(wks);

    // return wks;

    // db.collection((wktColName, {strict:true})).then(function(result){
    //     cb();
    // }).catch(function(err) {
    //     console.log("error fetching" + err);
    // });
}

    // db.collection(wktColName, {strict:true}, function(err, col) {
    //     if(err) {
    //         workouts.documents = [];
    //     } else {
    //         col.find({}).toArray(function(err, docs){
    //
    //             test.equal(2, docs.length);
//
    //             workouts.documents = docs;
    //         });
    //     }
    // });
    //
    //             test.equal(2, workouts.documents);
    // return workouts.documents;
// }


module.exports = WorkoutRepository;
