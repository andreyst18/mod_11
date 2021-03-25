const startModal = document.getElementById('startModal'); //стартовое мод. окно
const minModal = document.getElementById('minModal'); //мод. окно ввода мин. значения
const maxModal = document.getElementById('maxModal'); //мод. окно ввода макс. значения
const makeNumber = document.getElementById('makeNumber'); //мод. окно загадывания числа
const wrongRange = document.getElementById('wrongRange'); //мод. окно при неверных данных
const gameField = document.getElementById('gameField'); //окно игры
const defaultMinValue = 0;
const defaultMaxValue = 100;

let minValue; //мин. значение
let maxValue; //макс. значение
let answerNumber; //вариант отгадываемого числа
let orderNumber; //номер вопроса
let gameRun; //игра запущена
let orderNumberField; 
let answerField;
let isMaxLessMin = false;


window.onload = function() {
    startModal.style.display = 'flex';
}

document.getElementById('btnStart').onclick = function() {
    startModal.style.display = 'none';
    minModal.style.display = 'flex';
}

document.getElementById('confirmMin').onclick = enterMinValue;

document.getElementById('confirmMax').onclick = enterMaxValue;

document.getElementById('confirmReady').onclick = function() {
    makeNumber.style.display = 'none';
    gameField.style.display = 'flex';
    startGame();
}


//Кн. "Заново"
document.getElementById('btnRetry').addEventListener('click', function () {
    gameField.style.display = 'none';
    minModal.style.display = 'flex';
    document.getElementById('confirmMin').onclick;
})

//Кн. "Больше"
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue >= maxValue){
            let answerPhrase = getFailureReaction();
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getQuestion();
        }
    }
})

//Кн. "Меньше"
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue >= maxValue ) {
            answerPhrase = getFailureReaction();
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getQuestion();
        }
    }
})


//Кн. "Верно"
document.getElementById('btnEqual').addEventListener('click', function () {
    answerField.innerText = getAnswer();
    gameRun = false;
    
})

//Отображение мод. окна при неправильном диапазоне значений
function showWrong() {
    gameField.style.display = 'none';
    wrongRange.style.display = 'flex';
    document.getElementById('confirmWrong').onclick = function() {
        wrongRange.style.display = 'none';
        minModal.style.display = 'flex';
        document.getElementById('confirmMin').onclick;
    }
}

//Отображение мод. окна ввода мин. значения
function enterMinValue() {
    minModal.style.display = 'flex';
    minValue = document.getElementById('minValue').value;
    if (!minValue) {
        minValue = defaultMinValue;
    }
    minModal.style.display = 'none';
    maxModal.style.display = 'flex';
}

//Отображение мод. окна ввода макс. значения
function enterMaxValue() {
    maxValue = document.getElementById('maxValue').value;
    if (!maxValue) {
        maxValue = defaultMaxValue;
    }

    document.getElementById('minValue').value = '';
    document.getElementById('maxValue').value = '';

    checkNaN();
    checkMaxLessMin();
    checkRange();

    maxModal.style.display = 'none';
    
    if (!isMaxLessMin) {
        makeNumber.style.display = 'flex';
        document.getElementById('makeNumberText').innerHTML = `Загадайте любое целое число 
        от ${minValue} до ${maxValue}, а я его угадаю`;
    }
    
}

//Отображение мод. окна для загадывания значения
function makeNumberFunc() {
    gameField.style.display = 'none';
    makeNumber.style.display = 'flex';
}


//Проверка макс. < мин.
function checkMaxLessMin() {
    if (maxValue < minValue) {
        isMaxLessMin = true;
        showWrong();
        while (maxValue < minValue) {
            enterMinValue();
        }
    } else {
        isMaxLessMin = false;
    }
}

function checkRange() {
    minValue = (minValue < -999) ? -999 : minValue;
    minValue = (minValue > 999) ? 999 : minValue;

    maxValue = (maxValue < -999) ? -999 : maxValue;
    maxValue = (maxValue > 999) ? 999 : maxValue;
}

//Проверка на NaN
function checkNaN() {
    minValue = parseInt(minValue);
    minValue = ( isNaN(minValue) ) ? defaultMinValue : minValue;
    maxValue = parseInt(maxValue);
    maxValue = ( isNaN(maxValue) ) ? defaultMaxValue : maxValue;
    
}

//Старт игры, заполнение полей интерфейса
function startGame() {
    gameField.style.display = 'flex';
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField = document.getElementById('orderNumberField');
    answerField = document.getElementById('answerField');
    orderNumberField.innerText = orderNumber;
    answerField.innerText = getQuestion();
}


