import React, { useState, useEffect } from 'react'
import RequestPane from '../Components/RequestPane'
import ReqSkeleton from '../Components/ReqSkeleton'
import { ToastContainer } from 'react-toastify';
import ToastFunctions from '../Components/ToastFunctions';


import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types'
import OutgoingReq from './OutgoingReq';

type ApproveReqProps = {
  supabase : SupabaseClient<Database>,
  studentName : string,
  studentUID : string,
  mess: string | boolean,
}

export type MessReqRow = Database['public']['Tables']['messreq']['Row']

export default function ApproveReq(props: ApproveReqProps){


  const [data, setData] = useState<Array<MessReqRow> | null>()
  const [pageStatus, setPageStatus] = useState<boolean>(false)
  const supabase = props.supabase
  const toastFunctions = new ToastFunctions()
  const [refreshData, setrefreshData] = useState<boolean>(false)

  function raiseError(error : any) {
    toastFunctions.error("Something went wrong.")
    console.error(error);
    return;
  }

  async function fetchReqs() {
    const { data, error } = await supabase
      .from('messreq')
      .select()
      .eq("Receiver", props.studentUID)
      .eq("Rejected",false)
      .neq("Approved",true)
      .neq("Mess", parseInt(props.mess as string))


    if (error) {
      raiseError(error)
      return
    }
    setData(data)
  }

  async function handleReqPaneClick(e: React.ChangeEventHandler<HTMLButtonElement>, condition :string,id:number) {

    if (condition === "Reject") {
      const rejectedData = data![id]
      try {
        await supabase
          .from('messreq')
          .update({Rejected:true})
          .eq("id", rejectedData.id)
        toastFunctions.success(`Mess Swap request from ${rejectedData.Sender} rejected`)
        setrefreshData(!refreshData)
        return
      }
      catch (e) {
        raiseError(e)
      }
    }

    const approvedData = data![id]
    async function deleteOtherReqs() {

      try {
        await supabase
          .from('messreq')
          .delete()
          .eq("Sender", props.studentUID)
      }
      catch (e) {
        raiseError(e)
      }

      const { error } = await supabase
        .from('messreq')
        .delete()
        .eq("Receiver", props.studentUID)
        .neq("id", approvedData.id)

      if (error) {
        raiseError(error)
      }
      else {
        toastFunctions.success("Mess swap has been approved. Contact SWD for further details.")
        setrefreshData(!refreshData)
      }
    }

    await deleteOtherReqs()

    const { error } = await supabase
      .from('messreq')
      .update({ Approved: true })
      .eq("id", approvedData.id)

    if (error) {
      raiseError(error)
    }

    async function setMess(){
      const { error } = await supabase
      .from('messsave')
      .insert({ UID:props.studentUID, mess: parseInt(props.mess as string) })

      if (error) {
        raiseError(error)
      }
    }

    await setMess();
  }


  useEffect(() => {
    setData(null)
    if (props.mess) {
      fetchReqs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mess,refreshData])



  if (pageStatus){
    return <OutgoingReq supabase={props.supabase} studentUID={props.studentUID} pageStatus={pageStatus} setpageStatus={setPageStatus}/>
  }
  else if (data) {
    return displayRequests()
  }
  else if (!data) {
    return displaySkeleton()
  }
  else{
    return null
  }


  function displayRequests(){
    return data! && (
      <div>
        <button className='customBtn' onClick={() => {
          setData(null)
          setPageStatus(!pageStatus)
        }}>Outgoing Requests</button>
        <h3>Incoming requests</h3>
        {data.map((request, index) => {
          return <RequestPane id={`${index}`} senderName={request.Name} sender={request.Sender} timestamp={new Date(request.time).toLocaleString()} mess={String(request.Mess)} onClick={handleReqPaneClick}/>
        })}
        <ToastContainer limit={2} />
      </div>
    )
  }

  function displaySkeleton() {
    return (<>
    <button className='customBtn'>{pageStatus?'Incoming Requests':'Outgoing Requests'}</button>
      <h3>Incoming requests</h3>
      <ReqSkeleton />
      <ToastContainer limit={2} />
    </>)
  }
}