import Image from 'next/image';
import styled from 'styled-components';
import CustomImage from '../../../views/modules/image/CustomImage';

const Container = styled.div`

`;

const ReactedZoneLabel = styled.label`
    display: inline-block;
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledRadio = styled.span`
    display: inline-block;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background: ${props => (props.checked ? '#2C73D2' : 'white')};
    border: 1px solid ${props => (props.checked ? '#2C73D2' : '#e1e1e1')};
    border-radius: 50%;
    transition: all 150ms;
    -webkit-tap-highlight-color: #00000000;
    vertical-align: middle;

    cursor: pointer;
    
    ${HiddenRadio}:focus + & {
        box-shadow: 0 0 0 3px #2C73D240;
    }

    ${Icon} {
        visibility: ${props => (props.checked ? 'visible' : 'hidden')}
    }
`

const Label = styled.span`
    user-select: none;
    margin-left: 5px;
    font-weight: 500;
    font-size: ${props => props.labelSize}px;
    color:#444;
    cursor:pointer;
    -webkit-tap-highlight-color: #00000000;
    display: inline-block;
    vertical-align: middle;
`;

/**
 * 
 * @param {object} param
 * @param {string} param.label
 * @param {number} param.labelSize
 * @param {object} param.labelStyle
 * @param {string} param.labelClassName
 * @param {number} param.size
 * @param {boolean} param.checked
 * @param {object} param.style
 * @param {string} param.className
 * @param {func} param.onChange
 * @returns 
 */
export default function Radio({
    label,
    labelSize = 14,
    labelStyle,
    labelClassName,
    size = 20,
    checked = false,
    style,
    className,
    onChange = () => { },
    ...props
}) {
    return (
        <Container style={style} className={className}>
            <ReactedZoneLabel>
                <HiddenRadio
                    checked={checked}
                    onChange={onChange}
                    {...props}
                />
                <StyledRadio
                    checked={checked}
                    size={size}
                >
                    <CustomImage src={`/images/icon/check_default_ffffff.svg`} />
                </StyledRadio>
                {label &&
                    <Label
                        labelSize={labelSize}
                        className={labelClassName}
                        style={{
                            ...labelStyle
                        }}
                    >{label}</Label>
                }
            </ReactedZoneLabel>
        </Container>
    );
}