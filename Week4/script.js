document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display-text');
    let previousNumber = '';
    let currentNumber = '';
    let currentOperator = '';
    let currentResult = '';

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            currentNumber += button.innerText;
            display.value = currentNumber;
        })
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            previousNumber = currentNumber;
            currentNumber = '';
            currentOperator = button.innerText;
            console.log(currentNumber);
            display.value = currentOperator;
        })
    });

    document.querySelector('.equal').addEventListener('click', () => {
        compute();
    });

    document.querySelector('.clear').addEventListener('click', () => {
        currentNumber = '';
        currentOperator = '';
        currentResult = '';
        display.value = '0';
    });

    function compute() {
        if (currentOperator === '+') {
            currentResult = parseInt(previousNumber) + parseInt(currentNumber);
        } else if (currentOperator === '-') {
            currentResult = parseInt(previousNumber) - parseInt(currentNumber);
        } else if (currentOperator === '×') {
            currentResult = parseInt(previousNumber) * parseInt(currentNumber);
        } else if (currentOperator === '÷') {
            currentResult = parseInt(previousNumber) / parseInt(currentNumber);
        }
    
        display.value = currentResult;
        currentNumber = '';
        currentOperator = '';
        previousNumber = currentResult;
    }

});