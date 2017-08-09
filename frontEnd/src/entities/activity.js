var Activity = function () {

    var datePerformed, activityTitle, activityComments;

    function init(date, title, comments) {
        datePerformed = date;
        activityTitle = title;
        activityComments = comments;
    };

    function getDate() {
        return datePerformed;
    };

    function getTitle() {
        return activityTitle;
    };

    function getComments() {
        return activityComments;
    };

    function toObjLiteral() {
        return {ISOStringDate: getDate().toISOString(), title: getTitle(), comments: getComments()};
    }

    return {
        init: init,
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments,
        toObjLiteral, toObjLiteral
    }
}