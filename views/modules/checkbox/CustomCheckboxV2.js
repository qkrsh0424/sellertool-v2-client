import Image from "next/image";
import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    display: flex;
    align-items: center;
`

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
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

const StyledCheckbox = styled.div`
    display: inline-block;
    width: ${props => props.size ? props.size : '16px'};
    height: ${props => props.size ? props.size : '16px'};
    background: ${props => (props.checked ? '#2C73D2' : 'white')};
    border: 1px solid ${props => (props.checked ? '#2C73D2' : '#e1e1e1')};
    border-radius: 3px;
    transition: all 150ms;
    -webkit-tap-highlight-color: #00000000;

    cursor: pointer;
    
    ${HiddenCheckbox}:focus + & {
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
    font-size: ${props => props.labelSize ? props.labelSize : '14px'};
    color:#444;
    cursor:pointer;
    -webkit-tap-highlight-color: #00000000;
`;

/**
 * 
 * @param {Object} param0 
 * @param {String} param0.className default null
 * @param {boolean} param0.checked default false
 * @param {String} param0.label default null
 * @param {String} param0.size default '16px'
 * @param {String} param0.labelSize default '14px'
 * @param {Object} param0.style
 * @param {Object} param0.labelStyle
 * @returns 
 */

const CustomCheckboxV2 = ({
    className,
    selectedCheckBoxClassName,
    labelClassName,
    checked,
    label,
    size,
    labelSize,
    style,
    labelStyle,
    ...props
}) => (
    <CheckboxContainer
        className={className}
        style={{ ...style }}
    >
        <label style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <HiddenCheckbox
                checked={checked}
                {...props}
            />
            <StyledCheckbox
                className={selectedCheckBoxClassName}
                checked={checked}
                size={size}
            >
                <Image
                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                    src={`/images/icon/check_default_ffffff.svg`}
                    className='icon-el'
                    layout="responsive"
                    width={1}
                    height={1}
                    loading={'lazy'}
                    alt={'check default white'}
                />
            </StyledCheckbox>
            {label &&
                <Label
                    className={labelClassName}
                    style={{
                        ...labelStyle
                    }}
                    labelSize={labelSize}
                >{label}</Label>
            }
        </label>
    </CheckboxContainer>
)

export default React.memo(CustomCheckboxV2);