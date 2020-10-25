import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

export default class Footer extends Component {
    render() {
        return (
            <Container>
                <div id="page-footer">
                    <div className="row">
                        <div className="col-sm-12">
                            <span>Nội dung Project của Nhóm H - Chuyên đề phát triển web &copy; 2020</span>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}
