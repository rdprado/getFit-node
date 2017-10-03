var Activity = function (date, title, comments) {

    // duration in minutes

    //var type, date, title, comments, duration;
    var date, title, comments;

    // function init(Type, DatePerformed, Title, Comments, Duration) {
    //     type = Type;
    //     date = DatePerformed;
    //     title = Title;
    //     comments = Comments;
    //     duration = Duration;
    // };

    function init(DatePerformed, Title, Comments) {
        date = DatePerformed;
        title = Title;
        comments = Comments;
    };

    // function getType() {
    //     return type;
    // };

    function getDate() {
        return date;
    };

    function getTitle() {
        return title;
    };

    function getComments() {
        return comments;
    };

    function toObjLiteral() {
        return {
            date: getDate(), 
            title: getTitle(), 
            comments: getComments()
        }
    }

    // function getDuration() {
    //     return duration;
    // };

    return {
        init: init,
        //getType: getType,
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments,
        toObjLiteral: toObjLiteral
        //getDuration: getDuration
    }
}

module.exports = Activity;
