var Activity = require('./activity');

var WeightsActivity = function () {

	var publicAPI = {};
	publicAPI.__proto__ = Activity();
	
	var sets = 0;
	var reps = 0;

    function initWeightsActivity(Date_, Title, Comments, Sets, Reps) {
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
	
	function toObjLiteral() {
        return {ISOStringDate: publicAPI.getDate().toISOString(), title: publicAPI.getTitle(), comments: publicAPI.getComments(), sets: getSets(), reps: getReps()};
    }
	
	publicAPI.initWeightsActivity = initWeightsActivity;
    publicAPI.getSets = getSets;
	publicAPI.getReps = getReps;
	publicAPI.toObjLiteral = toObjLiteral;
		
	return publicAPI;
	
}

module.exports = WeightsActivity;
