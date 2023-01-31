import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled, { keyframes } from "styled-components";
import IconButton from '@mui/material/IconButton';
import CalculatorDashboard from "./CalculatorDashboard";
import CalculatorDashboard2 from "./CalculatorDashboard2";

const Container = styled.div`
    /* height: 100vh; */
    /* padding: 20px; */
`;
const CalculatorCloseBox = styled.button`
    position: fixed;
    display: block;
    bottom: 30px;
    right: 30px;
    background: #ffffff80;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    border: 2px solid #2C73D2;
    /* border: 2px solid white; */
    cursor: pointer;
    animation-duration: .3s;
    animation-name: fadein;
    
    
    &:hover{
        background:white;
    }

    &:active{
        background:#7DC2FF;
    }

    &:disabled{
        background:white;
    }

    @media all and (max-width:992px) {
        bottom: 20px;
        right: 20px;
    }

    @keyframes fadein {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
    @-moz-keyframes fadein { /* Firefox */
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
    @-webkit-keyframes fadein { /* Safari and Chrome */
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
    @-o-keyframes fadein { /* Opera */
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
`;

const CalculatorDashboardBox = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 230px;
    background: #e1e1e1d0;
    border: 2px solid white;
    border-radius: 10px;
    animation-duration: .3s;
    animation-name: fadein;

    .handler{
        padding: 7px;
        background: #2C73D2;
        border-bottom: 1px solid white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
    }

    .handler .close-btn{
        float: right;
        background: #f95261;
        border: 1px solid white;
        border-radius: 3px;
        color: white;
        cursor: pointer;
        
    }

    .viewer{
        background: #2C73D2;
        height: 70px;
        width: 100%;
        outline: none;
        border: 2px solid #2C73D2;
        text-align: right;
        line-height: 90px;
        color:white;
        font-weight: 600;
        font-size: 18px;
        &:focus{
            background: red;
        }
    }

    @media all and (max-width:992px) {
        width: 230px;
        bottom: 20px;
        right: 20px;
    }
`;

const CalculatorMain = () => {
    const calculatorBtnRef = useRef(null);
    const calculatorDashboardRef = useRef(null);

    const [pivotPosition, setPivotPosition] = useState({ x: 0, y: 0 });
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [calculatorOpen, setCalculatorOpen] = useState(false);
    const [dashboardOnFocus, setDashboardOnFocus] = useState(false);

    const onCalculatorDrag = (e, data) => {
        setPivotPosition({ x: data.x, y: data.y })
        setBtnDisabled(true)
    }

    const onCalculatorDragStop = () => {
        setTimeout(() => {
            setBtnDisabled(false)
        }, 100);
    }

    const onCalculatorOpen = () => {
        setCalculatorOpen(true);
        // calculatorBtnRef.current.style.display = 'none';
    }

    const onCalculatorClose = () => {
        setCalculatorOpen(false);
    }

    return (
        <>
            <Container>
                
                {!calculatorOpen && (
                    <CalculatorCloseBox
                        ref={calculatorBtnRef}
                        onClick={() => onCalculatorOpen()}
                    // disabled={btnDisabled}
                    >
                        <img src='/images/logo/calculator_icon.png' width={40} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} draggable={false} />
                    </CalculatorCloseBox>
                )}

                {calculatorOpen && (
                    <CalculatorDashboardBox
                        ref={calculatorDashboardRef}
                    >
                        <div className="handler">
                            <button type='button' className="close-btn" onClick={() => onCalculatorClose()}>x</button>
                        </div>
                        <CalculatorDashboard2></CalculatorDashboard2>
                    </CalculatorDashboardBox>
                )}

                {/* {!calculatorOpen && (
                    <Draggable
                        nodeRef={calculatorBtnRef}
                        position={pivotPosition}
                        onDrag={(e, data) => onCalculatorDrag(e, data)}
                        onStop={() => onCalculatorDragStop()}
                        bounds="html"
                    >
                        <CalculatorCloseBox
                            ref={calculatorBtnRef}
                            onClick={() => onCalculatorOpen()}
                        // disabled={btnDisabled}
                        >
                            <img src='/images/logo/calculator_icon.png' width={40} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} draggable={false} />
                        </CalculatorCloseBox>
                    </Draggable>
                )} */}

                {/* {calculatorOpen && (
                    <Draggable
                        nodeRef={calculatorDashboardRef}
                        position={pivotPosition}
                        onDrag={(e, data) => onCalculatorDrag(e, data)}
                        onStop={() => onCalculatorDragStop(false)}
                        bounds="html"
                    >
                        <CalculatorDashboardBox
                            ref={calculatorDashboardRef}
                        >
                            <div className="handler">
                                <button type='button' className="close-btn" onClick={() => onCalculatorClose()}>x</button>
                            </div>
                            <CalculatorDashboard2></CalculatorDashboard2>
                        </CalculatorDashboardBox>
                    </Draggable>
                )} */}
            </Container>
        </>
    );
}

export default CalculatorMain;