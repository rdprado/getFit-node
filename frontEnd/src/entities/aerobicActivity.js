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
	
	publicAPI.initAerobicActivity = initAerobicActivity;
    publicAPI.getDistance = getDistance;
		
	return publicAPI;
	
}