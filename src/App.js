import React, { useContext, useEffect, useState } from 'react'
import "./App.css"
import Sidebar from './Components/Sidebar';
import Chat from "./Components/Chat"
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import Login from './Components/Login';
import { useStateValue } from './Components/userContext';
const App = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
      <div className = "App">
        {user ? (
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
        ) : (
          <Login />
        )}
      </div>
  )
}

export default App
