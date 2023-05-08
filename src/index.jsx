import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header'
import "./index.css"
import jwt_decode from 'jwt-decode'
import PlaceReq from './PlaceReq';
import GoogleOAuth from './GoogleOAuth';

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

  return (
    <>
      <Header />
      <br></br>
      <GoogleOAuth onSuccess={responseMessage} ></GoogleOAuth>
      <button hidden={studentUID ? false : true} onClick={
        () => {
          document.getElementById("google-oauth").hidden = false
          setUID(false)
        }
      }>Switch Account</button>
      <br></br>
      <br></br>
      <PlaceReq studentUID={studentUID}></PlaceReq>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainPage />
);
