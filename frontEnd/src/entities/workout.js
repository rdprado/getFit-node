var Workout = function () {

    var datePerformed, workoutTitle, workoutComments;

    function init(date, title, comments) {
        datePerformed = date;
        workoutTitle = title;
        workoutComments = comments;
    };

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
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments
    }
}
