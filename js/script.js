
var	$time = document.getElementById('time'),
		$date = document.getElementById('date'),
    $circle = document.getElementById('circle'),
		$addAlarmBtn = document.getElementById('addalarm'),
		$alarmsList = document.getElementById('alarms'),
		$alarmForm = document.getElementById('alarm-form'),
    $plusicon = document.getElementById('addalarm-icon'),
    $setAlarmInput = document.getElementById('alarm-form-time'),
    $removealarmBtn = document.getElementById('removebtn'),
    SetAlarmBtn = document.getElementById('setalarm');


// play alarm sound
var audio = new Audio('sound/wakeup.mp3');

function fireAlarm() {
	audio.play();
};

// set and remove alarms
var alarms = [];

function setAlarms() {
  var date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = parseInt( date.getDate() );
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

    var html = '<li class="alarm">' + '<label class="alarm-time">' + alarms[i] + '</label>'+
                  '<a class="removebtn" onClick="removeAlarm(' + i + ');">' +
                  '</a>' +
                '</li>'
      refreshAlarm += html;
      var alarmTime = new Date( year, month, day, alarms[i].split(':')[0], alarms[i].split(':')[1], 0, date.getMilliseconds() );
      alarmTime = Math.abs(alarmTime - new Date());
		  setTimeout(function() {fireAlarm(alarms[i])}, alarmTime);
	};
  $alarmsList.innerHTML = refreshAlarm;
};

function removeAlarm(j) {
  alarms.splice(j, 1);
  setAlarms();
  audio.pause();
  audio.currentTime = 0;
};

// time and date convertation
function padfield(f) {
	return (f<10)? "0"+f : f;
};

function day(day) {
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
window.requestAnimationFrame = window.requestAnimationFrame
                               || window.mozRequestAnimationFrame
                               || window.webkitRequestAnimationFrame
                               || window.msRequestAnimationFrame
                               || function(f){setTimeout(f, 60)}

function showCurrentTime() {
  var today = new Date();
  var s = today.getSeconds();
	var time = padfield(today.getHours()) + ":" + padfield(today.getMinutes());
	var d = today.getDate();
  var w = today.getDay();
  var initialOffset = 1538;
  $circle.style['stroke-dashoffset'] = initialOffset-(s*(initialOffset/59));
  $time.innerHTML = time;
	$date.innerHTML = d + " " + day(w);
  requestAnimationFrame(showCurrentTime);
};

function toggle(elem) {
   if(elem.style.display == 'none')
      elem.style.display = '';
   else
      elem.style.display = 'none';
}

// event handlers

$addAlarmBtn.onclick = function(event) {
  event.stopPropagation();
  SetAlarmBtn.style.opacity = 0;

  setTimeout(function () {
      toggle($addAlarmBtn);
      toggle($alarmForm);
    }, 300);
}

document.body.onclick = function(e) {
  $addAlarmBtn.style.removeProperty('background');
  $addAlarmBtn.style.removeProperty('opacity');
  $addAlarmBtn.style.display = '';
  $alarmForm.style.display = 'none';
}

$setAlarmInput.onclick = function(event) {
  event.stopPropagation();
  SetAlarmBtn.style.opacity = 1;
}

SetAlarmBtn.onclick = function(event) {
  event.stopPropagation();
  var alarm = $setAlarmInput.value;

  if (alarm != '') {
    alarms.push(alarm);
    setAlarms();
    $addAlarmBtn.style.removeProperty('opacity');
    this.style.opacity = 0;
    setTimeout(function () {
        toggle($alarmForm);
        toggle($addAlarmBtn);
    }, 300);


  }

  $setAlarmInput.value = '';
}

requestAnimationFrame(showCurrentTime);
