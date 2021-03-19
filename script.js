let minValue;
let maxValue

enterAndCheckValues();

let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;
let orderNumberField = document.getElementById('orderNumberField');
let answerField = document.getElementById('answerField');
orderNumberField.innerText = orderNumber;
answerField.innerText = getQuestion();

//Кн. "Заново"
document.getElementById('btnRetry').addEventListener('click', function () {
    gameRun = true;

    enterAndCheckValues();
    
    orderNumber = 1;
    orderNumberField = orderNumber;
    answerNumber  = Math.floor( (minValue + maxValue) / 2 );  
    answerField.innerText = `Вы загадали число ${answerNumber }?`;
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

//Ввод и проверка значений
function enterAndCheckValues() {
    minValue = parseInt( prompt('Минимальное значение числа для игры','0') );
    minValue = ( isNaN(minValue) ) ? 0 : minValue;
    minValue = (minValue < -999) ? -999 : minValue;
    minValue = (minValue > 999) ? 999 : minValue;

    maxValue = parseInt( prompt('Максимальное значение числа для игры','100' ) );
    maxValue = ( isNaN(maxValue) ) ? 100 : maxValue;
    maxValue = (maxValue < -999) ? -999 : maxValue;
    maxValue = (maxValue > 999) ? 999 : maxValue;

    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

    if (maxValue < minValue) {
        alert('Неверно задан диапазон значений!');
    }
    while (maxValue < minValue) {
        minValue = parseInt(prompt('Минимальное значение числа для игры','0'));
        maxValue = parseInt(prompt('Максимальное значение числа для игры','100'));
        if (maxValue < minValue) {
            alert('Неверно задан диапазон значений!');
        }
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







