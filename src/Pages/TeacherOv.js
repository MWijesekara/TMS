import React, { useEffect, useState } from 'react'
import './TeacherOv.css'
import Button from '@mui/material/Button';
import BasicTable from '../Components/Table';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {query,where,collection,onSnapshot,doc,updateDoc,deleteDoc} from 'firebase/firestore'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function TeacherOv() {
    const [Serach,SetSearch] = useState('Name');
    const [keyword,SetKeyword] = useState('');
    const [elements,setelements] = useState([])
    const [open,setOpen] = useState(false)
    const [index,setIndex] = useState(0);
    const CollectionRef = collection(db,"Teacher")
    const [Name,setName] = useState("")
    const [Subject,setSubject] = useState("")
    const [AppDate,setAppDate] = useState(Date)
    const [NIC,SetNIC] = useState("")
    const [TeacherGrade,SetTeachGrade] = useState("")
    const [UID,SetUID] = useState("")

    useEffect(()=>{
    const q=query(CollectionRef,where(Serach,"==",keyword ))

    const query1 = onSnapshot(q,querySnapshot=>{
        let teach = [];
        querySnapshot.forEach(doc => {
            teach.push({uid:doc.id,...doc.data()})
            setelements(teach)
        })
        
       console.log("Hello this is useEffect")
       console.log(elements)
       console.log(index)
    })
    return () => query();
},[keyword])


const handleDelete= async(dele)=>{
    const selectedDoc = doc(CollectionRef,dele);

    await deleteDoc(selectedDoc)
    SetKeyword('')
}
const handleEdit = (key,ID) => {
    SetUID(ID)
    setIndex(key)
    setOpen(true);
    setName(elements[index].Name)
    setSubject(elements[index].Subject)
    setAppDate(elements[index].AppDate)
    SetNIC(elements[index].ID)
    SetTeachGrade(elements[index].TeacherGrade)
    console.log(key)
  };
  const handleClose = () => {
    setOpen(false);
    
  };  
const handEdit = async (Uid,Name,NIC,Subject,AppDate,TeacherGrade) =>{
    
    const selectedDoc = doc(db,"Teacher",Uid);
    await updateDoc(selectedDoc,{
        Name : Name,
        Subject :Subject,
        ID : NIC,
        AppDate: AppDate,
        TeacherGrade: TeacherGrade
        
    })
    console.log(selectedDoc)
    SetKeyword('')
    setOpen(false)
    

}  

  return (
    <div className='row'>
        <div className='column' style={{overflow:'auto'}}>
            <BasicTable/>
        </div>
        <div className='column'>
            <div>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search" variant="outlined" style={{width:'80%'}} onChange={(e)=>SetKeyword(e.target.value)}/>
      </Box>

            </div>
        <div className = 'Btn_Container'>
        <h4>Search By:</h4>
        <Button style={{border:'1px solid black'}} onClick={()=>SetSearch('Name')}>Name</Button>
        <Button style={{border:'1px solid black'}} onClick={()=>SetSearch('ID')}>ID</Button>
        <Button style={{border:'1px solid black'}} onClick={()=>SetSearch('Subject')}>Subject</Button>
        <Button style={{border:'1px solid black'}} onClick={()=>SetSearch('AppDate')}>Appointment date</Button>
        </div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">NIC</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="right">Teacher Grade</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elements.map((row,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {row.Name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ID}</StyledTableCell>
              <StyledTableCell align="right">{row.Subject}</StyledTableCell>
              <StyledTableCell align="right">{row.TeacherGrade}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={()=>{handleDelete(row.uid)}}>X</Button><Button onClick={()=>{handleEdit(i,row.uid)}}>Edit</Button></StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {open && <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Teacher Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              defaultValue={elements[index].Name}
              onChange={(e)=>setName(e.target.value)}
              type="text"
              fullWidth
              focused
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="NIC"
              defaultValue={elements[index].ID}
              onChange={(e)=>SetNIC(e.target.value)}
              type="text"
              fullWidth
              focused
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Subject"
              defaultValue={elements[index].Subject}
              onChange={(e)=>setSubject(e.target.value)}
              type="text"
              fullWidth
              focused
              variant="standard"
            />
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Appointment Date"
              defaultValue={elements[index].AppDate}
              onChange={(e)=>setAppDate(e.target.value)}
              type="text"
              halfWidth
              focused
              variant="standard"
              style={{marginRight:'5%'}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Teacher Grade"
              defaultValue={elements[index].TeacherGrade}
              onChange={(e)=>SetTeachGrade(e.target.value)}
              type="text"
              halfWidth
              focused
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={()=>handEdit(UID,Name,NIC,Subject,AppDate,TeacherGrade)}>Edit</Button>
          </DialogActions>
        </Dialog>
}
        </div>
    </div>
  )
}
