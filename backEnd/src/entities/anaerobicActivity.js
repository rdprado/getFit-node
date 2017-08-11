var Activity = require('./activity');

var AnaerobicActivity = function () {

    var publicAPI = {};
    publicAPI.__proto__ = Activity();

    var sets = 0;
    var reps = 0;
    var weight = 0;

    function initAnaerobicActivity(Date_, Title, Comments, Duration, Sets, Reps, Weight) {
        publicAPI.init(Date_, Title, Comments, Duration);
        sets = Sets;
        reps = Reps;
        weight = Weight;
    }

    function getSets() {
        return sets;
    }

    function getReps() {
        return reps;
    }

    function getWeight() {
        return weight;
    }

    function toObjLiteral() {
        return {
            name: publicAPI.getName(), 
            date: publicAPI.getDate(), 
            title: publicAPI.getTitle(), 
            comments: publicAPI.getComments(),
            duration: publicAPI.getDuration(), 
            sets: getSets(), 
            reps: getReps(), 
            weight: getWeight()}
    }

    publicAPI.initAnaerobicActivity = initAnaerobicActivity;
    publicAPI.getSets = getSets;
    publicAPI.getReps = getReps;
    publicAPI.getWeight = getWeight;
    publicAPI.toObjLiteral = toObjLiteral;

    return publicAPI;

}

module.exports = AnaerobicActivity;
