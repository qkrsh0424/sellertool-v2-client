import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { calculate } from "../../utils/calculatorUtils";

const Container = styled.div`
    
`;

const Viewer = styled.div`
    position: relative;
    overflow: hidden;
    background: #2C73D2e0;
    color:white;
    border-bottom: 1px solid white;
`;

const ViewBox = styled.div`
    padding: 5px;
    text-align: right;
    font-size: ${(props) => props.length > 26 ? '12px' : props.length > 20 ? '14px' : '18px'};
`;

const CopyField = styled.div`
    display: flex;
    width: 100%;
    background: #e1e1e1d0;

`;

const CopyBtnBox = styled.button`
    width: 100%;
    color: white;
    background-color: #609FFF;
    padding: 5px;
    text-align: center;
    font-weight: 600;
    border: 1px solid white;
    cursor: pointer;

    transition: all .1s;
    &:hover{
        background-color: #e0ad4e;
    }

    &:active{
        transform: translate(0,1px);
    }
`;

const ControlContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const ControlEl = styled.button`
    padding: 8px;
    margin: 3px;
    border-radius: 8px;
    background-color: #609FFF;
    border: 2px solid white;
    color: white;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all .1s;
    &:hover{
        background-color: #e0ad4e;
    }

    &:active{
        transform: translate(0,1px);
    }
`;

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue,
    '%': (prevValue, nextValue) => prevValue % nextValue,
    '(': () => { },
    ')': () => { },
}

const initialDisplayValue = '0';

const displayValueReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return '0';
        default: return { ...state };
    }
}

const CalculatorDashboard2 = (props) => {
    const dashboardRef = useRef(null);

    const [dashboardOnFocus, setDashboardOnFocus] = useState(false);
    const [displayValue, dispatchDisplayValue] = useReducer(displayValueReducer, initialDisplayValue);
    const [prevFormula, setPrevFormula] = useState('0');

    useEffect(() => {
        document.addEventListener("mousedown", checkDashboardClick);
        return () => document.removeEventListener("mousedown", checkDashboardClick);
    }, [])

    useEffect(() => {
        if (dashboardOnFocus) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [dashboardOnFocus, displayValue]);

    const checkDashboardClick = (e) => {
        if (dashboardRef.current.contains(e.target)) { // 3. outside click 인지 판단
            setDashboardOnFocus(true);
        } else {
            setDashboardOnFocus(false);
        }
    }

    const handleKeyDown = (event) => {
        let { key } = event

        if (key === 'Enter')
            key = '='

        if ((/\d/).test(key)) {
            event.preventDefault()
            inputDigit(parseInt(key, 10))
        } else if (key in CalculatorOperations) {
            event.preventDefault()
            performOperation(key)
        } else if (key === '.') {
            event.preventDefault()
            inputDot()
        } else if (key === 'Backspace') {
            event.preventDefault()
            clearLastChar()
        } else if (key === 'Escape') {
            event.preventDefault()
            clearDisplay();
        }
    };

    const inputDot = () => {
        if (displayValue.length > 30) {
            return;
        }

        let regex = /\./g;

        if(displayValue.search(regex) !== -1){
            return;
        }

        dispatchDisplayValue({
            type: 'SET_DATA',
            payload: displayValue + '.'
        })
    }

    const inputDigit = (digit) => {
        if (displayValue.length > 30) {
            return;
        }
        dispatchDisplayValue({
            type: 'SET_DATA',
            payload: displayValue === '0' ? String(digit) : displayValue + String(digit)
        })
    }

    const performOperation = (nextOperator) => {
        if (nextOperator === '=') {
            setPrevFormula(displayValue);

            dispatchDisplayValue({
                type: 'SET_DATA',
                payload: String(calculate(displayValue))
            })
            return;
        }

        if (displayValue === '0' || displayValue.length > 30) {
            return;
        }

        dispatchDisplayValue({
            type: 'SET_DATA',
            payload: displayValue + nextOperator
        })
    }

    const clearDisplay = () => {
        setPrevFormula('0')
        dispatchDisplayValue({
            type: 'CLEAR'
        })
    }

    const clearLastChar = () => {
        dispatchDisplayValue({
            type: 'SET_DATA',
            payload: displayValue.substring(0, displayValue.length - 1) || '0'
        })
    }

    const onCopyFormular = async () => {

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(prevFormula);
    }

    const onCopyValue = async function () {
        navigator.clipboard.writeText(displayValue);
    }

    return (
        <>
            <Container ref={dashboardRef}>
                <Viewer>
                    <ViewBox
                        length={prevFormula.length}
                    >{prevFormula}</ViewBox>
                    <ViewBox
                        length={displayValue.length}
                    >
                        {displayValue}
                    </ViewBox>
                </Viewer>
                <CopyField>
                    <CopyBtnBox onClick={() => onCopyFormular()}>수식 복사</CopyBtnBox>
                    <CopyBtnBox onClick={() => onCopyValue()}>결과 값 복사</CopyBtnBox>
                    <CopyBtnBox style={{ width: '50%' }} onClick={() => clearLastChar()}>D</CopyBtnBox>
                </CopyField>
                <ControlContainer>
                    <ControlEl type='button' onClick={() => clearDisplay()}>C</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('(')}>(</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation(')')}>)</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('/')}>÷</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(7)}>7</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(8)}>8</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(9)}>9</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('*')}>x</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(4)}>4</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(5)}>5</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(6)}>6</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('-')}>-</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(1)}>1</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(2)}>2</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(3)}>3</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('+')}>+</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('%')}>%</ControlEl>
                    <ControlEl type='button' onClick={() => inputDigit(0)}>0</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('.')}>.</ControlEl>
                    <ControlEl type='button' onClick={() => performOperation('=')}>=</ControlEl>
                </ControlContainer>
            </Container>
        </>
    );
}

export default CalculatorDashboard2;