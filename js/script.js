window.onload = function () {
  // объявление переменных
  let a = ''; // первое число
  let b = ''; // второе число
  let selectedOperation = null; // операция
  let expressionResult = '';  // результат
  // доступ к элементам страницы
  const outputElement = document.getElementById("result"); 
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

    // формирование числа
  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if (a.length >= 11) return; 
      if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
        a += digit;
      }
      outputElement.innerHTML = a; // вывод числа на экран
    } else {
      if (b.length >= 11) return; // не больше 9 символов
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
    // сохраняем результат в a, чтобы можно было продолжить следующие вычисления
    a = expressionResult.toString().slice(0, 11);
    b = '';
    selectedOperation = null;
    outputElement.innerHTML = a;
  };

   // индивидуальная операция темы (кешбек) 
   // находим кнопку по id и назначаем обработчик onclick
  document.getElementById("btn_op_cashback").onclick = function () {
    if (a === '') return; // если пусто, то ничего
    // если вводится второе число, то считаем кэшбэк от него, иначе от первого
    if (b !== '') {
      b = ((+b) * 0.05).toString().slice(0, 11);
      outputElement.innerHTML = b;
    } else {
      a = ((+a) * 0.05).toString().slice(0, 11);
      outputElement.innerHTML = a;
    }
  };
  // backspace
  document.getElementById("btn_op_backspace").onclick = function () {
    if (!selectedOperation) {
      // если операция еще не выбрана, стираем из первого числа 'a'
      a = a.slice(0, -1);
      // если стёрли всё до конца, показываем 0, иначе оставшиеся цифры
      outputElement.innerHTML = (a === '') ? '0' : a;
    } else {
      // если знак операции уже выбран, стираем из второго числа 'b'
      b = b.slice(0, -1);
      outputElement.innerHTML = (b === '') ? '0' : b;
    }
  };
};