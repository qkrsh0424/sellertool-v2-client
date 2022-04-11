function calculate(formula) {
    let postfixFormulaArray;
    let result;

    try{
        postfixFormulaArray = getPostfixFormulaArray(formula);
    } catch(err){
        alert(err)
        return '0';
    }
    try{
        result = calculatePostfixFormulaArray(postfixFormulaArray);
        return result;
    }catch(err){
        alert('계산 오류');
        return '0';
    }
}

function prec(op) {
    switch (op) {
        case '(':
        case ')':
            return 0;
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
        case '%':
            return 2;
    }
    return 999;
}

function getPostfixFormulaArray(formula) {
    formula = formula.replace(/(\s*)/g, "");

    // TODO : 입력가능 regex 생성해야됨. 0123456789+-*/%() 만 허용됨.
    let formulaArray = toFormulaArray(formula);
    // console.log('formulaArray => ', formulaArray);

    if (!checkFormula(formulaArray)) {
        throw new Error('수식 오류');
    }

    let result = [];
    let operatorStack = [];

    for (let i = 0; i < formulaArray.length; i++) {
        let currOperator = formulaArray[i];

        if (!isNaN(currOperator)) {
            result.push(currOperator);
        }

        if (currOperator === '(') {
            operatorStack.push(currOperator);
        }

        if (currOperator === ')') {
            let returnedOp = operatorStack.pop();
            while (returnedOp != '(') {
                result.push(returnedOp);
                returnedOp = operatorStack.pop();
            }
        }

        if (['+', '-', '*', '/', '%'].includes(currOperator)) {
            if (operatorStack.length === 0) {
                operatorStack.push(currOperator);
            } else {
                while (operatorStack.length > 0) {
                    if (prec(operatorStack[operatorStack.length - 1]) >= prec(currOperator)) {
                        result.push(operatorStack.pop());
                    } else {
                        break;
                    }
                }
                operatorStack.push(currOperator);
            }

        }
    }

    while (operatorStack.length > 0) {
        let returnedOp = operatorStack.pop();
        result.push(returnedOp);
    }

    return result;
}

function toFormulaArray(formula) {
    const array = formula.split('');
    // console.log(array);

    let numberArray = [];
    let numberChar = '';

    array.forEach((r, index) => {
        // 배열의 마지막일때
        if (index === array.length - 1) {
            switch (r) {
                case '+': case '-': case '*': case '/': case '%': case '(': case ')':
                    if (numberChar !== '') {
                        numberArray.push(parseFloat(numberChar));
                        numberChar = '';
                    }
                    numberArray.push(r);
                    break;
                default:
                    numberChar += r;
                    numberArray.push(parseFloat(numberChar));
                    numberChar = '';
                    break;
            }
        } else if (index === 0) {
            switch (r) {
                case '+': case '-': case '*': case '/': case '%': case '(': case ')':
                    numberArray.push(r);
                    break;
                default:
                    numberChar += r;
                    break;
            }
        } else {
            switch (r) {
                case '+': case '-': case '*': case '/': case '%': case '(': case ')':
                    if (numberChar !== '') {
                        numberArray.push(parseFloat(numberChar));
                        numberChar = '';
                    }
                    numberArray.push(r);
                    break;
                default:
                    numberChar += r;
                    break;
            }
        }
    });
    return numberArray;
}

function checkFormula(numberArray) {
    let stack = [];
    let bracketStack = [];

    for (let i = 0; i < numberArray.length; i++) {
        // 포뮬라 스택의 첫번째 인덱스 일떼
        if (stack.length === 0) {
            // 연산자가 나오면 수식 오류
            if (['+', '-', '*', '/', '%', ')'].includes(numberArray[i])) {
                return false;
            }

            if (numberArray[i] === '(') {
                bracketStack.push(numberArray[i]);
            }
            stack.push(numberArray[i]);
        } else {
            let prevData = stack[i - 1];
            // 연산자가 이중으로 나오면 수식 오류
            if (['+', '-', '*', '/', '%', ')'].includes(numberArray[i]) && ['+', '-', '*', '/', '%'].includes(prevData)) {
                return false;
            }
            if (numberArray[i] === '(') {
                bracketStack.push(numberArray[i]);
            }
            if (numberArray[i] === ')') {
                if (bracketStack.length === 0) {
                    return false;
                }
                bracketStack.pop();
            }

            if (!isNaN(numberArray[i]) && prevData === ')') {
                return false;
            }
            stack.push(numberArray[i]);
        }
    }

    if (bracketStack.length !== 0) {
        return false;
    }
    // 포뮬라 스택의 마지막 값이 연산자라면 수식 오류
    if (['+', '-', '*', '/', '%', '('].includes(stack[numberArray.length - 1])) {
        return false;
    }
    // console.log(stack)
    // console.log(stack[numberArray.length - 1])
    return true;
}



function calculatePostfixFormulaArray(postfixFormulaArray) {
    // console.log(postfixFormulaArray);
    let numberStack = [];

    for (let i = 0; i < postfixFormulaArray.length; i++) {
        const currData = postfixFormulaArray[i];
        if (!isNaN(currData)) {
            numberStack.push(currData);
            continue;
        }
        if (isNaN(currData)) {
            let operator = currData;
            let b = numberStack.pop();
            let a = numberStack.pop();

            switch (operator) {
                case '+':
                    numberStack.push(a + b);
                    break;
                case '-':
                    numberStack.push(a - b);
                    break;
                case '*':
                    numberStack.push(a * b);
                    break;
                case '/':
                    numberStack.push(a / b);
                    break;
                case '%':
                    numberStack.push(a % b);
                    break;
            }
        }
    }

    // console.log(numberStack[0]);
    return parseFloat(numberStack[0].toFixed(5));
}

export {
    calculate
}