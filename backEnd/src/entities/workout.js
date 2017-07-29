var Workout = function (ID, date, title, comments) {

    var ID, datePerformed, workoutTitle, workoutComments;

    function init(id, date, title, comments) {
        ID = id;
        datePerformed = date;
        workoutTitle = title;
        workoutComments = comments;
    };

    function getID() {
        return ID;
    }

    function getDate() {
        return datePerformed;
    };

    function getTitle() {
        return workoutTitle;
    };

    function getComments() {
        return workoutComments;
    };

    return {
        init: init,
        getID: getID,
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments
    }
}

module.exports = Workout;
