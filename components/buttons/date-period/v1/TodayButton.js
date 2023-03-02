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

export default function TodayButton({
    callback,
    ...props
}) {
    const handleClickButton = () => {
        let currDateTime = new Date();

        let result = {
            startDateTime: currDateTime,
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
            오늘
        </ButtonItem>
    );
}