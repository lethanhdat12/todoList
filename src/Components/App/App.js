import React, { Component } from "react";
// import NewTodoList from "../Contents/TodoList/NewTodoList";
import "./App.scss";
import {BrowserRouter as  Router} from "react-router-dom";
import Header from "../Header/Header";
import Direct from "../Direct";
import Footer from "../Footer/Footer";

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Header></Header>
               <Direct></Direct>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}
export default App;
