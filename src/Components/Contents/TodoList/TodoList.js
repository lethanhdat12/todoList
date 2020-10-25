import React, { Component } from "react";
import "./TodoList.scss";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillTags } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaSearchPlus } from "react-icons/fa";
import TodoItem from "../TodoItem";
import Axios from "axios";
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      dataShow: [],
      length: 0,
      lengthPageNumber: [],
    }
    this.page = 0;
    this.TASK_ON_PAGE = 4;
    this.BASE_URL = "http://localhost/API/";
  }
  clickChangepage = (idPage) => {
    this.setState({ page: idPage });
  }
  setDataShow = (page) => {
    let BEGIN = (page - 1) * this.TASK_ON_PAGE;
    let END = BEGIN + this.TASK_ON_PAGE;
    this.setState({ dataShow: this.state.todo.slice(BEGIN, END) });
  }
  setTodo = (data) => {
    this.setState({ todo: data });
    this.setState({ length: Math.ceil(this.state.todo.length / this.TASK_ON_PAGE) });
    let arr = [];
    for (let i = 0; i < this.state.length; i++) {
      arr.push(i);
    }
    this.setState({ lengthPageNumber: [...arr] });
  }
  componentDidMount() {
    Axios.get(`${this.BASE_URL}get/sortUp.php`)
      .then(req => {
        this.setTodo(req.data);
        this.setDataShow(1);
      })
      .catch(err => {
        console.log(err);
      })
      const todo_inputSearch = document.querySelector('#todo-inputSearch');
      this.searchTask(todo_inputSearch);
  }
  handlePani = (e) => {
    this.setDataShow(parseInt(e.target.id));
    this.page = parseInt(e.target.id);
  }
  addTask = () => {
    let value = document.querySelector('#todo-input').value;
    Axios.post(`${this.BASE_URL}post/addTask.php`, { task: value })
      .then(req => {
        this.setTodo(req.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  deleteTask = (id) => {
    const ok = document.querySelector('#ok');
    const cancel = document.querySelector('#cancle');
    const modal = document.querySelector('.modalDelete');
    modal.style.display = 'block';
    cancel.addEventListener('click', () => {
      modal.style.display = 'none';
    })
    ok.addEventListener('click', () => {
      Axios.post(`${this.BASE_URL}post/deleteTask.php`, { id_task: id })
        .then(req => {
          this.setTodo(req.data);
          this.setDataShow(this.page);
          modal.style.display = 'none';
        })
        .catch(err => {
          console.log(err);
        })
      console.log(id);
    })

  }
  searchTask = (todo_inputSearch)=>{
    todo_inputSearch.addEventListener('keydown',(e)=>{
        if(e.keyCode === 13){
          Axios.get(`${this.BASE_URL}get/searchTask.php?keyword=${e.target.value}`)
          .then(req=>{
            this.setTodo(req.data);
            this.setDataShow(1);
          })
          .catch(err=>{
            console.log(err);
          })
        }
    })
  }
  render() {
    return (
      <div>
        <Container>
          <div className="row page">
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <div id="header-todoList-search">
                <div id="header-icons-search">
                  <BsSearch />
                </div>
                <div id="header-icons-inputSearch">
                  <input
                    id="todo-inputSearch"
                    type="text"
                    placeholder="Bạn muốn tìm kiếm ?"
                  />
                </div>
              </div>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div id="page-dropdown">
                <select
                  id="page-dropdown-select"
                  className="browser-default custom-select"
                >
                  <option>Sắp xếp</option>
                  <option defaultValue="1">Từ A - Z</option>
                  <option defaultValue="2">Từ Z - A</option>
                </select>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div id="header-todoList">
                <div id="header-icons-tag">
                  <AiFillTags />
                </div>
                <div id="header-icons-input">
                  <input
                    id="todo-input"
                    type="text"
                    placeholder="What needs to be done?"
                  />
                </div>
                <div id="header-icons-button">
                  <Button onClick={this.addTask}>
                    <BiAddToQueue />&nbsp;
                    ADD
                  </Button>
                </div>
              </div>
            </div>
          </div>


          <div className="row page">
            <div className="col-sm-12 page-title">
              <span>Task</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th id="page-title-contents" scope="col">Contents</th>
                  <th scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.dataShow.map((value, index) => {
                    return <TodoItem
                     congviec = {value['name_task']}
                      key={value['id_task']} task={value['name_task']} stt={index + 1} delete={() => this.deleteTask(value['id_task'])} id={value['id_task']}>
                     </TodoItem>
                  })
                }
              </tbody>
              <div className="modalDelete">
                <div className="overlay"></div>
                <div className="AlertDelete">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title"><h4>Bạn muốn xóa ?</h4></div>
                    </div>
                    <div className="card-body">
                      <Button className="btn btn-danger" id="ok">OK</Button>
                      <Button className="btn btn-success" id="cancle">Cancle</Button>
                    </div>
                  </div>
                </div>
              </div>
            </table>
            <ul className="panigination">
              {
                this.state.lengthPageNumber.map((value, index) => {
                  return <li className="Linkpage" id={index + 1} key={index} onClick={this.handlePani}>{index + 1}</li>
                })
              }
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}

export default TodoList;
