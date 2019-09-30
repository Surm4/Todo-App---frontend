import React from 'react';
import styled from 'styled-components'
import { THEME_BG_COLOR } from '../common/styles';

const HeaderContainer = styled.header`
    display: flex;
    background-color: ${THEME_BG_COLOR};
    justify-content: center;
`;

const HeaderTitle = styled.h2`
    padding-left: 1rem;
    padding-right: 1rem;
`;

class Header extends React.Component {
    render() {
        return (
            <HeaderContainer>
                <HeaderTitle>Todos App</HeaderTitle>
            </HeaderContainer>
        );
    }
}

export default Header;

