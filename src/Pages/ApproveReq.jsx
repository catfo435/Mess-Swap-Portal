import React, { useState, useEffect } from 'react'
import RequestPane from '../Components/RequestPane'
import ReqSkeleton from '../Components/ReqSkeleton'

export default function ApproveReq(props) {


  const [data, setData] = useState()

  async function fetchReqs() {
    const supabase = props.supabase
    const { data, error } = await supabase
      .from('messreq')
      .select()
      .eq("Receiver", props.studentUID)


    if (error) {
      alert("Something went wrong")
      console.error(error);
      return
    }
    console.log(data);
    setData(data)
  }

  useEffect(() => {
    fetchReqs()
    console.log(data)
  }, [])


  if (data) {
    return displayRequests()
  }
  else if (!data) {
    return displaySkeleton()
  }


  function displayRequests() {
    return data && (
      <>
        <h5>Pending requests for {props.studentUID}</h5>
        {data.map((request, index) => {
          return <RequestPane sender={request.Sender} timestamp={new Date(request.time).toLocaleString()}></RequestPane>
        })}
      </>
    )
  }

  function displaySkeleton() {
    return (<>
      <h5>Pending requests for {props.studentUID}</h5>
      <ReqSkeleton />
    </>)
  }
}