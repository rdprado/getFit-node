var WorkoutRepository = function(db){
    this.db = db;
}

WorkoutRepository.prototype.addWorkout = function(workout) {
    console.log(workout.getTitle());
    console.log('repository added workout!')
}

module.exports = WorkoutRepository;
