import React, { useState, useEffect } from 'react'
import RequestPane from '../Components/RequestPane'
import ReqSkeleton from '../Components/ReqSkeleton'
import { ToastContainer } from 'react-toastify';
import ToastFunctions from '../Components/ToastFunctions';

export default function ApproveReq(props) {


  const [data, setData] = useState()
  const supabase = props.supabase
  const toastFunctions = new ToastFunctions()

  function raiseError(error) {
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
      .neq("Mess", parseInt(props.mess))


    if (error) {
      raiseError(error)
    }
    setData(data)
  }

  async function handleReqPaneClick(e, condition,id) {

    if (condition === "Reject") {
      const rejectedData = data[id]
      try {
        await supabase
          .from('messreq')
          .update({Rejected:true})
          .eq("id", rejectedData.id)
        toastFunctions.success(`Mess Swap request from ${rejectedData.Sender} rejected`)
        return
      }
      catch (e) {
        raiseError()
      }
    }

    const approvedData = data[id]
    async function deleteOtherReqs() {

      try {
        await supabase
          .from('messreq')
          .delete()
          .eq("Sender", props.studentUID)
      }
      catch (e) {
        raiseError()
      }

      const { error } = await supabase
        .from('messreq')
        .delete()
        .eq("Receiver", props.studentUID)
        .neq("id", approvedData.id)

      if (error) {
        raiseError()
      }
      else {
        toastFunctions.success("Mess swap has been approved. Contact SWD for further details.")
      }
    }

    await deleteOtherReqs()

    const { error } = await supabase
      .from('messreq')
      .update({ Approved: true })
      .eq("id", approvedData.id)

    if (error) {
      raiseError()
    }
  }


  useEffect(() => {
    setData(false)
    if (props.mess) {
      fetchReqs()
    }
  }, [props.mess])


  if (data) {
    return displayRequests()
  }
  else if (!data) {
    return displaySkeleton()
  }


  function displayRequests() {
    return data && (
      <div>
        <h3>Pending requests</h3>
        {data.map((request, index) => {
          return <RequestPane id={`${index}`} sender={request.Sender} timestamp={new Date(request.time).toLocaleString()} mess={request.Mess} onClick={handleReqPaneClick}></RequestPane>
        })}
        <ToastContainer limit={2} />
      </div>
    )
  }

  function displaySkeleton() {
    return (<>
      <h3>Pending requests</h3>
      <ReqSkeleton />
      <ToastContainer limit={2} />
    </>)
  }
}