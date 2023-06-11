import './style.scss';

const number = document.querySelector('#number') as HTMLHeadingElement;
const start = document.querySelector('#start') as HTMLInputElement;
const end = document.querySelector('#end') as HTMLInputElement;
const button = document.querySelector('#generate-button') as HTMLButtonElement;
const form = document.querySelector('#inputs') as HTMLFormElement;


let intervalId = 0;

const generateRandomNumber = (event: (SubmitEvent | null)) => {
    event?.preventDefault();

    let startingValue = Number(start.value);
    let endingValue = Number(end.value);

    if (startingValue > endingValue) {
        let x = startingValue;
        startingValue = endingValue;
        endingValue = x;

        start.value = startingValue.toString();
        end.value = endingValue.toString();
    }

    const randomNumber = Math.floor(Math.random() * (Number(endingValue) - Number(startingValue) + 1)) + Number(startingValue);
    let increaseOrDecreaseBy = Math.abs(Math.floor((randomNumber - Number(number.innerText)) / 30));
    if (increaseOrDecreaseBy < 4 && ((randomNumber - Number(number.innerText)) < 60))
        increaseOrDecreaseBy = 2;

    clearInterval(intervalId);  // Clearing the previous interval

    let displayedNumber;
    intervalId = setInterval(() => {
        displayedNumber = Number(number.innerText);

        if (displayedNumber < randomNumber) {
            if (displayedNumber + increaseOrDecreaseBy > randomNumber) {
                number.innerText = String(randomNumber);  // Setting the displayed number to the random number
                return;
            }

            number.innerText = String(displayedNumber + increaseOrDecreaseBy);  // else increasing the displayed number
        }

        if (displayedNumber > randomNumber) {
            if (displayedNumber - increaseOrDecreaseBy < randomNumber) {
                number.innerText = String(randomNumber);  // Setting the displayed number to the random number
                return;
            }

            number.innerText = String(displayedNumber - increaseOrDecreaseBy);  // else decreasing the displayed number
        }

        if (displayedNumber === randomNumber)
            clearInterval(intervalId);  // Stop the interval when the displayed number is equal to the random number

    }, 22);
}

button.onclick = () => generateRandomNumber(null);
form.onsubmit = (e) => generateRandomNumber(e);


window.onload = () => {
    number.innerText = '0';
    start.value = '0';
    end.value = '99';

    setTimeout(() => {
        generateRandomNumber(null);
    }, 470);


    /** Radius */
    const container = document.querySelector('.container') as HTMLDivElement;

    function getParameterByName(name: string, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const type = getParameterByName('type');
    let radius = getParameterByName('radius') || '0.2';

    if (isNaN(parseFloat(radius)))
        radius = '0';
    else
        radius = (parseFloat(radius)).toString();

    if (type === 'none' || !type) {
        container.style.setProperty('--_bdrs', '0');
    }

    if (type === 'some') {
        container.style.setProperty('--_bdrs', `${radius.toString()}rem`);
        container.style.setProperty('--_top-bottom-bdrs', '0');
    }

    if (type === 'all') {
        container.style.setProperty('--_bdrs', `${radius.toString()}rem`);
        container.style.setProperty('--_top-bottom-bdrs', `${radius.toString()}rem`);
    }
}
