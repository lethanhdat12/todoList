import React,{useEffect,useState} from "react";
import "./NewTodoList.scss";
import "./TodoList.scss";
import {BrowserRouter as Router,Switch,Route,Link,useParams} from "react-router-dom";
import { AiFillCodeSandboxCircle, AiFillStepBackward, } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { Button, Container, Table } from "react-bootstrap";
import NewTodoListItem from "./NewTodoListItem";
import Axios from 'axios';
function NewTodoList(props) {
  let { id,congviec } = useParams();
  const URL_GET_LISTTASK  =  "http://localhost/API/"; 
  const [listdata ,setListdata] = useState([]);
  useEffect(()=>{
   Axios.get(`${URL_GET_LISTTASK}get/getListItemsTask.php?idlistTask=${id}`)
   .then(req=>{
     setListdata(req.data); 
   })
   .catch(err=>{
     console.log(err);
   })
  },[])
  const handleAddTaskItem  = ()=>{
      const taskItem = document.querySelector('#todo-input').value;
      Axios.post(`${URL_GET_LISTTASK}post/addTaskItems.php`,{
        valueTask : taskItem,
        id_task : id,
      }).then(req=>{
        setListdata(req.data);
        document.querySelector('#todo-input').value = "";
      }).catch(err=>console.log(err))

  }
  const handleDeleleTaskItem = (id_taskItems)=>{
    console.log('xin chao');
      Axios.post(`${URL_GET_LISTTASK}post/deteleTaskItem.php`,{
        id_taskItems : id_taskItems,
        id_task : id,
      })
            .then(req=>setListdata(req.data))
            .catch(err=>console.log(err))
  }
  return (
    <div>
      <Container>
        <div id="page-header">
          <hr></hr>
        </div>
        <div className="row page">
          <div className="col-sm-12 page-title">
            <span>Chi tiết nội dung công việc</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div id="page-section">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td className="chitietcongviec"> {congviec} </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div id="page-section-button">
                    <div id="header-todoList">
                      <div id="header-icons-tag">
                        <GrAddCircle />
                      </div>
                      <div id="header-icons-input">
                        <input
                          id="todo-input"
                          type="text"
                          placeholder="Thêm nội dung ..."
                        />
                      </div>
                      <div id="header-icons-button">
                        <Button onClick={handleAddTaskItem}>
                          <BiAddToQueue />
                            &nbsp; ADD
                          </Button>
                      </div>
                    </div>
                  </div>
                  <Table responsive="sm" striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th id="page-section-th">Step</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>

                      {listdata.map((value,index)=>{
                        return  <NewTodoListItem stt={index + 1} tieude={value['item']} key={index}   delete={()=>handleDeleleTaskItem(value['id_listItemTask'])}></NewTodoListItem>
                      })}
        
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="page-button">
          <Link to="/">
            <Button id="back">
              <AiFillStepBackward />
                &nbsp; BACK
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default NewTodoList;
