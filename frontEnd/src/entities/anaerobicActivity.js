var AnaerobicActivity = function () {

	var publicAPI = {};
	publicAPI.__proto__ = Activity();
	
	var sets = 0;
	var reps = 0;

    function initAnaerobicActivity(Date_, Title, Comments, Sets, Reps) {
		publicAPI.init(Date_, Title, Comments);
        sets = Sets;
		reps = Reps;
    }

    function getSets() {
        return sets;
    }
	
	function getReps() {
		return reps;
    }
	
	publicAPI.initAnaerobicActivity = initAnaerobicActivity;
    publicAPI.getSets = getSets;
	publicAPI.getReps = getReps;
		
	return publicAPI;
	
}
