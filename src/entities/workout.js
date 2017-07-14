var Workout = function (date, title, comments) {

    var datePerformed, workoutTitle, workoutComments;

    function doInit(date, title, comments) {
        datePerformed = date;
        workoutTitle = title;
        workoutComments = comments;
    };

    function doGetDate() {
        return datePerformed;
    };

    function doGetTitle() {
        return workoutTitle;
    };

    function doGetComments() {
        return workoutComments;
    };

    var publicAPI = {
        init: doInit,
        getDate: doGetDate,
        getTitle: doGetTitle,
        getComments: doGetComments
    }

    return publicAPI;
}

module.exports = Workout;
