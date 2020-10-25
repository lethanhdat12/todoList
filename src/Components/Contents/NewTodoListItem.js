import React, { Component } from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { Button } from "react-bootstrap";
export default class NewTodoListItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.stt}</td>
                <td>{this.props.tieude} </td>
                <td id="page-section-td" onClick = {this.props.delete}>
                    <Button id="delete">
                            <AiTwotoneDelete />
                     &nbsp; Delete
                    </Button>
                </td>
            </tr>
        )
    }
}
