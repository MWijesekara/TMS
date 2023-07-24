import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../firebase';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { collection,getDocs,doc} from 'firebase/firestore';

export default function BasicTable() {
    const CollectionRef = collection(db,"Teacher")
    const [Teacher,SetTeacher] = React.useState([])
    const [Index,setIndex] = React.useState(0);
    const [open,setOpen] = React.useState(false);

    React.useEffect(()=>{
        const newElement = async () =>{
            const element = await getDocs((CollectionRef));
            SetTeacher(element.docs.map((ele)=>({uid:doc.id,...ele.data()})))
        }
        newElement();
        console.log(Teacher)
    },[])

    const handleClickOpen = (key) => {
        setIndex(key)
        // SetClicked(true);
        setOpen(true);
        console.log(key)
      };
    
      const handleClose = () => {
        setOpen(false);
        
      };

      
    
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Name</h4></TableCell>
            <TableCell align="right"><h4>Subject</h4></TableCell>
            <TableCell align="right"><h4>Appointment Date</h4></TableCell>
            <TableCell align="right"><h4>Teacher Grade</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Teacher.map((teacher,i) => (
            <>
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {teacher.Name}
              </TableCell>
              <TableCell align="right">{teacher.Subject}</TableCell>
              <TableCell align="right">{teacher.AppDate}</TableCell>
              <TableCell align="right">{teacher.TeacherGrade}</TableCell>
              <TableCell align="right"><Button onClick={()=>handleClickOpen(i)}>View</Button></TableCell>
            </TableRow>
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Teacher Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              value={Teacher[Index].Name}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="NIC"
              value={Teacher[Index].ID}
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Subject"
            value={Teacher[Index].Subject}
              type="text"
              fullWidth
              variant="standard"
            />
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Appointment Date"
            value={Teacher[Index].AppDate}
              type="text"
              halfWidth
              variant="standard"
              style={{marginRight:'5%'}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Teacher Grade"
              value={Teacher[Index].TeacherGrade}
              type="text"
              halfWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
   </>

  );
}