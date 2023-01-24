// Get document elements we will need.
var currentTime = document.getElementById('current-time');
var currentDayDate = document.getElementById('current-day-date');
var selectHours = document.getElementById('select-hours');
var selectMinutes = document.getElementById('select-minutes');
var selectSeconds = document.getElementById('select-seconds');
var selectAmPm = document.getElementById('select-am-pm');
var setAlarmBtn = document.getElementById('set-alarm-btn');
var alarmList = document.getElementById('alarms-list');

document.addEventListener("DOMContentLoaded", function() {
	// Add dropDown items for time selection
	addDropDownItems(1, 12, selectHours);
	addDropDownItems(0, 59, selectMinutes);
	addDropDownItems(0, 59, selectSeconds);

	// Render current day date & time and refresh after every second.
	renderDayDateTime()
	setInterval(renderDayDateTime, 1000);
});

// Helper fuction for displaying current day
function getDisplayDay(index) {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[index];
}

// Helper fuction for displaying formatted number
function getFormattedNumber(number) {
	return number < 10 ? `0${number}` : number;
}

// Helper fuction for adding dropdown items in for loop
function addDropDownItems(start, end, element) {
	for (let i = start; i <= end; i++) {
		const dropDown = document.createElement("option");
		dropDown.value = getFormattedNumber(i);
		dropDown.innerHTML = getFormattedNumber(i);
		element.appendChild(dropDown);
	}
}

// Helper fuction for rendering current date day and time.
function renderDayDateTime() {
	const current = new Date();

	const day = getDisplayDay(current.getDay());
	const date = getFormattedNumber(current.getDate());
	const month = getFormattedNumber(current.getMonth() + 1);
	const year = current.getFullYear();
	currentDayDate.innerText = `${date}/${month}/${year} - ${day}`;

	displayTime = current.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
	});
	currentTime.innerText = displayTime
}

// Array to store alarms
var alarms = [];
// Add click listener on set alarm button
setAlarmBtn.addEventListener("click", addNewAlarm);

// Helper fuction to read time values and add new alarm
function addNewAlarm(element) {
	// To prevent page from reloading after form submit
	element.preventDefault();
	
	// Read alarm time for alarm Form
	const hourValue = selectHours.value;
	const minuteValue = selectMinutes.value;
	const secondValue = selectSeconds.value;
	const amPmValue = selectAmPm.value.toUpperCase();

	// Converting time to 24 hour format
	const newAlarmTime = `${parseInt(hourValue)}:${minuteValue}:${secondValue} ${amPmValue}`;
	
	const alarm = setInterval(() => {
		let currentTime = new Date();
		currentTime = currentTime.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: true,
		});
		if (newAlarmTime === currentTime) {
			alert("Alarm went off!");
		}
	}, 1000);

	displayNewAlarm(newAlarmTime);
	alarms.push(newAlarmTime)
}

// Display the new alarm set by the user at the bottom of the list
function displayNewAlarm(time) {
	const alarm = document.createElement("div");
	alarm.classList.add("alarm");
	alarm.innerHTML = `
	<div class="alarm-time">${time}</div>
	<button class="delete-alarm-btn">Delete</button>
	`;
	const deleteButton = alarm.getElementsByClassName('delete-alarm-btn')[0];
	deleteButton.addEventListener("click", (e) => { event.target.parentElement.remove(); });

	alarmList.prepend(alarm);
}