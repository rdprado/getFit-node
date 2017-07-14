var Workout = require('../entities/workout')

var WorkoutsUseCaseInteractor = function(workoutRepository) {
    var workoutRepository;

    function doInit(workoutDAO){
        workoutRepository = workoutDAO;
    };

    function doAddWorkout(requestModel){
        console.log("use case workout added");
        var workout = buildWorkoutFromRequest(requestModel);
        workoutRepository.addWorkout(workout, ()=>{});
    };

    function doGetWorkouts(done){
        console.log("workouts use case get")

        // this is redundant
        var cb = function(docs) {
            var workouts = docs;
            done(workouts);
            // but here is where I would call a presenter
        };

        var responseModel = workoutRepository.fetchWorkouts(cb);
        return responseModel; 
    };

    function buildWorkoutFromRequest(requestModel){
        var workout = Workout();
        workout.init(requestModel.date, requestModel.title, requestModel.comments);
        return workout;
    };

    var publicAPI = {
        init: doInit,
        addWorkout: doAddWorkout,
        getWorkouts: doGetWorkouts
    };

    return publicAPI;
};

module.exports = WorkoutsUseCaseInteractor;
