import React from "react";
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function Menu() {
    return (
        <div >
            <header >
                <Title>Menu</Title>
            </header>
        </div>
    );
}

export default Menu;
