import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

outputData();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData), 500);

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onInputData(event) {
  let inputData = localStorage.getItem(STORAGE_KEY);
  inputData = inputData ? JSON.parse(inputData) : {};
  inputData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputData));
}

function outputData() {
  let outputData = localStorage.getItem(STORAGE_KEY);
  try {
    if (outputData) {
      outputData = JSON.parse(outputData);
      Object.entries(outputData).forEach(([name, value]) => {
        form.elements[name].value = value;
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}
