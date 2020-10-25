import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
export default class Header extends Component {
    render() {
        return (
            <Container>
                <div id="page-header">
                    <h1>
                        TodoList <small>ReactJs</small>
                    </h1>
                    <hr></hr>
                </div>
            </Container>
        )
    }
}
