import React, { Component } from "react";
import { withRouter } from "react-router";
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    
`;


class PageLayout extends Component {

    render() {
        return (
            <Container >
                <div>
                    {this.props.children}
                </div>
            </Container>
        );
    }
}

export default withRouter(PageLayout);
