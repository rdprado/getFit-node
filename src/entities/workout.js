var Workout = function (date, title, comments) {

    var _date, _title, _comments;

    function doInit(date, title, comments) {
        _date = date;
        _title = title;
        _comments = comments;
    };

    function doGetDate() {
        return _date;
    };

    function doGetTitle() {
        return _title;
    };

    function doGetComments() {
        return _comments;
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
