var Activity = require('./activity');

var AerobicActivity = function () {

	var publicAPI = {};
	publicAPI.__proto__ = Activity();

    var distance = 0;

    function initAerobicActivity(Date_, Title, Comments, Distance) {
		publicAPI.init(Date_, Title, Comments);
        distance = Distance;
    };

    function getDistance() {
        return distance;
    };
	
	function toObjLiteral() {
        return {ISOStringDate: publicAPI.getDate().toISOString(), title: publicAPI.getTitle(), comments: publicAPI.getComments(), distance: getDistance()};
    }
	
	publicAPI.initAerobicActivity = initAerobicActivity;
    publicAPI.getDistance = getDistance;
	publicAPI.toObjLiteral = toObjLiteral;
		
	return publicAPI;
	
}

module.exports = AerobicActivity;
