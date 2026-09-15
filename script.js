window.onload = function () {
  // объявление переменных
  let a = ''; // первое число
  let b = ''; // второе число
  let selectedOperation = null; // выбранная операция
  let expressionResult = '';  // результат
  // доступ к элементам страницы
  const outputElement = document.getElementById("result"); 
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
// метод, который находит сразу все кнопки цифр.

    // функция формирования числа
  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      // набираем первое число
      if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
        a += digit;
      }
      outputElement.innerHTML = a; // вывод числа на экран
    } else {
      // если знак операции уже выбран, набираем второе число:
      if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
        b += digit;
      }
      outputElement.innerHTML = b;
    }
  }

  // клик на все кнопки с цифрами
  digitButtons.forEach(button => {
    button.onclick = function () { 
      // button.onclick назначает обработчик события клика мыши
      const digitValue = button.innerHTML.trim(); 
      onDigitButtonClicked(digitValue);
    };
  });

 document.getElementById("btn_op_plus").onclick = function () {
    if (a === '') return;
    selectedOperation = '+';
  };
  document.getElementById("btn_op_minus").onclick = function () {
    if (a === '') return;
    selectedOperation = '-';
  };
  document.getElementById("btn_op_mult").onclick = function () {
    if (a === '') return;
    selectedOperation = 'x';
  };
  document.getElementById("btn_op_div").onclick = function () {
    if (a === '') return;
    selectedOperation = '/';
  };

   document.getElementById("btn_op_clear").onclick = function () {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    outputElement.innerHTML = 0;
  };

  document.getElementById("btn_op_equal").onclick = function () {
    // если нет чисел или операции, то ничего не делаем
    if (a === '' || b === '' || !selectedOperation) return; 
    switch (selectedOperation) {
      case '+':
        expressionResult = (+a) + (+b);
        break;
      case '-':
        expressionResult = (+a) - (+b);
        break;
      case 'x':
        expressionResult = (+a) * (+b);
        break;
      case '/':
        expressionResult = (+b !== 0) ? ((+a) / (+b)) : 'Ошибка';
        break;
    }
    // сохраняем результат в 'a', чтобы можно было продолжить следующие вычисления
    a = expressionResult.toString();
    b = '';
    selectedOperation = null;
    outputElement.innerHTML = a;
  };

   // индивидуальная операция темы (кешбек) 
  document.getElementById("btn_op_cashback").onclick = function () {
    if (a === '') return; // если пусто, то ничего
    // если сейчас вводится второе число, считаем кэшбэк от него, иначе от первого
    if (b !== '') {
      b = ((+b) * 0.05).toString();
      outputElement.innerHTML = b;
    } else {
      a = ((+a) * 0.05).toString();
      outputElement.innerHTML = a;
    }
  };
  // обычный процент % 
  document.getElementById("btn_op_percent").onclick = function () {
    if (a === '') return;
    if (b !== '') {
      b = ((+b) / 100).toString();
      outputElement.innerHTML = b;
    } else {
      a = ((+a) / 100).toString();
      outputElement.innerHTML = a;
    }
  };
};