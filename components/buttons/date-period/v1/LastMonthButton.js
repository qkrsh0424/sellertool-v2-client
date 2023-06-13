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

export default function LastMonthButton({
    callback,
    ...props
}) {
    const handleClickButton = () => {
        let currDateTime = new Date();
        let YEAR = currDateTime.getFullYear();
        let MONTH = currDateTime.getMonth();

        let result = {
            startDateTime: new Date(YEAR, MONTH - 1, 1),
            endDateTime: new Date(YEAR, MONTH, 0)
        }
        callback(result);
    }

    return (
        <ButtonItem
            type='button'
            onClick={() => handleClickButton()}
            {...props}
        >
            저번달
        </ButtonItem>
    );
}