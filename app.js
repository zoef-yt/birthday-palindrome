const dateInput = document.getElementById("date");
const check = document.getElementById("check");
const output = document.querySelector(".output");
// check.addEventListener("click");

function reverseString(str) {
	return str.split("").reverse().join("");
}

function isThisPalindrome(str) {
	return str === reverseString(str);
}
function convertDateToString(date) {
	var dateString = { day: "", month: "", year: "" };
	if (date.day < 10) {
		dateString.day = "0" + date.day;
	} else {
		dateString.day = date.day;
	}
	if (date.month < 10) {
		dateString.month = "0" + date.month;
	} else {
		dateString.month = date.month;
	}
	dateString.year = date.year.toString();
	return dateString;
}

function checkAllDataFormats(date) {
	var dateString = convertDateToString(date);
	var DDMMYYYY = dateString.day + dateString.month + dateString.year;
	var MMDDYYYY = dateString.month + dateString.day + dateString.year;
	var YYYYMMDD = dateString.year + dateString.month + dateString.day;
	var DDMMYY = dateString.day + dateString.month + dateString.year.substring(-2);
	var MMDDYY = dateString.month + dateString.day + dateString.year.substring(-2);
	var YYMMDD = dateString.year.substring(2) + dateString.month + dateString.day;
	return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];
}
function checkPalindromeForAllDateFormats(date) {
	var dateFormats = checkAllDataFormats(date);
	var isPalindrome = false;
	var arrayOfPalindromes = [];
	for (var i = 0; i < dateFormats.length; i++) {
		if (isThisPalindrome(dateFormats[i])) {
			isPalindrome = true;
			break;
		}
		arrayOfPalindromes.push(isPalindrome);
	}
	return isPalindrome;
}

isLeapYear = function (year) {
	if (year % 4 == 0) {
		if (year % 100 == 0) {
			if (year % 400 == 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	} else {
		return false;
	}
};

function getNextDate(date) {
	var day = date.day + 1;
	var month = date.month;
	var year = date.year;
	var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (month == 2) {
		if (isLeapYear(year)) {
			if (day > 29) {
				day = 1;
				month++;
			}
		} else {
			if (day > 28) {
				day = 1;
				month++;
			}
		}
	} else {
		if (day > monthDays[month - 1]) {
			day = 1;
			month++;
		}
	}
	if (month > 12) {
		month = 1;
		year++;
	}
	return { day: day, month: month, year: year };
}

function getNextPalindromeDate(date) {
	var nextDate = getNextDate(date);
	var counter = 0;
	while (true) {
		counter++;
		if (checkPalindromeForAllDateFormats(nextDate)) {
			break;
		}
		nextDate = getNextDate(nextDate);
	}
	return { counter: counter, date: nextDate };
}

function checkForPalindrome() {
	var birthdayDate = dateInput.value;
	if (birthdayDate.length !== 0) {
		var dateArray = birthdayDate.split("-");
		var dateObject = {
			day: Number(dateArray[2]),
			month: Number(dateArray[1]),
			year: Number(dateArray[0]),
		};
		if (checkPalindromeForAllDateFormats(dateObject)) {
			output.innerHTML = "Your birth date is a palindrome";
			output.style.color = "green";
			output.style.fontSize = "20px";
			output.style.fontWeight = "bold";
		} else {
			var nextPalindrome = getNextPalindromeDate(dateObject);
			console.log(nextPalindrome);
			output.innerHTML =
				"Your birth date is not a palindrome. It will come in " +
				nextPalindrome.counter +
				" days on " +
				nextPalindrome.date.day +
				"/" +
				nextPalindrome.date.month +
				"/" +
				nextPalindrome.date.year +
				".";
			output.style.color = "red";
			output.style.fontSize = "20px";
		}
	} else {
		output.style.color = "red";
		output.innerHTML = "Please enter a date";
	}
}
check.addEventListener("click", checkForPalindrome);
