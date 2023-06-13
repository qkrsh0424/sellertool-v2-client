import styled from 'styled-components';
import Days30Button from './Days30Button';
import Days7Button from './Days7Button';
import Days90Button from './Days90Button';
import LastMonthButton from './LastMonthButton';
import ThisMonthButton from './ThisMonthButton';
import TodayButton from './TodayButton';
import YesterdayButton from './YesterdayButton';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

function DatePeriodButtonGroupMain({ children, ...props }) {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
}

export const CustomDatePeriodButtonGroup = Object.assign(DatePeriodButtonGroupMain, {
    TodayButton: TodayButton,
    YesterdayButton: YesterdayButton,
    Days7Button: Days7Button,
    Days30Button: Days30Button,
    Days90Button: Days90Button,
    ThisMonthButton: ThisMonthButton,
    LastMonthButton: LastMonthButton
})