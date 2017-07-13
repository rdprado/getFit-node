var WorkoutController = function WorkoutController(router, workoutUseCaseInteractor){
    this.router = router;
    this.makeRouts = makeRouts;
    this.workoutUseCaseInteractor = workoutUseCaseInteractor;

    this.makeRouts(this.router, workoutUseCaseInteractor);
}

function makeRouts(router, workoutUseCaseInteractor)
{
    router.get('/workouts', function(req, res, next) {
        res.render('workouts', {
            workoutName:'Free Workout'
        });
    });

    router.post('/workouts', function(req, res, next) {
        var requestModel = {
            date: Date.now,
            title: "Running",
            comments: "easy"
        }

        workoutUseCaseInteractor.addWorkout(requestModel);
        res.send('Post page');
    });
}

module.exports = WorkoutController;
