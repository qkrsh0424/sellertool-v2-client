import styled from 'styled-components';
import CustomBlockButton from '../../block-button/v1/CustomBlockButton';

const ButtonItem = styled(CustomBlockButton)`
    font-size: 11px;
    width: 60px;
    height: 30px;
    margin-right: -1px;
    margin-top: -1px;
    color: #404040;
`;

export default function Days7Button({
    callback,
    ...props
}) {
    const handleClickButton = () => {
        let currDateTime = new Date();
        let YEAR = currDateTime.getFullYear();
        let MONTH = currDateTime.getMonth();
        let DATE = currDateTime.getDate();

        let result = {
            startDateTime: new Date(YEAR, MONTH, DATE - 6),
            endDateTime: currDateTime
        }
        callback(result);
    }

    return (
        <ButtonItem
            type='button'
            onClick={() => handleClickButton()}
            {...props}
        >
            최근7일
        </ButtonItem>
    );
}