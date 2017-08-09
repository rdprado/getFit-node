var Activity = function (date, title, comments) {

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

    return {
        init: init,
        getDate: getDate,
        getTitle: getTitle,
        getComments: getComments
    }
}

module.exports = Activity;
