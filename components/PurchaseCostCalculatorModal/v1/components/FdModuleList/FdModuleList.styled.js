import styled from 'styled-components';

export const St = {
    Container: styled.div`
        
    `,
    Title: styled.div`
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 5px;
        color:#404040;
    `,
    Wrapper: styled.div`
        background: #fff;
        height: 400px;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        box-shadow: var(--defaultBoxShadow);
        overflow-y:auto;
        padding: 0 10px;
    `,
    ItemBox: styled.div`
        padding: 10px 10px;
        border-radius: 5px;
        font-size: 14px;
        height: 60px;
        display:flex;
        align-items: center;
        color: #444;
        gap: 5px;
        font-weight: 500;
        cursor: pointer;
        
        .name-label{
            flex:1;
        }

        .editBtn{
            width:30px;
            height: 30px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
            &:hover{
                background: #fff;
            }
        }

        .removeBtn{
            width:30px;
            height: 30px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
            &:hover{
                background: #fff;
            }
        }

        &:last-child{
            border-bottom: none;
        }

        &:hover{
            background: #fafafa;
        }
    `,
    AddModeBox: styled.div`
        display: flex;
        width:100%;
        height: 35px;
        gap: 5px;
        padding: 10px 0;
        height: 60px;
        font-size: 14px;
        align-items: center;

        .addBtn{
            height: 100%;
            background: #fff;
            color: var(--mainColor);
            font-weight: 600;
            border: 1px solid var(--mainColor);
            border-radius: 5px;
        }

        input{
            flex:1;
            height: 100%;
            border-radius: 5px;
            &:focus{
                border: 1px solid #a0a0a0;
            }
        }

        .confirmAddBtn{
            width:35px;
            height: 35px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
        }

        .cancelBtn{
            width:35px;
            height: 35px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
        }
    `,
    EditModeBox: styled.div`
        display: flex;
        width:100%;
        height: 35px;
        gap: 5px;
        padding: 10px 0;
        height: 60px;
        font-size: 14px;
        align-items: center;

        input{
            flex:1;
            height: 100%;
            border-radius: 5px;
            &:focus{
                border: 1px solid #a0a0a0;
            }
        }

        .confirmBtn{
            width:35px;
            height: 35px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
        }

        .cancelBtn{
            width:35px;
            height: 35px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
        }
    `,
    DeleteModeBox: styled.div`
        display: flex;
        width:100%;
        height: 35px;
        gap: 5px;
        padding: 10px 0;
        height: 60px;
        font-size: 14px;
        align-items: center;

        .confirmBtn{
            /* width:35px; */
            flex:1;
            height: 35px;
            padding: 7px;
            border-radius: 5px;
            background: var(--defaultRedColor);
            border: 1px solid var(--defaultRedColor);
            color: #fff;
            font-weight: 700;
            font-size: 12px;
        }

        .cancelBtn{
            /* width:35px; */
            flex:1;
            height: 35px;
            padding: 7px;
            border-radius: 5px;
            background: #b0b0b0;
            border: 1px solid #b0b0b0;
            color: #fff;
            font-weight: 700;
            font-size: 12px;
        }
    `
}