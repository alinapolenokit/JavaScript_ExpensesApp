// Объявление переменных строковых констант
const LIMIT = 10000;
const CURRENCY = 'руб.';
const CATEGORY = 'Категория';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_positive';

//Объявление переменых - ссылок на html элементы 

const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const clearButtonNode = document.querySelector('.js-clearButton')
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const categorySelectNode = document.querySelector('.js-category')

let expenses = [];

init();

// ---Функции-----

buttonNode.addEventListener('click', function() {
    const expense = getExpanseFromUser();

    if (!expense) {
        return;
    }

   

    trackExpanse(expense);

    render(expenses);

       
})

clearButtonNode.addEventListener("click", clearButtonNode); {
    const clearButtonNode = () => {
        expenses = [];
        render();
    };
}



// function clearButtonNode() {
//   expenses.pop();

//   render(expenses);
// };

// const currentAmout = getExpanseFromUser();
    // if (!currentAmout) {
    //     return;
    // }

    // const currentCategoty = getSelectedCategory();
    // if (currentCategoty === "Категория") {
    //     return;
    // }


function init() {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = 0;
};

// 2. Сохраняем трату в список

function trackExpanse(expense) {
    const category = categorySelectNode.value
    expenses.push(expense);
};

// 1. Получаем значение из поля ввода

function getExpanseFromUser() {
    if (!inputNode.value) {
        return null;
    }
     
    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;

};

function clearInput() {
    inputNode.value = '';
};

// 4. Посчитать сумму и вывести её


function calculateExpanses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
       sum += element;
   });

   return sum;
};

function render(expenses) {
    const sum = calculateExpanses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

// 3. Выведем новый список трат

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => {
    expensesListHTML += `<li>${CATEGORY} - ${element} ${CURRENCY}</li>`;
    });
     
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;


}

function renderSum(sum) {
    sumNode.innerText = sum;
}

//5. Сравнение с лимитом и вывод статуса

function renderStatus(sum) {
    const total = calculateExpanses(expenses);
    

    if (sum <= LIMIT) {
        statusNode.innerText = `${STATUS_IN_LIMIT} (${LIMIT - total} ${CURRENCY})`;
        statusNode.className = 'status_positive'
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - total} ${CURRENCY})`;
        statusNode.className = 'status_negative' 
    }
    
}