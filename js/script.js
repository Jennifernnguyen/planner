
//CALENDAR
const svgCal = (
	el = document.querySelector("#svgCalendar"), 
	today = new Date()) => {
	if (!el) {
		console.error('Tell us where to put the calendar!');
		return;
	}
	const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
	
	const month = today.getMonth();
	const dayOfMonth = today.getDate();
	const year = today.getFullYear();
	const firstDayOfMonth = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	//capitalized month name
	const displayMonth = MONTHS[month].toUpperCase();
	
	//create array of weekdays in order
	let datesArray = [];
	for (let i = 0; i < daysInMonth; i++) {
		datesArray.push((i + firstDayOfMonth) % 7);
	}

	let displayDates = datesArray;

	//create svg
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	// svg.id = 'svg';
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	);
	svg.setAttribute("viewBox", "0 0 140 140");

	//split weekdays into sub-arrays at 6
	let daysByWeek = [];
	for (var i = 0; i < datesArray.length; i++) {
		if (datesArray[i] == 6) {
			daysByWeek.push(datesArray.slice(0, i + 1));
			datesArray = datesArray.slice(i + 1);
			i = -1;
		}
	}
	daysByWeek.push(datesArray);
	
	let dayOfMonthDisplay = 1;
	
	//loop through the weeks
	for (let week = 0; week < daysByWeek.length; week++) {
		const days = daysByWeek[week];
		//loop through the days in each week
		for (let day = 0; day < days.length; day++) {
			let dayFill = "#cea2d7";
			let dayStroke = "#cea2d7";
			//day box
			const dayBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			dayBox.classList.add("day");
			
			//set a referencable dateTime
			const dateTime = new Date(year, month, dayOfMonthDisplay);
			dayBox.setAttribute('data-datetime', dateTime);
			dayBox.classList.add(DAYS[dateTime.getDay()]);
			
			let dayStroke2;
			//is rect passed in today?
				if (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() == dateTime.getTime()) {
					dayStroke2 = "rgba(255,255,255,1)";
					dayBox.classList.add('today');
				} else {
					dayStroke2 = dayStroke;
				}

			const dayBoxAttrs = {
				x: days[day] * 20,
				y: (week + 1) * 20,
				height: 20,
				width: 20,
				fill: dayFill,
				stroke: dayStroke2,
				"stroke-width": .25
			};
			for (let key in dayBoxAttrs) {
				dayBox.setAttribute(key, dayBoxAttrs[key]);
			}

			//capitalized weekday
			const displayWeekday = DAYS[days[day]].charAt(0).toUpperCase() + DAYS[days[day]].slice(1);
			
			//title of each rect
			const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = `${displayWeekday}, ${displayMonth} ${dayOfMonthDisplay}, ${year}`;
			dayBox.appendChild(title);
			
			//text of each rect
			const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.textContent = dayOfMonthDisplay;
			const textAttrs = {
				x: (days[day] * 20) + 10,
				y: ((week + 1) * 20) + 10,
				"dominant-baseline": "middle",
				fill: "	#674ab3",
				"font-family": "Ubuntu", 
				"font-size": 5,
				"text-anchor": "middle",
				"pointer-events": "none",
				"user-select": "none"
			};
			for (let key in textAttrs) {
				text.setAttribute(key, textAttrs[key]);
			}
			
			//append it all
			svg.appendChild(dayBox);
			svg.appendChild(text);
			
			//increment display date
			dayOfMonthDisplay++;
		}
	}
	
	//month
	const monthDisplay = document.createElementNS("http://www.w3.org/2000/svg",	"text");
	monthDisplay.textContent = `${displayMonth}`;
	monthDisplay.classList.add("month");
	monthDisplay.classList.add(MONTHS[month]);
	let monthTextAttrs = {
		x: "40%",
		y: 10,
		"dominant-baseline": "middle",
		fill: "#674ab3",
		"font-family": "Ubuntu", 
		"font-style": "italic",
		"font-size": 12,
		"text-anchor": "middle",
		"pointer-events": "none",
		"user-select": "none"
		
	};
	
	for (let key in monthTextAttrs) {
		monthDisplay.setAttribute(key, monthTextAttrs[key]);
	}
	svg.appendChild(monthDisplay);

	//year
	const yearDisplay = document.createElementNS("http://www.w3.org/2000/svg","text");
	yearDisplay.textContent = year;
	yearDisplay.classList.add("year");
	let yearTextAttrs = {
		x:"75%",
		y: 10,
		"dominant-baseline": "middle",
		fill: "#674ab3",
		"font-family": "Ubuntu", 
		"font-style": "italic",
		"font-size": 12,
		"text-anchor": "middle",
		"pointer-events": "none",
		"user-select": "none"
	};
	for (let key in yearTextAttrs) {
		yearDisplay.setAttribute(key, yearTextAttrs[key]);
	}
	
	svg.appendChild(yearDisplay);
	el.appendChild(svg);
};
//************************
//That's it. That's all there is to it.
// Use it by pointing it at an element:
// svgCal(document.querySelector("#myElement"));


//use it!
let month = 0;
let today = new Date(new Date().getFullYear(), new Date().getMonth() + month, new Date().getDate());

const currentMonth = () => {
	let target = document.querySelector('#d');
	target.removeChild(target.lastChild);
	svgCal(document.querySelector("#d"));
}
currentMonth();

document.querySelector('.left').addEventListener('click', () => {
	let target = document.querySelector('#d');
	target.removeChild(target.lastChild);
	month--;
	today = new Date(new Date().getFullYear(), new Date().getMonth() + month, 1);
	svgCal(target, today);
});

document.querySelector('.right').addEventListener('click', () => {
	let target = document.querySelector('#d');
	target.removeChild(target.lastChild);
	month++;
	today = new Date(new Date().getFullYear(), new Date().getMonth() + month, 1);
	svgCal(target, today);
});




//HEADER
function display() {
    let today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[today.getMonth()];
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let day = today.getDate();
    
    day = day < 10 ? day = "0" + day : day;
    min = min < 10 ? min = "0" + min : min;
    sec = sec < 10 ? sec = "0" + sec : sec;
    
    if (hour > 12) {
      hour -= 12;
      noon = "PM";
    } else {
      noon = "AM";
    };
    
    hour = hour < 10 ? hour = "0" + hour : hour;
  
    document.querySelector("h1").innerHTML =
      day + " | "
      + month + " "
      + today.getFullYear() + "<br>"
      + hour + ":"
      + min;
  }
  
  setInterval(display, 100);







//TO DO LIST

  // Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");



//Event Listeners 
todoButton.addEventListener("click" ,addTodo);
todoList.addEventListener("click" , deleteCheck);



// Functions

function addTodo( Event ){

    Event.preventDefault(); //Prevent form from submitting
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML ='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to list 
    todoList.appendChild(todoDiv);
    // clear to do input value
    todoInput.value = " ";
}

function deleteCheck (e) {
    const item = e.target;
    // todo delete
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend",function(){
            todo.remove();
            }
        );}
    // checkmark
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}




//NOTES
$("#create").click(function() {
    $(this).before("<textarea></textarea>");
  });

  $("#create").click(function() {
    $(this).before("<section></section>");
  });



  

