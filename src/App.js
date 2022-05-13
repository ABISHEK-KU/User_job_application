import React from "react";
import './App.css';
import { Link, Route } from 'react-router-dom'
import JobForm from "./Component/JobForm";
import DashBoard from "./Component/DashBoard";

function App(props) {

  return (
    <div>
      <ul className='navbarul'>
        <li className='navbarli'><Link className='navbarLink' to='/home'>Home</Link></li>
        <li className='navbarli'><Link className='navbarLink' to='/dash'>Dash Board</Link></li>
      </ul>
      <h1 className='title'>APPLY FOR JOB</h1>
      <Route path='/home'
        render={(props) => {
          return <div className="form"><JobForm /></div>
        }
        }
        exact={true} />
      <Route path='/dash' component={DashBoard} exact={true} />
    </div>
  )
}
export default App