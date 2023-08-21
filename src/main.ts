import './style.scss';

const numberElement = document.querySelector('#number') as HTMLHeadingElement;
const start = document.querySelector('#start') as HTMLInputElement;
const end = document.querySelector('#end') as HTMLInputElement;
const form = document.querySelector('#inputs') as HTMLFormElement;
const submit = document.querySelector('#submit') as HTMLButtonElement;
const allRandom = document.querySelector('#all-random') as HTMLButtonElement;

let intervalId = 0;

const generateRandomNumber = (startingValue: number, endingValue: number) => {
	const randomNumber =
		Math.floor(Math.random() * (endingValue - startingValue + 1)) + startingValue;
	let increaseOrDecreaseBy = Math.abs(
		Math.floor((randomNumber - Number(numberElement.innerText)) / 30)
	);
	if (increaseOrDecreaseBy < 4 && randomNumber - Number(numberElement.innerText) < 60)
		increaseOrDecreaseBy = 2;

	clearInterval(intervalId); // Clearing the previous interval

	let displayedNumber;
	intervalId = setInterval(() => {
		displayedNumber = Number(numberElement.innerText);

		if (displayedNumber < randomNumber) {
			if (displayedNumber + increaseOrDecreaseBy > randomNumber) {
				numberElement.innerText = String(randomNumber); // Setting the displayed number to the random number
				return;
			}

			numberElement.innerText = String(displayedNumber + increaseOrDecreaseBy); // else increasing the displayed number
		}

		if (displayedNumber > randomNumber) {
			if (displayedNumber - increaseOrDecreaseBy < randomNumber) {
				numberElement.innerText = String(randomNumber); // Setting the displayed number to the random number
				return;
			}

			numberElement.innerText = String(displayedNumber - increaseOrDecreaseBy); // else decreasing the displayed number
		}

		if (displayedNumber === randomNumber) clearInterval(intervalId); // Stop the interval when the displayed number is equal to the random number
	}, 25);
};

// Sets the starting and ending value in the local storage
const setLocalStorage = (startingValue: number, endingValue: number) => {
	localStorage.setItem('startingValue', startingValue.toString());
	localStorage.setItem('endingValue', endingValue.toString());
};

// Sets the correct order of the starting and ending value
const setCorrectOrder = (s: number, e: number) => {
	let startingValue = s,
		endingValue = e;

	if (startingValue > endingValue) {
		let temp = startingValue;
		startingValue = endingValue;
		endingValue = temp;
	}

	start.value = startingValue.toString();
	end.value = endingValue.toString();

	return [startingValue, endingValue];
};

// Submit handler whe user clicks on the submit button or presses enter
const submitHandler = () => {
	const [correctStartingValue, correctEndingValue] = setCorrectOrder(
		Number(start.value),
		Number(end.value)
	);
	setLocalStorage(correctStartingValue, correctEndingValue);
	generateRandomNumber(correctStartingValue, correctEndingValue);
};

// Adding Submit handler on the form
form.onsubmit = (event) => {
	event.preventDefault();

	submitHandler();
};

// Adding the click handler on the #submit button
submit.onclick = submitHandler;

// Adding the click handler on the #all-random button
allRandom.onclick = () => {
	const [correctStartingValue, correctEndingValue] = setCorrectOrder(
		Math.floor(Math.random() * 100),
		Math.floor(Math.random() * 100)
	);

	setTimeout(() => generateRandomNumber(correctStartingValue, correctEndingValue), 150);
};

// On initial load set the values and renegrate a random value
window.onload = () => {
	let startingValue = localStorage.getItem('startingValue') || '0';
	let endingValue = localStorage.getItem('endingValue') || '99';

	numberElement.innerText = '0';
	const [correctStartingValue, correctEndingValue] = setCorrectOrder(
		Number(startingValue),
		Number(endingValue)
	);

	setTimeout(() => generateRandomNumber(correctStartingValue, correctEndingValue), 550);
};
