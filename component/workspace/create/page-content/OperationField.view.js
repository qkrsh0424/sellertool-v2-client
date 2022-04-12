import Ripple from "../../../modules/Ripple";
import { OperationFieldWrapper } from "./PageContent.styled";

export default function OperationFieldView(props) {
    return (
        <OperationFieldWrapper>
            <button
                className='button-el'
                onClick={props.onContinue}
            >
                계속하기
                <Ripple color={'#e0e0e060'} duration={1000}></Ripple>
            </button>
        </OperationFieldWrapper>
    );
}