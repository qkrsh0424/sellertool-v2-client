import { useRouter } from "next/router";
import { useEffect } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import useErpcExcelDownloadFormsHook from "./hooks/useErpcExcelDownloadFormsHook";
import { Container, ItemBox, ItemListContainer, TitleContainer, Wrapper } from "./styles/ExcelDownloadForm.styled";

export default function ExcelDownloadForm(props) {
    const router = useRouter();
    const {
        erpcExcelDownloadForms
    } = useErpcExcelDownloadFormsHook();

    const handleRouteToPath = (path, query) => {
        router.push({
            pathname: path,
            query: { ...query }
        })
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <TitleContainer>
                        <div className='title'>
                            다운로드 폼 관리
                        </div>
                        <div>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => handleRouteToPath('/erp/collection/create/excel-download-form')}
                            >
                                <CustomImage
                                    src='/images/icon/add_default_808080.svg'
                                />
                            </SingleBlockButton>
                        </div>
                    </TitleContainer>
                    <ItemListContainer>
                        {erpcExcelDownloadForms?.map(r => {
                            return (
                                <ItemBox
                                    key={r.id}
                                >
                                    <div>
                                        <div className='name'>{r.name}</div>
                                        <div className='description'>{r.description || '지정된 설명이 없습니다.'}</div>
                                    </div>
                                    <div className='mgl-flex'>
                                        <SingleBlockButton
                                            type='button'
                                            className='icon-button-item'
                                            onClick={() => handleRouteToPath(`/erp/collection/edit/excel-download-form`, { erpcExcelDownloadFormId: r.id })}
                                        >
                                            <CustomImage
                                                src='/images/icon/settings_default_808080.svg'
                                            />
                                        </SingleBlockButton>
                                    </div>
                                </ItemBox>
                            );
                        })}
                    </ItemListContainer>
                </Wrapper>
            </Container>
        </>
    );
}