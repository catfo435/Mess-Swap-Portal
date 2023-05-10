import React, { useState } from 'react';
import Inputfield from './Inputfield'
import jwt_encode from 'jwt-encode'

export default function PlaceReq(props) {

    const [student2UID, setUID2] = useState([])

    function handleSubmitButton() {

        if (localStorage.getItem(props.studentUID)){
            alert("Cannot place more than one swap requests.")
            return;
        }

        if (!props.studentUID) {
            alert("Please Login first.")
            return;
        };
        const regexPattern = /(^f[0-9]{8}$)|(^h[0-9]{11}$)/
        if (!(regexPattern.test(student2UID))) {
            alert("Wrong UID format, Please Enter Again")
            setUID2("")
            return
        }

        if (student2UID === props.studentUID) {
            alert("You cant swap a mess with yourself.")
            setUID2("")
            return
        }

        alert("Request has been sent. Wait for approval.")
        //LocalStorage
        
        const reqData = {
            sender : props.studentUID, 
            receiver: student2UID,
            time : Date()
        }

        localStorage.setItem(props.studentUID,jwt_encode(reqData,props.studentUID))
    }

    return (
        <>
            <Inputfield id="UID1" value={props.studentUID ? props.studentUID : "Please Login"} disabled label="UID of Student 1"></Inputfield>
            <br></br>
            {!(props.studentUID) || <Inputfield id="UID2" value={student2UID} onChange={(e) => { setUID2(e.target.value) }} label="UID of Student 2"></Inputfield>}
            <br></br>
            <button onClick={handleSubmitButton}>Send Request</button>
        </>
    )
}
