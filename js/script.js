var alarm_time = undefined;


var padfield = function(f) {
	return (f<10)? "0"+f : f;
};

var say = function(q) {
  console.log(q);
};

var audio = new Audio('sound/surroundings.mp3');


var day = function(day) {
	var day = day;
	switch (day) {
		case 0:
			day = 'Sun';
			return day;
			break;
	  case 1:
	    day = 'Mon';
			return day;
	    break;
	  case 2:
			day = 'Tue';
			return day;
			break;
	  case 3:
			day = 'Wed';
			return day;
			break;
	  case 4:
			day = 'Thu';
			return day;
			break;
		case 5:
			day = 'Fri';
			return day;
			break;
		case 6:
			day = 'Sat';
			return day;
			break;
		default:
			day = 'undefined';
			return day;
			break;
	}
}

var showCurrentTime = function() {
  var today = new Date();
  var s = today.getSeconds();
	var time = padfield(today.getHours()) + ":" + padfield(today.getMinutes());
	var d = today.getDate();
  var w = today.getDay();
  document.getElementById('time').innerHTML = time;
	document.getElementById('date').innerHTML = d + " " + day(w);
  if (typeof alarm_time != 'undefined') { //if alarm is set
    if (time == alarm_time) {
      clearInterval(timer);
      say("q");
			audio.play();
    }
  }

  var timer = setInterval(function() {showCurrentTime()}, 1000)
};


var setAlarm = function(time) {
  var html = '<li class="alarm">' + time +
	            	'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
                	 'width="612px" height="612px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">' +
                			'<path id="del" d="M387.128,170.748L306,251.915l-81.128-81.167l-54.124,54.124L251.915,306l-81.128,81.128l54.085,54.086L306,360.086' +
                				'l81.128,81.128l54.086-54.086L360.086,306l81.128-81.128L387.128,170.748z M522.38,89.62' +
                				'c-119.493-119.493-313.267-119.493-432.76,0c-119.493,119.493-119.493,313.267,0,432.76' +
                				'c119.493,119.493,313.267,119.493,432.76,0C641.873,402.888,641.873,209.113,522.38,89.62z M468.295,468.295' +
                				'c-89.62,89.619-234.932,89.619-324.551,0c-89.62-89.62-89.62-234.932,0-324.551c89.62-89.62,234.931-89.62,324.551,0' +
                				'C557.914,233.363,557.914,378.637,468.295,468.295z"/>' +
	                '</svg>' +
	            '</li>'
  $("#alarms").append(html);
}

function showModal() {
	$('.alarm_modal').toggleClass('active');
}

$(document).ready(function() {
  showCurrentTime();

	$('#addalarm').click(function() {
		showModal();
	});

  $('#alarmform').submit(function(event) {
    alarm_time = $(event.target).find('#alarm_time').val();
		if (alarm_time !== "") {
			setAlarm(alarm_time);
			showModal();
		}
    return false;
  });
});
