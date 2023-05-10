import React, { useState } from 'react';
import Inputfield from '../Components/Inputfield'

export default function PlaceReq(props) {

    const [student2UID, setUID2] = useState([])

    async function handleSupabaseReq() {
        const supabase = props.supabase
        const { error } = await supabase
            .from('messreq')
            .insert([{ time: new Date().toISOString(), Receiver: student2UID, Sender: props.studentUID }])

        if (error) {
            //Sender column is set to unique, will give error 23505 if mess request is already placed
            if (error.code === "23505") { //Incase the localstorage gets cleared
                alert("Cannot place more than one swap requests.")
                localStorage.setItem(props.studentUID, true)
                return;
            }
            alert("Something went wrong.")
            console.error(error);
            return;
        }

        alert("Request has been sent. Wait for approval.")
        localStorage.setItem(props.studentUID, true)
    }

    function handleSubmitButton() {

        if (localStorage.getItem(props.studentUID)) {
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
        //Database

        handleSupabaseReq()
    }

    return (
        <>
            <Inputfield id="UID1" value={props.studentUID ? props.studentUID : "Please Login"} disabled label="UID of Student 1"></Inputfield>
            {!(props.studentUID) || <Inputfield id="UID2" value={student2UID} onChange={(e) => { setUID2(e.target.value) }} label="UID of Student 2"></Inputfield>}
            <button onClick={handleSubmitButton}>Send Request</button>
        </>
    )
}
