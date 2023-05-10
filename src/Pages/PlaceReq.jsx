import React, { useState } from 'react';
import Inputfield from '../Components/Inputfield'

export default function PlaceReq(props) {

    const [student2UID, setUID2] = useState([])
    const supabase = props.supabase

    async function checkDuplicate() {

        const { data, error } = await supabase
            .from('messreq')
            .select()
            .eq("Sender", props.studentUID)
            .eq("Receiver", student2UID)

        if (data[0]) {
            alert("Duplicate Entry Found")
            return 0;
        }
        
        if (error){
            raiseError(error)
            return 0
        }

        return 1
    }

    function raiseError(error) {
        alert("Something went wrong.")
        console.error(error);
        return;
    }

    async function checkExistingReq(){
        const { data, error } = await supabase
            .from('messreq')
            .select()
            .eq("Sender", student2UID)
            .eq("Receiver", props.studentUID)

        if (data[0]) {
            alert(`You already have a pending Mess Swap request from ${student2UID}`)
            setUID2("")
            return 0;
        }

        if (error) {
            raiseError(error)
            return 0
        }

        return 1
    }

    async function handleSupabaseReq() {

        if (!(await checkDuplicate())){
            return 0;
        }

        if (!(await checkExistingReq())){
            return 0;
        }

        const { error } = await supabase
            .from('messreq')
            .insert([{ time: new Date().toISOString(), Receiver: student2UID, Sender: props.studentUID }])

        if (error) {
            raiseError(error)
        }

        alert("Request has been sent. Wait for approval.")
    }

    function handleSubmitButton() {


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
            {!(props.studentUID) || <Inputfield id="UID1" label="Name of Student 1" value={props.studentName} disabled />}
            <Inputfield id="UID1" value={props.studentUID ? props.studentUID : "Please Login"} disabled label="UID of Student 1" />
            {!(props.studentUID) || <Inputfield id="UID2" value={student2UID} onChange={(e) => { setUID2(e.target.value) }} label="UID of Student 2" />}
            <button onClick={handleSubmitButton}>Send Request</button>
        </>
    )
}
