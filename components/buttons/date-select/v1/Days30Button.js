import styled, { css } from 'styled-components';
import { dateToYYYYMMDD, getStartDate, setPlusDate } from '../../../../utils/dateFormatUtils';
import CustomBlockButton from '../../block-button/v1/CustomBlockButton';

const ButtonItem = styled(CustomBlockButton)`
    font-size: 11px;
    width: 60px;
    height: 30px;
    margin-right: -1px;
    margin-top: -1px;
    color: #404040;

    ${props => props.checked && 
        css`
            background-color: #555 !important;
            border: 1px solid #555 !important;
            color: white !important;
        `
    };
`;

export default function Days30Button({
    callback,
    selectedDate,
    ...props
}) {
    const handleClickButton = () => {
        let currDateTime = new Date();
        let searchDate = getStartDate(setPlusDate(currDateTime, 0, 0, -29)) ;

        callback(searchDate);
    }

    return (
        <ButtonItem
            type='button'
            onClick={() => handleClickButton()}
            checked={dateToYYYYMMDD(selectedDate) ===  dateToYYYYMMDD(setPlusDate(new Date(), 0, 0, -29))}
            {...props}
        >
            30일
        </ButtonItem>
    );
}