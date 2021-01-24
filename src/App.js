import React, { useContext, useState } from 'react'
import "./App.css"
import Sidebar from './Components/Sidebar';
import Chat from "./Components/Chat"
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import Login from './Components/Login';
import { useStateValue } from './Components/userContext';
const App = () => {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);
  return (
      <div className = "App">
        {!user ? (
          <Login />
        ) : (
          <div className = "App__body">
          <Router>
          <Sidebar />
            <Switch>
              <Route path ="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path = "/">
                <Chat/>
              </Route>
            </Switch>
          </Router>
        </div>
        )}
      </div>
  )
}

export default App
