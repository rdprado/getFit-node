var Workout = function (ID, date, title, comments) {

    var ID, datePerformed, workoutTitle, workoutComments;

    function doInit(id, date, title, comments) {
        ID = id;
        datePerformed = date;
        workoutTitle = title;
        workoutComments = comments;
    };

    function doGetID() {
        return ID;
    }

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
        getID: doGetID,
        getDate: doGetDate,
        getTitle: doGetTitle,
        getComments: doGetComments
    }

    return publicAPI;
}

module.exports = Workout;
