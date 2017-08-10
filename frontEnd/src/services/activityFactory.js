function ActivityFactory() {
	
	function createActivity(params) {
		
		var date = params.hasOwnProperty("ISOStringDate") ? new Date(ISOStringDate) : params.date;
		
		if(params.activityType == "Aerobic") {
			return Activity().init(date, "", "");
			// todo: create new aerobicactivity - create aerobic/anaerobic on front end
		} else {
			return Activity().init(date, "", "");
			// todo: create new aerobicactivity - create aerobic/anaerobic on front end
		}
	}
	
	return {
		createActivity: createActivity
	}
}