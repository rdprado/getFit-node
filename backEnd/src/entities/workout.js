var Workout = function (date, title, comments) {

    var _date, _title, _comments;

    function init(date, title, comments) {
        _date = date;
        _title = title;
        _comments = comments;
    };

    function getDate() {
        return _date;
    };

    function getTitle() {
        return _title;
    };

    function getComments() {
        return _comments;
    };

    function toObjLiteral() {
        return {ISOStringDate: getDate().toISOString(), title: getTitle(), comments: getComments()};
    }

    return {
        init: init,
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments,
        toObjLiteral: toObjLiteral
    }
}

module.exports = Workout;
