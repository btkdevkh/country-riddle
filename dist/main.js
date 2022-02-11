"use strict";
// DOM Elements
const h1 = document.querySelector('h1');
const flagDiv = document.getElementById('flag');
const btnsDiv = document.getElementById('btns');
const resultDiv = document.getElementById('result');
let API_URL = 'https://restcountries.com/v2/all';
const countries = [];
let randomCountry;
// Logics
const loadCountries = () => {
    fetch(API_URL)
        .then(res => {
        if (!res.ok)
            throw { msg: "Could not get the datas" };
        return res.json();
    })
        .then(datas_countries => {
        startApp(datas_countries);
    })
        .catch(err => {
        console.log(err);
        h1.style.color = 'red';
        h1.textContent = err.msg;
    });
};
const startApp = (countries_in) => {
    for (let c of countries_in) {
        const countryFormat = {
            name: c.translations.fr,
            flag: c.flag
        };
        countries.push(countryFormat);
    }
    restartApp();
};
const restartApp = () => {
    randomCountry = getRandomCountry(countries);
    flagDiv.innerHTML = `
    <hr>
    <img class="w-100" src="${randomCountry.flag}" />
    <hr>
  `;
    const correct = randomCountry.name;
    const notCorrect_1 = getRandomCountry(countries).name;
    const notCorrect_2 = getRandomCountry(countries).name;
    const notCorrect_3 = getRandomCountry(countries).name;
    const resRandom = [correct, notCorrect_1, notCorrect_2, notCorrect_3];
    const shuffledRes = resRandom.sort((a, b) => 0.5 - Math.random());
    btnsDiv.innerHTML = generateBtns(shuffledRes);
};
const generateBtns = (tab) => {
    resultDiv.innerHTML = "";
    let btnsHtml = "";
    for (let answer of tab) {
        btnsHtml += `
      <button class="btn btn-primary" onClick="handleAnswer('${answer}')">${answer}</button>
    `;
    }
    return btnsHtml;
};
const handleAnswer = (answer_in) => {
    if (answer_in === randomCountry.name) {
        resultDiv.innerHTML = `
      <h5 class="text-success">Bravo !</h5>
      <button class="btn btn-success" onClick="restartApp()">Replay</button>
    `;
    }
    else {
        resultDiv.innerHTML = `
      <h5 class="text-danger">Sorry, Try again !</h5>
    `;
    }
};
const getRandomCountry = (countries_in) => {
    const idx = Math.floor(Math.random() * countries_in.length);
    return countries_in[idx];
};
// Events
document.addEventListener('DOMContentLoaded', () => loadCountries());
//# sourceMappingURL=main.js.map