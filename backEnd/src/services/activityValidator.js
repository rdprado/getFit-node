
var ActivityValidator = function() {

    function isValidActivity(activity) {
        return isValidTitle(activity.getTitle()) && isValidDate(activity.getDate());
    };
    
    function isValidTitle(title) {
        return title !== "" && title != null;
    };
    
    function isValidDate(date) {
        if ( Object.prototype.toString.call(date) === "[object Date]" ) {
            // it is a date
            if ( isNaN( date.getTime() ) ) {  // d.valueOf() could also work
              return false;
            }
            else {
              return true;
            }
          }
          else {
            return false;
          }
    };

    return {
        isValidActivity: isValidActivity,
        isValidDate: isValidDate,
        isValidTitle: isValidTitle
    }
}

module.exports  = ActivityValidator;