import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('[data-start]');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondEl = document.querySelector('[data-seconds]');

let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      btn.setAttribute('disabled', 'disabled');
      Notify.failure('Please choose a date in the future', {
        timeout: 2000,
        width: '350px',
      });
    } else {
      btn.removeAttribute('disabled');
      selectedTime = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

btn.addEventListener('click', setTime);
let intervalTime = null;

function setTime() {
  btn.setAttribute('disabled', 'disabled');
  let differenceTime = selectedTime - Date.now();

  intervalTime = setInterval(() => {
    if (differenceTime < 1000) {
      clearInterval(intervalTime);
      return;
    }
    differenceTime -= 1000;
    addDataValue(convertMs(differenceTime));
  }, 1000);
}

function addDataValue({ days, hours, minutes, seconds }) {
  dayEl.textContent = days;
  hourEl.textContent = hours;
  minuteEl.textContent = minutes;
  secondEl.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
