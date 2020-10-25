import React, { Component } from 'react'
import {BrowserRouter as Switch,Route} from "react-router-dom";
import TodoList from './Contents/TodoList/TodoList';
import NewTodoList from './Contents/NewTodoList';
export default class Direct extends Component {
    render() {
        return (
            <div>
              <Switch>
                <Route exact path="/">
                  <TodoList/>
                </Route>
                <Route path="/detail/:id/:congviec">
                  <NewTodoList></NewTodoList>
                </Route>
              </Switch>
            </div>
        )
    }
}
