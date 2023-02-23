import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { dateToYYYYMMDD, getStartDate } from "../../../../../../utils/dateFormatUtils";
import { useRef, useState } from "react";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import CustomSelect from "../../../../../../components/select/default/v1/CustomSelect";

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

export default function EditChannelOrderDateModalComponent({
    open,
    onClose,
    onConfirm
}) {
    const [ymd, setYmd] = useState(dateToYYYYMMDD(new Date()));
    const hourRef = useRef();
    const minuteRef = useRef();
    const secondRef = useRef();

    const handleChangeYmd = (value) => {
        setYmd(dateToYYYYMMDD(value));
    }

    const handleConfirm = () => {
        let hour = hourRef.current.value;
        let minute = minuteRef.current.value;
        let second = secondRef.current.value;

        if (!HOURS.includes(hour)) {
            hour = '09';
        }

        if (!MINUTES.includes(minute)) {
            minute = '00';
        }

        if (!SECONDS.includes(second)) {
            second = '00';
        }

        let result = `${ymd} ${hour}:${minute}:${second}`;

        onConfirm(result);
    }

    return (
        <CustomDialog
            open={open}
            onClose={() => onClose()}
        >
            <CustomDialog.CloseButton onClose={() => onClose()} />
            <ContentContainer>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={'ko-KR'}
                >
                    <MobileDatePicker
                        label="판매채널 주문날짜"
                        inputFormat="YYYY.MM.DD"
                        mask={'____.__.__'}
                        toolbarFormat="YY.MM.DD dd"
                        showToolbar={false}
                        disableFuture={true}
                        value={dayjs(new Date(ymd))}
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
                        <CustomSelect className='select' ref={hourRef} defaultValue={'09'}>
                            {HOURS.map(r => {
                                return (
                                    <option key={r} value={r}>{r}</option>
                                );
                            })}
                        </CustomSelect>
                    </div>
                    <div className='box'>
                        <div className='label'>분</div>
                        <CustomSelect className='select' ref={minuteRef} defaultValue={'00'}>
                            {MINUTES.map(r => {
                                return (
                                    <option key={r} value={r}>{r}</option>
                                );
                            })}
                        </CustomSelect>
                    </div>
                    <div className='box'>
                        <div className='label'>초</div>
                        <CustomSelect className='select' ref={secondRef} defaultValue={'00'}>
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
                <CustomDialog.FooterButton backgroundColor={'var(--defaultModalCloseColor)'} fontColor={'#fff'} width={'40%'}>취소</CustomDialog.FooterButton>
                <CustomDialog.FooterButton backgroundColor={'var(--mainColor)'} fontColor={'#fff'} flex={1} onClick={() => handleConfirm()}>적용</CustomDialog.FooterButton>
            </CustomDialog.FooterButtonGroup>
        </CustomDialog>
    );
}

const HOURS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const MINUTES = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
const SECONDS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];