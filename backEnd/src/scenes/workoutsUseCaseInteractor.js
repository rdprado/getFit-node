var Workout = require('../entities/workout')

var WorkoutsUseCaseInteractor = function() {
    var workoutRepository;
    var workoutsUseCaseInteractorOutput;

    function init(workoutsRepository, useCaseInteractorOutput){
        workoutRepository = workoutsRepository;
        workoutsUseCaseInteractorOutput = useCaseInteractorOutput;
    };

    function addWorkout(requestModel, done){
        workoutRepository.addWorkout(reqToWkt(requestModel), done);
    };
	
	function getWorkoutTypes(done) {
		
		var cb = function(workoutTypes) {
			var responseModel = {workoutTypes: workoutTypes};
			done(workoutsUseCaseInteractorOutput.formatWorkoutTypes(responseModel))
		}
		
		workoutRepository.fetchWorkoutTypes(cb);
	}
	
    function getWorkouts(done) {
        var cb = function(workouts) {
            var responseModel = {workouts: workouts.map(wktToRes)}
            done(workoutsUseCaseInteractorOutput.formatGetWorkouts(responseModel));
        };

        workoutRepository.fetchWorkouts(cb);
    };

    function removeWorkout(requestModel, done){
        workoutRepository.removeWorkout(new Date(requestModel.ISOStringDate), requestModel.title, done)
    }

	
	function reqToWkt(req) {
        var workout = Workout();
        workout.init(new Date(req.ISOStringDate), req.title, req.comments);
		
        return workout;
    };
	
    function wktToRes(wkt) {
        return wkt.toObjLiteral();
    }


    return {
        init: init,
        addWorkout: addWorkout,
		getWorkoutTypes: getWorkoutTypes,
        getWorkouts: getWorkouts,
        removeWorkout: removeWorkout
    };
};

module.exports = WorkoutsUseCaseInteractor;
