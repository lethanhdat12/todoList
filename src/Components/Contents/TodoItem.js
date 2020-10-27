import React, { Component } from 'react'
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class TodoItem extends Component {
    render() {
        return (
 
                <tr>
                    <th scope="row">{this.props.stt}</th>
                    <td id="page-title-contents">{this.props.task}</td>
                    <td id="page-title-button">
                            <Button id="edit" onClick = {this.props.edit}>
                                <AiFillEdit />&nbsp;
                                Edit
                            </Button>
                        <Link to={'/detail/'+this.props.id + '/' + this.props.congviec}>
                            <Button id="detail">
                                <BiDetail />&nbsp;
                                 Detail
                            </Button>
                        </Link>
                            <Button id="delete" onClick={this.props.delete}>
                                <AiTwotoneDelete />&nbsp;
                                Delete
                            </Button>
                    </td>
                </tr>
 
        )
    }
}
