import React, { useState } from 'react';
import Inputfield from '../Components/Inputfield'
import { ToastContainer } from 'react-toastify';
import ToastFunctions from '../Components/ToastFunctions';

export default function PlaceReq(props) {

    const [student2UID, setUID2] = useState([])
    const supabase = props.supabase
    const toastFunctions = new ToastFunctions()

    async function checkDuplicate() {

        const { data, error } = await supabase
            .from('messreq')
            .select()
            .eq("Sender", props.studentUID)
            .eq("Receiver", student2UID)

        if (data[0]) {
            if (data[0].Rejected) {
                toastFunctions.error("Mess Swap Request was rejected")
                return 0;
            }
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
            if (data[0].Rejected) {
                toastFunctions.error("Mess Swap Request was rejected")
                return 0;
            }
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

        try {
            await supabase
                .from('messreq')
                .insert([{ time: new Date().toISOString(), Receiver: student2UID, Sender: props.studentUID, Mess: props.mess }])
            toastFunctions.success("Request has been sent. Wait for approval.")
        }

        catch (error) {
            raiseError(error)
        }
    }

    function handleSubmitButton() {


        if (!props.studentUID) {
            toastFunctions.warn("Please Login first.")
            return;
        };

        if (!props.mess) {
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

    return (
        <>
            <Inputfield id="UID1" value={props.studentUID ? props.studentUID : "Please Login"} disabled label="UID of Student 1" />
            {!(props.studentUID) || <Inputfield id="UID2" value={student2UID} onChange={(e) => { setUID2(e.target.value) }} label="UID of Student 2" />}
            <button className='customBtn' onClick={handleSubmitButton}>Send Request</button>
            <ToastContainer limit={2} />
        </>
    )
}
