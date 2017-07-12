
var Workout = function(x) {
    this.x=x;
};

Workout.prototype.addWorkout = function() {
    console.log("use case workout added");
}


module.exports = Workout;
// var Workout = function (date, title, comments) {
//     this.date = date;
//     this.title = title;
//     this.comments = comments;
// }
//
// Workout.prototype = {
//     getDate: function() {
//         return this.date;
//     },
//     getTitle: function() {
//         return this.title;
//     },
//     getComments: function() {
//         return this.commentsj
//     }
// };
//
module.exports = Workout;