//Генерация вопроса
function getQuestion() {
    let numberQuestion = Math.round( Math.random() * 3);

    switch (numberQuestion) {
        case 0: return "Вы загадали число " + getTextFromNumber(answerNumber) + "?";
        case 1: return "Вероятно это число " + getTextFromNumber(answerNumber) + "?";
        case 2: return "Этим числом, наверняка, является " + getTextFromNumber(answerNumber) +"?";
        case 3: return "А может быть это " + getTextFromNumber(answerNumber) + "?";
    }
}

//Генерация ответа при угадывании
function getAnswer() {
    let numberAnswer = Math.round( Math.random() * 3);

    switch (numberAnswer) {
        case 0: return `Я всегда угадываю\n\u{1F60E}`;
        case 1: return `Это было довольно легко\n\u{1F642}`;
        case 2: return `Да, пришлось немного попотеть\n\u{1F62A}`;
        case 3: return `Кто бы сомневался в моих способностях\n\u{1F4AA}`;
    }
}

//Генерация ответа при невозможности решения
function getFailureReaction() {
    let reaction = Math.round( Math.random() * 3);

    switch (reaction) {
        case 0: return `Вы загадали неправильное число!\n\u{1F914}`;
        case 1: return `Я сдаюсь..\n\u{1F92F}`;
        case 2: return `Такого не может быть \n\u{1F615}`
    }
}


//Генерация текстового представления числа в вопросе
function getTextFromNumber(number) {
    number += '';
    let result = '';
    let numberPositive = '';
    let lastTwoNumbers;
    let isNegative;

    if (number[0] == '-') { //избавляемся от минуса в значении результата
        result += 'минус ';
        numberPositive = number.slice(1);
        isNegative = true;
    }
    if(numberPositive) {
        number = numberPositive;
    }

    if (number.length === 3) {  //трехзначные числа
       result += getNumberName100_900(number[0]) + ' ';
       if (number[1] != '0' && number[1] != '1' && number[2] != '0') {
           result += getNumberName20_90(number[1]) + ' ';
           result += getNumberName1_9(number[2]);
       } else if (number[1] == '0' && number[2] != '0') {
           result += getNumberName1_9(number[2]);
       } else if (number[1] == '1') {
           lastTwoNumbers = number[1] + number[2];
           result += getNumberName10_19(lastTwoNumbers);
       } else if (number[1] != 0 && number[2] == '0') {
           result += getNumberName20_90(number[1]);
       }
    }

    if (number.length === 2) { //двузначные числа
        if (number[0] == '1') {
            lastTwoNumbers = number[0] + number[1];
            result += getNumberName10_19(lastTwoNumbers);
        } else if (number[1] != '0') {
            result += getNumberName20_90(number[0]) + ' ' + getNumberName1_9(number[1]);
        } else if (number[1] == '0') {
            result += getNumberName20_90(number[0]);
        }
   }

    if (number.length === 1) { //числа с одним разрядом
        result += getNumberName1_9(number[0]);
    }

    if (result.length < 20) {
        return result;
    } else {
        if (isNegative) {
            return '-' + number;
        }
        return number;
    }
}



//Получение названий для чисел 1-9
function getNumberName1_9(arg) {
    switch (arg) {
        case '0': return '0';
        case '1': return 'один';
        case '2': return 'два';
        case '3': return 'три';
        case '4': return 'четыре';
        case '5': return 'пять';
        case '6': return 'шесть';
        case '7': return 'семь';
        case '8': return 'восемь';
        case '9': return 'девять';
    }
}

//Получение названий для чисел 10-19
function getNumberName10_19(arg) {
    switch (arg) {
        case '10': return 'десять';
        case '11': return 'одиннадцать';
        case '12': return 'двенадцать';
        case '13': return 'тринадцать';
        case '14': return 'четырнадцать';
        case '15': return 'пятнадцать';
        case '16': return 'шестнадцать';
        case '17': return 'семнадцать';
        case '18': return 'восемнадцать';
        case '19': return 'девятнадцать';
    }
}

//Получение названий десятков
function getNumberName20_90(arg) {
    switch (arg) {
        case '2': return 'двадцать';
        case '3': return 'тридцать';
        case '4': return 'сорок';
        case '5': return 'пятьдесят';
        case '6': return 'шестьдесят';
        case '7': return 'семьдесят';
        case '8': return 'восемьдесят';
        case '9': return 'девяносто';
    }
}

//Получение названий сотен
function getNumberName100_900(arg) {
    switch (arg) {
        case '1': return 'сто';
        case '2': return 'двести';
        case '3': return 'триста';
        case '4': return 'четыреста';
        case '5': return 'пятьсот';
        case '6': return 'шестьсот';
        case '7': return 'семьсот';
        case '8': return 'восемьсот';
        case '9': return 'девятьсот';
    }
}