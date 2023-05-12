import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import "./Styles/index.css"
import "react-toastify/dist/ReactToastify.css";

import jwt_decode from 'jwt-decode';
import { createClient } from '@supabase/supabase-js';
import { toast, ToastContainer } from 'react-toastify';

import GoogleOAuth from './Components/GoogleOAuth';
import PlaceReq from './Pages/PlaceReq'
import ApproveReq from './Pages/ApproveReq'
import Header from './Components/Header'

export default function MainPage() {

  const responseMessage = (response) => {
    const studentData = jwt_decode(response.credential)
    let uniqueID = studentData.email.match(/^([^@]*)@/)[1]
    setUID(uniqueID)
    setName(studentData.name)
    document.getElementById("google-oauth").hidden = true
  }

  const [studentUID, setUID] = useState();
  const [studentName, setName] = useState();
  const [pageStatus, setPageStatus] = useState();
  const supabase = createClient(process.env.REACT_APP_SUPABASEURL, process.env.REACT_APP_SUPABASEKEY)

  async function checkMessApproved(conditon) {
    let condition = conditon
    const { data, error } = await supabase
      .from('messreq')
      .select()
      .eq(condition, studentUID)
      .eq("Approved", true)

    if (error) {
      alert("Something went wrong")
      console.error(error);
      return
    }

    if (data[0]) {
      alert("Mess Swapped Already, cannot place another request.")
      setUID(false)
      window.location.replace("https://swd.bits-hyderabad.ac.in")
    }
  }

  checkMessApproved("Sender")
  checkMessApproved("Receiver")



  return (
    <>
      <Header />
      <GoogleOAuth onSuccess={responseMessage} ></GoogleOAuth>
      <button className='customBtn' hidden={studentUID ? false : true} onClick={
        () => {
          document.getElementById("google-oauth").hidden = false
          setUID(false)
          setPageStatus(0)
        }
      }>Switch Account</button>
      {pageStatus ? <button className='customBtn' onClick={() => { setPageStatus(!pageStatus) }}>Place Requests</button> : <button className='customBtn' disabled={studentUID ? false : true} onClick={() => { setPageStatus(!pageStatus) }}>Approve Requests</button>}
      {!(studentUID) || <h2>Welcome, <span style={{ color: 'cyan' }}>{studentName}</span></h2>}
      {pageStatus ? <ApproveReq studentUID={studentUID} supabase={supabase}></ApproveReq> : <PlaceReq studentUID={studentUID} supabase={supabase}></PlaceReq>}
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainPage />
);
