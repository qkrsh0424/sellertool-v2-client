import { Alert, AlertTitle, Button, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import styled from 'styled-components';
import CustomImage from "../../modules/image/CustomImage";

const Container = styled.div`
`;

export default function AlertFieldComponent(props) {
    const [alertOpen, setAlertOpen] = useState(true);

    return (
        <Container>
            <Collapse in={alertOpen}>
                <Alert
                    severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setAlertOpen(false)}
                        >
                            <div style={{ width: '30px', height: '30px' }}>
                                <CustomImage src='/images/icon/close_default_959eae.svg' />
                            </div>
                        </IconButton>
                    }
                >
                    <AlertTitle>필독!</AlertTitle>
                    <div>새로운 버전의 셀러툴은 기존 셀러툴과의 호환을 지원하지 않습니다.</div>
                    <div>기존 셀러툴 회원분들께서도 새롭게 회원가입을 해주시기 바랍니다.</div>
                </Alert>
            </Collapse>
        </Container>
    );
}