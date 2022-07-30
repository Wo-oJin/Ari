import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 260px;
    height: 41px;
    margin-bottom: 11px;
    border-style: initial;
    border-radius: ${(props) => props.radius};
    color: ${(props) => props.color};
    background: ${(props) => props.disabled ? '#DCDCDC' : props.background};
`;

const MainButton = ({ radius, color, background, disabled, text }) => {
    return (
        <StyledButton
            radius={radius}
            color={color}
            background={background}
            disabled={disabled}>
            {text}
        </StyledButton>
    );
};

export default MainButton;