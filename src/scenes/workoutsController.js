var WorkoutsController = function WorkoutsController(router, workoutsUseCaseInteractor){
    this.router = router;
    this.makeRouts = makeRouts;
    this.workoutsUseCaseInteractor = workoutsUseCaseInteractor;

    this.makeRouts(this.router, workoutsUseCaseInteractor);
}

function makeRouts(router, workoutsUseCaseInteractor)
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

        workoutsUseCaseInteractor.addWorkout(requestModel);
        res.send('Post page');
    });
}

module.exports = WorkoutsController;
