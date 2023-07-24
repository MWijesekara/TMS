import React from 'react'
import './Overview.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Students() {
  return (
    <div>
         <div className='Teacher'>
    <h1>No. of Students:</h1>
    <div className='number'>
      <p>24</p>
    </div>
    <div className='Button_container'>
    <Button variant="contained" className='Btn'>Add Student</Button>
    <Button variant="contained" className='Btn'>Delete Student</Button>
  </div>
  </div>
    </div>
  )
}
