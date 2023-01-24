import React,{useState, useEffect, useRef} from "react";
import axios from "axios";
import { API_URL } from '../src/api/URL';
import './App.css';
import img1 from'./images/avatar.png';
 import img2 from './images/employees-waves.gif';
import img3 from './images/image1.png';

function App() {
  const [id,setId]=useState('')
  const [firstName,setFirstname]=useState('')
  const [lastName,setLastname]=useState('')
  const [mobileNumber,setMobilenumber]=useState('')
  const [email,setEmail]=useState('')
  const [dob,setDob]=useState('')
  const [address,setAddress]=useState('')
  const [accountNumber,setAccountnumber]=useState('')
  const [ifscCode,setIfsccode]=useState('')
  const [bankName,setBankname]=useState('')
  const[apiData,setAPIData] = useState([]);
  const[edit,setEdit]=useState(false);
  const[active,setActive]=useState(null)
  const ref = useRef();
  
  const postData = async (e) =>{
    e.preventDefault();
    await axios.post(API_URL,{         
         firstName,
         lastName,
         mobileNumber,
         email,
         dob,
         address,
         accountNumber,
         ifscCode,
         bankName
    });
   
    setFirstname ('')
    setLastname('')
    setMobilenumber('')
    setEmail('')
    setDob('')
    setAddress('')
    setAccountnumber('')
    setIfsccode('')
    setBankname('')

    setAPIData([...apiData])
  }


  const editData = async (id,event) => {
    event.preventDefault();
    await axios.put(API_URL + id,{         
         firstName,
         lastName,
         mobileNumber,
         email,
         dob,
         address,
         accountNumber,
         ifscCode,
         bankName
    });
   
    setFirstname ('')
    setLastname('')
    setMobilenumber('')
    setEmail('')
    setDob('')
    setAddress('')
    setAccountnumber('')
    setIfsccode('')
    setBankname('')

    if(edit) {
      let copy = apiData;
      Object.assign(copy[active])
      setAPIData([...copy]);
      setEdit(false)
      setActive(null)
      }
      else{
        setAPIData([...apiData])
      }
  }

  const onEditClick = async(index,id) =>{
    
   await axios.put(API_URL + id)
   const data =apiData [index];
   setFirstname (data.firstName)
   setLastname(data.lastName)
   setMobilenumber(data.mobileNumber)
   setEmail(data.email)
   setDob(data.dob)
   setAddress(data.address)
   setAccountnumber(data.accountNumber)
   setIfsccode(data.ifscCode)
   setBankname(data.bankName)
   setActive(index)
   setEdit(true) 
   setId(id)
  }
  
  const callGetAPI = async ()=>{
    const resp = await axios.get(API_URL);
     setAPIData(resp.data);

     console.log(resp);
  }

 const deleteUser = async (id) => {
   await axios.delete(API_URL + id)
   setEdit(false);
   // Clear Input Forms
   setFirstname ('')
   setLastname('')
   setMobilenumber('')
   setEmail('')
   setDob('')
   setAddress('')
   setAccountnumber('')
   setIfsccode('')
   setBankname('')

   callGetAPI();
 } 

   useEffect(()=>{
    console.log("API calling..")
    callGetAPI();
   },[firstName,lastName,mobileNumber,email,dob,address,accountNumber,ifscCode,bankName,edit]);
     
  return (   
      <>
      <div className="main2">   
      <div className="main1">
      <img className="img1" src={img3} alt="employees" />
      {edit?
       <h3 className="padding1" style={{color: "#2D0658"}} >Edit Employee</h3>:
        <h3 className="padding1" style={{color: "#2D0658"}}> Add New Employee</h3>
        }   
        <h4 className="Details">Personal Details</h4>
      <form >
      <div className="row">
      <input  type="text" placeholder="First Name" value={firstName} onChange={event=>setFirstname(event.target.value)}/>
      <div className="row1">
      <input type="text" placeholder="Last Name" value={lastName} onChange={event=>setLastname(event.target.value)}/>
      </div>
      </div>
      <div className="row2">
      <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={event=>setMobilenumber(event.target.value)}/>
      <div className="row1">
      <input type="text" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      </div>
      <div className="row3">

      {/* <input type="date" placeholder="Date of Birth" value={dob} onChange={event=>setDob(event.target.value)}/> */}
      
      <input
        type="text"
        placeholder="Date of Birth"
        ref={ref}
        value={dob}
        onChange={event => setDob(event.target.value)}
        onFocus={() => (ref.current.type = "date")}
        onBlur={() => (ref.current.type = "text")}
      />

      </div>
      <div className="row4">
      <input className="width" type="text" placeholder="Address" value={address} onChange={event=>setAddress(event.target.value)}/>
      </div>
      <h4 className="Details1">Bank Details</h4>
      <div className="row">
      <input type="text" placeholder="Account Number" value={accountNumber} onChange={event=>setAccountnumber(event.target.value)}/>
      <div className="row1">
      <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={event=>setIfsccode(event.target.value)}/>
      </div>
      </div>
       <div className="row4">
      <input className="width" type="text" placeholder="Bank Name" value={bankName} onChange={event=>setBankname(event.target.value)}/>
      </div>
      {edit ? <button type="submit" className="btn" onClick={(event) => editData(id, event)}>{"Update"}</button>  : <button type="submit" className="btn" onClick={postData}>{"Save"}</button>}  
      
      </form>
      </div>
    
         <div className="main3">
      {apiData.length> 0 ? (   
           apiData.map((data,index) =>(

       <div className="main" key={data.id}>          
      <div  className="mini1">
        
      <i id="icon1" className="fa fa-user"></i>
      </div>

      <div>
        <h6  className="p1">{data.firstName}</h6>
      </div>
      
      <div>
        <h6 className="p11">{data.lastName}</h6>
      </div>

      <div className="mini2">
      <i id="icon2" className="fa fa-phone"></i>
      </div>
      
      <div>
        <h6 className="p2">{data.mobileNumber}</h6>
      </div>
      <div>
      <i id="icon3" className="fa fa-envelope"></i>
      </div>
      <div>
        <h6 className="p13">{data.email}</h6>
      </div>
      <div>
      <img className="p14" src={img1} alt="guest" />
      </div>
      <div className="mini3">
      <i id="icon4" className="fa fa-calendar"></i>
      </div>
      <div>
        <h6 className="p3">{data.dob}</h6>
      </div>
      <div className="mini4">
      <i id="icon5" className="fa fa-map-marker"></i>
      </div>
      <div>
        <h6 className="p4">{data.address}</h6> 
      </div>
      <div className="mini5">
      <button  id="icon6" className="btn1" onClick={()=>onEditClick(index,data.id)} >EDIT</button>
      </div>
      <div>     
        <button id="p5" type="delete" className="btn2" onClick={()=> deleteUser(data.id)}>DELETE</button>
      </div>     
      </div> 
             
      ))
      ):(
           <div>
        <img className="img" src={img2} alt="employee" />
        <h4 className="padding" style={{ color: "#2D0658" }}>No Employees found!</h4>
        </div>
      )
    } 
    </div>
    </div>
      </>
      
  )
}
export default App;


