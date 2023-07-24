import React from 'react'
import './Overview.css'
import Teacher from './Teacher';
import Students from './Students';



export default function Overview() {  
  return (
<>
    <h1>Sussex College Bandarawela</h1>

        <div className="row">
  <div className="column"> 
    <Teacher/>
  </div>
  <div className="column">
    <Students/>
  </div>
    </div>
    </>
  )
}
