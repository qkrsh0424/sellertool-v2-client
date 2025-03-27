import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CustomDialog } from "../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { dateToYYYYMMDD } from "../../../utils/dateFormatUtils";
import { useState } from "react";
import CustomSelect from "../../select/default/v1/CustomSelect";

const ContentContainer = styled.div`
    padding: 20px;
    .date-picker{
        width:100%;
        background: #fff;
    }
`;

const HmsWrapper = styled.div`
    display: flex;
    margin-top: 20px;

    .box{
        flex:1;
        .label{
            font-size: 12px;
            color: #606060;
        }

        .select{
            width:100%;
        }
        &:not(:first-child){
            margin-left: 5px;
        }
    }
`;

const initialize = (initialDateTime) => {
    let date = Date.parse(initialDateTime);
    let parsedDate = isNaN(date) ? new Date() : new Date(date);
    let originYmd = dateToYYYYMMDD(parsedDate);
    let originHours = parsedDate.getHours();
    let originMinutes = parsedDate.getMinutes();
    let originSeconds = parsedDate.getSeconds();

    let result = {
        ymd: originYmd,
        hours: originHours < 10 ? `0${originHours}` : `${originHours}`,
        minutes: originMinutes < 10 ? `0${originMinutes}` : `${originMinutes}`,
        seconds: originSeconds < 10 ? `0${originSeconds}` : `${originSeconds}`
    }

    return result;
}

export default function CustomDateTimeSelector({
    open,
    onClose,
    onConfirm,
    initialDateTime = new Date(),
    label = '날짜선택'
}) {
    const [parseDateTime, setParseDateTime] = useState(initialize(initialDateTime));

    const handleChangeYmd = (value) => {
        setParseDateTime({
            ...parseDateTime,
            ymd: dateToYYYYMMDD(value)
        });
    }

    const handleChangeValue = (field, value) => {
        setParseDateTime({
            ...parseDateTime,
            [field]: value
        })
    }

    const handleConfirm = () => {
        let date = `${parseDateTime?.ymd} ${parseDateTime?.hours}:${parseDateTime?.minutes}:${parseDateTime?.seconds}`;
        let parsedDate = !isNaN(Date.parse(date)) ? new Date(date) : null;

        onConfirm(parsedDate);
    }

    return (
        <CustomDialog
            open={open}
            onClose={(e) => { onClose(e) }}
        >
            <CustomDialog.CloseButton onClose={() => onClose()} />
            <ContentContainer>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={'ko-KR'}
                >
                    <MobileDatePicker
                        label={label}
                        inputFormat="YYYY.MM.DD"
                        mask={'____.__.__'}
                        toolbarFormat="YY.MM.DD dd"
                        showToolbar={false}
                        disableFuture={true}
                        minDate={new Date('2020-01-01')}
                        value={dayjs(new Date(parseDateTime?.ymd))}
                        onChange={(value) => handleChangeYmd(value)}
                        closeOnSelect={true}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className='date-picker'
                            />
                        )}
                    />
                </LocalizationProvider>
                <HmsWrapper>
                    <div className='box'>
                        <div className='label'>시</div>
                        <CustomSelect className='select' value={parseDateTime?.hours} onChange={(e) => handleChangeValue('hours', e.target.value)}>
                            {HOURS.map(r => {
                                return (
                                    <option key={r} value={r}>{r}</option>
                                );
                            })}
                        </CustomSelect>
                    </div>
                    <div className='box'>
                        <div className='label'>분</div>
                        <CustomSelect className='select' value={parseDateTime?.minutes} onChange={(e) => handleChangeValue('minutes', e.target.value)}>
                            {MINUTES.map(r => {
                                return (
                                    <option key={r} value={r}>{r}</option>
                                );
                            })}
                        </CustomSelect>
                    </div>
                    <div className='box'>
                        <div className='label'>초</div>
                        <CustomSelect className='select' value={parseDateTime?.seconds} onChange={(e) => handleChangeValue('seconds', e.target.value)}>
                            {SECONDS.map(r => {
                                return (
                                    <option key={r} value={r}>{r}</option>
                                );
                            })}
                        </CustomSelect>
                    </div>
                </HmsWrapper>
            </ContentContainer>
            <CustomDialog.FooterButtonGroup isFlex>
                <CustomDialog.FooterButton backgroundColor={'var(--defaultModalCloseColor)'} fontColor={'#fff'} width={'40%'} onClick={() => onClose()}>취소</CustomDialog.FooterButton>
                <CustomDialog.FooterButton backgroundColor={'var(--mainColor)'} fontColor={'#fff'} flex={1} onClick={() => handleConfirm()}>적용</CustomDialog.FooterButton>
            </CustomDialog.FooterButtonGroup>
        </CustomDialog>
    );
}

const HOURS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const MINUTES = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
const SECONDS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];