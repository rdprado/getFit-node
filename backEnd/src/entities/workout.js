var Workout = function (ID, date, title, comments) {

    var _ID, _date, _title, _comments;

    function init(id, date, title, comments) {
        _ID = id;
        _date = date;
        _title = title;
        _comments = comments;
    };

    function getID() {
        return _ID;
    }

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
        getID: getID,
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments,
        toObjLiteral: toObjLiteral
    }
}

module.exports = Workout;
