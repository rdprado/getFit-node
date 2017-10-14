var Activity = function (date, title, instructions) {

    // duration in minutes

    //var type, date, title, comments, duration;
    var date, title, instructions, done;

    // function init(Type, DatePerformed, Title, Comments, Duration) {
    //     type = Type;
    //     date = DatePerformed;
    //     title = Title;
    //     comments = Comments;
    //     duration = Duration;
    // };

    function init(DatePerformed, Title, Instructions) {
        date = DatePerformed;
        title = Title;
        instructions = Instructions;
    };

    // function getType() {
    //     return type;
    // };

    function getDate() {
        return date;
    };

    function getTitle() {
        return title;
    };

    function getInstructions() {
        return instructions;
    };

    function getIsDone() {
        return done;
    };

    function markAsDone(){
        done = true;
    }

    function toObjLiteral() {
        return {
            date: getDate(), 
            title: getTitle(), 
            instructions: getInstructions(),
            done: getIsDone()
        }
    }

    // function getDuration() {
    //     return duration;
    // };

    return {
        init: init,
        //getType: getType,
        getDate: getDate,
        getTitle: getTitle,
        getInstructions: getInstructions,
        getIsDone: getIsDone,
        markAsDone: markAsDone,
        toObjLiteral: toObjLiteral
        //getDuration: getDuration
    }
}

module.exports = Activity;
