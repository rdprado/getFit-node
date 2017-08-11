var Activity = require('./activity');

var AerobicActivity = function () {

    var publicAPI = {};
    publicAPI.__proto__ = Activity();

    var distance = 0;

    function initAerobicActivity(Name, Date_, Title, Comments, Duration, Distance) {
        publicAPI.init(Name, Date_, Title, Comments, Duration);
        distance = Distance;
    };

    function getDistance() {
        return distance;
    };

    function toObjLiteral() {
        return {
            name: publicAPI.getName(), 
            date: publicAPI.getDate(), 
            title: publicAPI.getTitle(), 
            comments: publicAPI.getComments(),
            duration: publicAPI.getDuration(), 
            distance: getDistance()}
    }

    publicAPI.initAerobicActivity = initAerobicActivity;
    publicAPI.getDistance = getDistance;
    publicAPI.toObjLiteral = toObjLiteral;

    return publicAPI;

}

module.exports = AerobicActivity;
