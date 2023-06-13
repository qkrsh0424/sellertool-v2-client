import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import CustomImage from "../../../../../modules/image/CustomImage";

const ContentContainer = styled.div`
    padding: 20px;
`;

const ItemBox = styled.div`
    border: 1px solid #f0f0f0;
    padding: 10px 10px;
    margin-bottom: 5px;
    background: #fff;
    display: flex;
    align-items:center;
    border-radius: 5px;
    overflow: hidden;

    .star-button{
        user-select:none;
        cursor:pointer;
        -webkit-tap-highlight-color: #00000000;
        height: 30px;
        width: 30px;
        padding:0;
        margin:0;
        background: #fff;
        border: none;
    }

    .title{
        margin-left: 10px;
        font-weight: 600;
        font-size: 14px;
        flex:1;
        word-break: break-all;
    }
`;

export default function FavoriteTranslatorsModalComponent({
    open = false,
    onClose = () => { },
    excelTranslatorHeaders,
    favoriteTranslatorIds,
    onSelectFavoriteTranslator
}) {
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>즐겨찾기</CustomDialog.Title>
                <ContentContainer>
                    {excelTranslatorHeaders?.map(excelTranslatorHeader => {
                        return (
                            <ItemBox
                                key={excelTranslatorHeader?.id}
                            >
                                <button
                                    type='button'
                                    className='star-button'
                                    onClick={() => onSelectFavoriteTranslator(excelTranslatorHeader?.id)}
                                >
                                    {favoriteTranslatorIds?.includes(excelTranslatorHeader?.id) ?
                                        <CustomImage src='/images/icon/star_default_ffdf00.svg' />
                                        :
                                        <CustomImage src='/images/icon/star_border_808080.svg' />
                                    }
                                </button>
                                <div className='title'>{excelTranslatorHeader?.uploadHeaderTitle} &gt; {excelTranslatorHeader?.downloadHeaderTitle}</div>
                            </ItemBox>
                        );
                    })}
                </ContentContainer>
            </CustomDialog>
        </>
    );
}