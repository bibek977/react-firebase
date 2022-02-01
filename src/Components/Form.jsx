import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

export default function Form() {

  const [data, setdata] = useState({
    fname : '',
    lname : '',
    password : '',
    age : '',
    search : ''
  });
  
  let name,value
  const getData = (e)=>{
    name = e.target.name
    value = e.target.value

    setdata({...data, [name]:value})
    // console.log(data);
  }

  const postData=async(event)=>{
    event.preventDefault()

    const {fname,lname,password,age,search} = data
    const res= await fetch('https://formfillup-8c8e8-default-rtdb.firebaseio.com/sampleForm.json',
    {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        fname,
        lname,
        password,
        age,
        search
      })
    })

    if(res){

      setdata({
        fname : '',
        lname : '',
        password : '',
        age : '',
        search : ''
      })
    }
    else{
      alert("form incomplete")
    }

  }

  return (<>
  <form method='POST'>

        <div>
        <TextField
          required
          id="standard-required"
          label="First Name"
          defaultValue="Hello World"
          variant="standard"
          onChange = {getData}
          value = {data.fname}
          name = "fname"
        />
        <TextField
          // disabled
          id="standard-disabled"
          label="Last Name"
          defaultValue="Hello World"
          variant="standard"
          onChange = {getData}
          value = {data.lname}
          name = "lname"
          />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange = {getData}
          value = {data.password}
          name = 'password'
          />
    
        <TextField
          id="standard-number"
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange = {getData}
          value = {data.age}
          name = 'age'
          />
        <TextField
          id="standard-search"
          label="Program"
          type="search"
          variant="standard"
          onChange = {getData}
          value = {data.search}
          name = 'search'
          />

          <button type='submit' onClick={postData}>Submit</button>
        
      </div>
          </form>

  </>)
}
