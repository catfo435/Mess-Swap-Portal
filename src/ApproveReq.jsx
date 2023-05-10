import React, { useState, useEffect } from 'react'
import RequestPane from './RequestPane'

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


  return data && (
    <>
      <h5>Pending requests for {props.studentUID}</h5>
      {data.map((request, index) => {
        return <RequestPane sender={request.Sender} timestamp={request.time}></RequestPane>
      })}
    </>
  )
}
