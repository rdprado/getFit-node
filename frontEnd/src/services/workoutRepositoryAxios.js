var WorkoutRepositoryAxios = function() {

    var workouts = [];

    function getWorkouts(done) {
        axios.get('http://localhost:3000/workouts').then(response => {
            workouts = response.data;
            done(workouts);
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };

    function addWorkout(workout, done) {
        axios.post('http://localhost:3000/workouts/add', {
            date:workout.getDate(), 
            title:workout.getTitle(), 
            comments: workout.getComments()}).then(response => {
                workouts = response.data;
                done(workouts);
                console.log('sucess');
            }).catch(error => {
                console.log('error');
            });
    };

    function removeWorkout(workoutId, done) {
        axios.post('http://localhost:3000/workouts/remove', {ID: workoutID}).then(response => {
            workouts = response.data;
            done(workouts);
            console.log('sucess');
        }).catch(error => {
            console.log(error);
        });
    };

    return {
        getWorkouts: getWorkouts,
        addWorkout: addWorkout,
        removeWorkout: removeWorkout
    }
}
