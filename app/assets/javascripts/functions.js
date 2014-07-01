/**
 * Creates an alert at the top of the frame. 
 * @param {Object} alertP
 * 	type - success, error, warning, info
 *  msg - The text to be out putted
 *  timeout - The time till the alert fades out.
 */
function createAlert(alertP){
	if(alertP.type === undefined) alert("createAlert - param: 'type' cannot be undefined.");
	if(alertP.msg === undefined) alert("createAlert - param: 'msg' cannot be undefined.");
	$(".alert-box.top").remove();
	var time = (alertP.timeout === undefined) ? 2000 : alertP.timeout;
	var alert = $("<div />", {"class":"alert-box top "+alertP.type+" radius bxsh-l pos-a z-500 mt-10", "html": alertP.msg}); 
	$("body").prepend(alert);
	$(alert).delay(time).fadeOut(300);
}
