import styled from 'styled-components';
import CustomImage from '../../../views/modules/image/CustomImage';

const Container = styled.div`
    .header-close-button-box{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;

        .header-close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;

            .header-close-button-icon{
                width:100%;
                height: 100%;
            }
        }
    
    }
`;

export default function CloseButton({
    onClose
}) {
    return (
        <Container>
            <div className='header-close-button-box'>
                <button
                    type='button'
                    className='header-close-button-el'
                    onClick={() => onClose()}
                >
                    <CustomImage
                        src='/images/icon/close_default_959eae.svg'
                    />
                </button>
            </div>
        </Container>
    );
}