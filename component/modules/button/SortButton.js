import styled from 'styled-components';
import { useRouter } from 'next/router';
import CustomImage from '../image/CustomImage';

const Container = styled.div`
    
`;

const ButtonEl = styled.button`
    padding:0;
    margin:0;
    width:${props => props.buttonSize ? props.buttonSize : 30}px;
    height:${props => props.buttonSize ? props.buttonSize : 30}px;
    border-radius: 50%;

    background:#00000000;
    border:1px solid #00000000;

    cursor:pointer;

    ${Container}:hover &{
        background:#e0e0e040;
    }
`;

const ButtonIcon = styled.img`
    width:${props => props.iconSize ? props.iconSize : 20}px;
    height:${props => props.iconSize ? props.iconSize : 20}px;

    opacity: ${props => props.active ? 1 : 0.4};

    ${Container}:hover &{
        opacity:1;
    }
`;

const ButtonIconFigure = styled.div`
    width:${props => props.iconSize ? props.iconSize : 20}px;
    height:${props => props.iconSize ? props.iconSize : 20}px;
    margin-left: auto;
    margin-right: auto;

    opacity: ${props => props.active ? 1 : 0.4};

    ${Container}:hover &{
        opacity:1;
    }
`;

const sortDirections = ['desc', 'asc'];

/**
 * 
 * @param {Object} props 
 * @param {String} props.markPoint
 * @param {Number} props.buttonSize
 * @param {Number} props.iconSize
 * @returns 
 */
const SortButton = ({ markPoint, buttonSize, iconSize }) => {
    const router = useRouter();
    const sort = router?.query?.sort;
    const sortBy = sort?.split('_')[0];
    const sortDirection = sort?.split('_')[1];

    const handleSortToDesc = () => {
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort: `${markPoint}_desc`
            }
        });
    }

    const handleSortToAsc = () => {
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort: `${markPoint}_asc`
            }
        });
    }

    const handleSortToNone = () => {
        delete router?.query?.sort;

        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query
            }
        });
    }

    return (
        <>
            <Container>
                {(sortBy !== markPoint || !sortDirections?.includes(sortDirection)) &&
                    <ButtonEl
                        buttonSize={buttonSize || 30}
                        onClick={() => handleSortToDesc()}
                    >
                        <ButtonIconFigure
                            iconSize={iconSize || 20}
                        >
                            <CustomImage
                                src='/images/icon/arrowUpDown_default_808080.svg'
                            />
                        </ButtonIconFigure>
                    </ButtonEl>
                }
                {/* 내림차순 */}
                {((sortBy === markPoint) && (sortDirection === 'desc')) &&
                    <ButtonEl
                        buttonSize={buttonSize || 30}
                        onClick={() => handleSortToAsc()}
                    >
                        <ButtonIconFigure
                            iconSize={iconSize || 20}
                            active={true}
                        >
                            <CustomImage
                                src='/images/icon/arrow_downward_808080.svg'
                            />
                        </ButtonIconFigure>
                    </ButtonEl>
                }
                {/* 오름차순 */}
                {((sortBy === markPoint) && (sortDirection === 'asc')) &&
                    <ButtonEl
                        buttonSize={buttonSize || 30}
                        onClick={() => handleSortToNone()}
                    >
                        <ButtonIconFigure
                            iconSize={iconSize || 20}
                            active={true}
                        >
                            <CustomImage
                                src='/images/icon/arrow_upward_808080.svg'
                            />
                        </ButtonIconFigure>
                    </ButtonEl>
                }
            </Container>
        </>
    );
}
export default SortButton;