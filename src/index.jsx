import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"

import jwt_decode from 'jwt-decode';

import GoogleOAuth from './GoogleOAuth';
import PlaceReq from './PlaceReq'
import ApproveReq from './ApproveReq'
import Header from './Header'

export default function MainPage() {

  const responseMessage = (response) => {
    const studentData = jwt_decode(response.credential)
    if (studentData.hd !== "hyderabad.bits-pilani.ac.in") {
      alert("Invalid Email. This portal is meant for BITS Pilani, Hyderabad Students only.")
      return;
    }
    let uniqueID = studentData.email.match(/^([^@]*)@/)[1]
    setUID(uniqueID)
    document.getElementById("google-oauth").hidden = true
  }


  const [studentUID, setUID] = useState();
  const [pageStatus,setPageStatus] = useState();

  return (
    <>
      <Header />
      <br></br>
      <GoogleOAuth onSuccess={responseMessage} ></GoogleOAuth>
      <button hidden={studentUID ? false : true} onClick={
        () => {
          document.getElementById("google-oauth").hidden = false
          setUID(false)
          setPageStatus(0)
        }
      }>Switch Account</button>
      <br></br>
      <br></br>
      {pageStatus?<button onClick={() => {setPageStatus(!pageStatus)}}>Place Requests</button>:<button disabled={studentUID ? false : true} onClick={() => {setPageStatus(!pageStatus)}}>Approve Requests</button>}
      <br></br>
      <br></br>
      {pageStatus?<ApproveReq studentUID={studentUID}></ApproveReq>:<PlaceReq studentUID={studentUID}></PlaceReq>}
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainPage />
);
