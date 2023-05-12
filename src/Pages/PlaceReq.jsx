import React, { useState } from 'react';
import Inputfield from '../Components/Inputfield'
import { ToastContainer } from 'react-toastify';
import MessButton from '../Components/MessButton';
import ToastFunctions from '../Components/ToastFunctions';

export default function PlaceReq(props) {

    const [student2UID, setUID2] = useState([])
    const [mess, setMess] = useState(false)
    const supabase = props.supabase
    const toastFunctions = new ToastFunctions()

    async function checkDuplicate() {

        const { data, error } = await supabase
            .from('messreq')
            .select()
            .eq("Sender", props.studentUID)
            .eq("Receiver", student2UID)

        if (data[0]) {
            toastFunctions.warn('Duplicate Entry')
            return 0;
        }

        if (error) {
            raiseError(error)
            return 0
        }

        return 1
    }

    function raiseError(error) {
        toastFunctions.error("Something went wrong.")
        console.error(error);
        return;
    }

    async function checkExistingReq() {
        const { data, error } = await supabase
            .from('messreq')
            .select()
            .eq("Sender", student2UID)
            .eq("Receiver", props.studentUID)

        if (data[0]) {
            toastFunctions.warn(`You already have a pending Mess Swap request from ${student2UID}`)
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

        if (!(await checkDuplicate())) {
            return 0;
        }

        if (!(await checkExistingReq())) {
            return 0;
        }

        const { error } = await supabase
            .from('messreq')
            .insert([{ time: new Date().toISOString(), Receiver: student2UID, Sender: props.studentUID, Mess: mess}])

        if (error) {
            raiseError(error)
        }
        else{
            toastFunctions.success("Request has been sent. Wait for approval.")
        }
    }

    function handleSubmitButton() {


        if (!props.studentUID) {
            toastFunctions.warn("Please Login first.")
            return;
        };

        if (!mess){
            toastFunctions.warn("Select your current Mess")
            return;
        }
        const regexPattern = /(^f[0-9]{8}$)|(^h[0-9]{11}$)/
        if (!(regexPattern.test(student2UID))) {
            toastFunctions.warn("Wrong UID format, Please Enter Again")
            setUID2("")
            return
        }

        if (student2UID === props.studentUID) {
            toastFunctions.warn("You cant swap a mess with yourself.")
            setUID2("")
            return
        }
        //Database

        handleSupabaseReq()
    }

    function handleMessButton(e){
        console.log(e.target.value);
        setMess(e.target.value)
    }

    return (
        <>
            <Inputfield id="UID1" value={props.studentUID ? props.studentUID : "Please Login"} disabled label="UID of Student 1" />
            {!(props.studentUID) || <Inputfield id="UID2" value={student2UID} onChange={(e) => { setUID2(e.target.value) }} label="UID of Student 2" />}
            {!(props.studentUID) || <MessButton id="MessHave" onChange={handleMessButton}/>}
            <button className='customBtn' onClick={handleSubmitButton}>Send Request</button>
            <ToastContainer limit={2}/>
        </>
    )
}
