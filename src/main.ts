import './style.scss';

const number = document.querySelector('#number') as HTMLHeadingElement;
const start = document.querySelector('#start') as HTMLInputElement;
const end = document.querySelector('#end') as HTMLInputElement;
const form = document.querySelector('#inputs') as HTMLFormElement;
const submit = document.querySelector('#submit') as HTMLButtonElement;
const allRandom = document.querySelector('#all-random') as HTMLButtonElement;

let intervalId = 0;

const generateRandomNumber = () => {
	let startingValue = Number(start.value);
	let endingValue = Number(end.value);

	if (startingValue > endingValue) {
		let x = startingValue;
		startingValue = endingValue;
		endingValue = x;

		start.value = startingValue.toString();
		end.value = endingValue.toString();
	}

	const randomNumber =
		Math.floor(Math.random() * (Number(endingValue) - Number(startingValue) + 1)) +
		Number(startingValue);
	let increaseOrDecreaseBy = Math.abs(
		Math.floor((randomNumber - Number(number.innerText)) / 30)
	);
	if (increaseOrDecreaseBy < 4 && randomNumber - Number(number.innerText) < 60)
		increaseOrDecreaseBy = 2;

	clearInterval(intervalId); // Clearing the previous interval

	let displayedNumber;
	intervalId = setInterval(() => {
		displayedNumber = Number(number.innerText);

		if (displayedNumber < randomNumber) {
			if (displayedNumber + increaseOrDecreaseBy > randomNumber) {
				number.innerText = String(randomNumber); // Setting the displayed number to the random number
				return;
			}

			number.innerText = String(displayedNumber + increaseOrDecreaseBy); // else increasing the displayed number
		}

		if (displayedNumber > randomNumber) {
			if (displayedNumber - increaseOrDecreaseBy < randomNumber) {
				number.innerText = String(randomNumber); // Setting the displayed number to the random number
				return;
			}

			number.innerText = String(displayedNumber - increaseOrDecreaseBy); // else decreasing the displayed number
		}

		if (displayedNumber === randomNumber) clearInterval(intervalId); // Stop the interval when the displayed number is equal to the random number
	}, 22);
};

// Adding Submit handler on the form
form.onsubmit = (event) => {
	event.preventDefault();
	console.log(event);

	generateRandomNumber();
};

// Adding the click handler on the #submit button
submit.onclick = () => {
	generateRandomNumber();
};

// Adding the click handler on the #all-random button
allRandom.onclick = () => {
	let startingValue = Math.floor(Math.random() * 100);
	let endingValue = Math.floor(Math.random() * 100);
	if (startingValue > endingValue) {
		let x = startingValue;
		startingValue = endingValue;
		endingValue = x;
	}

	start.value = startingValue.toString();
	end.value = endingValue.toString();

	setTimeout(() => generateRandomNumber(), 150);
};

// On initial load set the values and renegrate a random value
window.onload = () => {
	number.innerText = '0';
	start.value = '0';
	end.value = '99';

	setTimeout(() => generateRandomNumber(), 550);
};
