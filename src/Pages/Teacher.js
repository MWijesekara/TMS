import React, { useEffect, useState } from 'react'
import './Overview.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import {Typography } from '@mui/material';
import { db } from '../firebase';
import { collection,addDoc,getDocs} from 'firebase/firestore';
export default function Teacher() {
        const [open, setOpen] = React.useState(false);
        const [Name, setName] = React.useState('');
        const [Subject, setSubject] = React.useState('');
        const [Grade, setGrade] = React.useState('');
        const [NIC,SetNIC] = useState('')
        const [AppDate, setAppDate] = React.useState(Date);
        const [Teachers,SetTeachers] = useState([])
        const CollectionRef = collection(db,"Teacher")

        const CreateTeacher = async()=>{
            await addDoc(CollectionRef,{Name:Name,Subject:Subject,AppDate:AppDate,TeacherGrade:Grade,ID:NIC});
            console.log("sucessful")
            setOpen(false);
          }
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
        useEffect(()=>{
            const newTeacher = async()=>{
                const newteach = await getDocs((CollectionRef));
                SetTeachers(newteach.docs.map((teacher)=>({...teacher.data()})));
            }
            newTeacher();
        },[])

  const top100Films = ['3 II', '3 I','2 II','2 II','1 ']
  return (
    <div>
         <div className='Teacher'>
    <h1>No. of Teachers:</h1>
    <div className='number'>
      <p>{Teachers.length}</p>
    </div>
    <div className='Button_container'>
    <Button variant="contained" className='Btn' onClick={handleClickOpen}>Add Teacher</Button>
    <Button variant="contained" className='Btn'>Delete Teacher</Button>
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="NIC"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>SetNIC(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setSubject(e.target.value)}
          />
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      onChange={(event, newValue) => {
        setGrade(newValue);
      }}
      value={Grade}
      sx={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label="Teaching Grade" style={{marginTop:'3%'}}/>}
     />
            
          <Typography variant = "h6" style={{color:'grey',marginTop:'2%',marginBottom:'2%'}}>Appointment Date</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label="Subject"
            type="date"
            halfWidth
            variant="standard"
            onChange={(e)=>setAppDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={CreateTeacher}>Save Data</Button>
        </DialogActions>
      </Dialog>

  </div>
  </div>
    </div>
  )
}
