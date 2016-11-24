// debug
var say = function(q) {
  console.log(q);
};

// caсhe html
var	$time = document.getElementById('time'),
		$date = document.getElementById('date'),
		$addAlarmBtn = document.getElementById('addalarm'),
		$alarmsList = document.getElementById('alarms'),
		$alarmForm = document.getElementById('alarmform'),
		$alarmModal = document.querySelector('.alarm_modal'),
    $circle = document.getElementById('circle');

function showModal() {
	$alarmModal.classList.toggle('active');
}

// execute alarm
var audio = new Audio('sound/wakeup.mp3');

var fireAlarm = function() {
	audio.play();
};

// set and remove alarms
var alarms = [];

var setAlarms = function() {
  var date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = parseInt( date.getDate() );
	for (i = 0; i < alarms.length; i++)	{
    // set alarm for tomorrow
    var tomo = false;
    if( alarms[i].split(':')[0] < date.getHours() )
      {tomo = true;}
    else if( alarms[i].split(':')[0] == date.getHours() && alarms[i].split(':')[1] < date.getMinutes() )
      {tomo = true;}
    else if( alarms[i].split(':')[0] == date.getHours() && alarms[i].split(':')[1] == date.getMinutes() && 0 < date.getSeconds() )
      {tomo = true;}
    if( tomo ){day += 1;}
    say(tomo);
		var html = '<li class="alarm">' + alarms[i] +
                '<a href="#" onClick="removeAlarm(' + i + ');">' +
									'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
										 'width="612px" height="612px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">' +
												'<path id="del" d="M387.128,170.748L306,251.915l-81.128-81.167l-54.124,54.124L251.915,306l-81.128,81.128l54.085,54.086L306,360.086' +
													'l81.128,81.128l54.086-54.086L360.086,306l81.128-81.128L387.128,170.748z M522.38,89.62' +
													'c-119.493-119.493-313.267-119.493-432.76,0c-119.493,119.493-119.493,313.267,0,432.76' +
													'c119.493,119.493,313.267,119.493,432.76,0C641.873,402.888,641.873,209.113,522.38,89.62z M468.295,468.295' +
													'c-89.62,89.619-234.932,89.619-324.551,0c-89.62-89.62-89.62-234.932,0-324.551c89.62-89.62,234.931-89.62,324.551,0' +
													'C557.914,233.363,557.914,378.637,468.295,468.295z"/>' +
										'</svg></a>' +
								'</li>';
      var alarmTime = new Date( year, month, day, alarms[i].split(':')[0], alarms[i].split(':')[1], 0, date.getMilliseconds() );
      alarmTime = Math.abs(alarmTime - new Date());
      say(alarmTime);
		  setTimeout(function() {fireAlarm(alarms[i])}, alarmTime);
	};
  $alarmsList.innerHTML += html;
};

function removeAlarm(j) {
  var date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = parseInt( date.getDate() );
  alarms.splice(j, 1);
  var refreshAlarm = '';
  for (i = 0; i < alarms.length; i++)	{
    // set alarm for tomorrow
    var tomo = false;
    if( alarms[i].split(':')[0] < date.getHours() )
      {tomo = true;}
    else if( alarms[i].split(':')[0] == date.getHours() && alarms[i].split(':')[1] < date.getMinutes() )
      {tomo = true;}
    else if( alarms[i].split(':')[0] == date.getHours() && alarms[i].split(':')[1] == date.getMinutes() && 0 < date.getSeconds() )
      {tomo = true;}
    if( tomo ){day += 1;}

    var html = '<li class="alarm">' + alarms[i] +
                '<a href="#" onClick="removeAlarm(' + i + ');">' +
                  '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
                     'width="612px" height="612px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">' +
                        '<path id="del" d="M387.128,170.748L306,251.915l-81.128-81.167l-54.124,54.124L251.915,306l-81.128,81.128l54.085,54.086L306,360.086' +
                          'l81.128,81.128l54.086-54.086L360.086,306l81.128-81.128L387.128,170.748z M522.38,89.62' +
                          'c-119.493-119.493-313.267-119.493-432.76,0c-119.493,119.493-119.493,313.267,0,432.76' +
                          'c119.493,119.493,313.267,119.493,432.76,0C641.873,402.888,641.873,209.113,522.38,89.62z M468.295,468.295' +
                          'c-89.62,89.619-234.932,89.619-324.551,0c-89.62-89.62-89.62-234.932,0-324.551c89.62-89.62,234.931-89.62,324.551,0' +
                          'C557.914,233.363,557.914,378.637,468.295,468.295z"/>' +
                    '</svg></a>' +
                '</li>';
      refreshAlarm += html;
      var alarmTime = new Date( year, month, day, alarms[i].split(':')[0], alarms[i].split(':')[1], 0, date.getMilliseconds() );
      alarmTime = Math.abs(alarmTime - new Date());
      say(alarmTime);
      setTimeout(function() {fireAlarm(alarms[i])}, alarmTime);
  };
  $alarmsList.innerHTML = refreshAlarm;
  audio.pause();
  audio.currentTime = 0;
};

// time and date convertation
var padfield = function(f) {
	return (f<10)? "0"+f : f;
};

var day = function(day) {
	var day = day;
	switch (day) {
		case 0:
			day = 'Sun';
			return day;
	  case 1:
	    day = 'Mon';
			return day;
	  case 2:
			day = 'Tue';
			return day;
	  case 3:
			day = 'Wed';
			return day;
	  case 4:
			day = 'Thu';
			return day;
		case 5:
			day = 'Fri';
			return day;
		case 6:
			day = 'Sat';
			return day;
		default:
			day = 'undefined';
			break;
	}
};

// show current time
var showCurrentTime = function() {
  var today = new Date();
  var s = today.getSeconds();
	var time = padfield(today.getHours()) + ":" + padfield(today.getMinutes());
	var d = today.getDate();
  var w = today.getDay();
  var initialOffset = 1538;
  $circle.style['stroke-dashoffset'] = initialOffset-(s*(initialOffset/60));
  $time.innerHTML = time;
	$date.innerHTML = d + " " + day(w);
};

// event handlers
$addAlarmBtn.onclick = function() {
	showModal();
};

$alarmForm.addEventListener('submit', function(e) {
	e.preventDefault();
  var alarm = document.getElementById('alarm_time').value;
	if (alarm_time != "") {
		alarms.push(alarm);
		setAlarms();
		showModal();
	}
});

setInterval(function() {
  showCurrentTime()
}, 1000);
