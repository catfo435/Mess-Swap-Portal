import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import "./Styles/index.css"
import "react-toastify/dist/ReactToastify.css";

import jwt_decode from 'jwt-decode';
import { createClient } from '@supabase/supabase-js';
import { ToastContainer } from 'react-toastify';
import ToastFunctions from './Components/ToastFunctions';

import GoogleOAuth from './Components/GoogleOAuth';
import PlaceReq from './Pages/PlaceReq'
import ApproveReq from './Pages/ApproveReq'
import Header from './Components/Header'
import MessButton from './Components/MessButton';

export default function MainPage() {

  const toastFunctions = new ToastFunctions()

  const responseMessage = (response) => {
    const studentData = jwt_decode(response.credential)
    let uniqueID = studentData.email.match(/^([^@]*)@/)[1]
    setUID(uniqueID)
    setName(studentData.name)
    document.getElementById("google-oauth").hidden = true
  }

  function handleSectionSwap() {
    checkMessApproved("Sender")
    checkMessApproved("Receiver")
    setPageStatus(!pageStatus)
  }

  const [studentUID, setUID] = useState();
  const [studentName, setName] = useState();
  const [mess, setMess] = useState(false)
  const [pageStatus, setPageStatus] = useState();
  const supabase = createClient(process.env.REACT_APP_SUPABASEURL, process.env.REACT_APP_SUPABASEKEY)


  function handleMessButton(e) {
    setMess(e.target.value)
  }

  async function checkMessApproved(conditon) {
    if (!studentUID) return
    let condition = conditon
    const { data, error } = await supabase
      .from('messreq')
      .select()
      .eq(condition, studentUID)
      .eq("Approved", true)

    if (error) {
      toastFunctions.error("Something went wrong")
      console.error(error);
      return
    }

    if (data[0]) {
      toastFunctions.warn("Mess Swapped Already, cannot place another request.")
      setTimeout(()=>{
        window.location.replace("https://swd.bits-hyderabad.ac.in")
      },3000)
    }
  }

  useEffect(() => {
    checkMessApproved("Sender")
    checkMessApproved("Receiver")
  }, [studentUID])


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
      {pageStatus ? <button className='customBtn' onClick={handleSectionSwap}>Place Requests</button> : <button className='customBtn' disabled={studentUID ? false : true} onClick={handleSectionSwap}>Approve Requests</button>}
      {!(studentUID) || <h2>Welcome, <span style={{ color: 'cyan' }}>{studentName}</span></h2>}
      {!(studentUID) || <MessButton id="MessHave" onChange={handleMessButton} />}
      {pageStatus ? <ApproveReq mess={mess} studentUID={studentUID} supabase={supabase}></ApproveReq> : <PlaceReq mess={mess} studentUID={studentUID} supabase={supabase}></PlaceReq>}
      <ToastContainer limit={2}/>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainPage />
);
