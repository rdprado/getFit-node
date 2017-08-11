var Activity = function (date, title, comments) {

    var name, date, title, comments, duration;

    function init(Name, DatePerformed, Title, Comments, Duration) {
        name = Name;
        date = DatePerformed;
        title = Title;
        comments = Comments;
        duration = Duration;
    };

    function getName() {
        return name;
    };

    function getDate() {
        return date;
    };

    function getTitle() {
        return title;
    };

    function getComments() {
        return comments;
    };

    function getDuration() {
        return duration;
    };

    return {
        init: init,
        getName: getName,
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments,
        getDuration: getDuration
    }
}

module.exports = Activity;
