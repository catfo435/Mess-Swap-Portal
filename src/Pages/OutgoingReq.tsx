import { SupabaseClient } from "@supabase/supabase-js"
import OutgoingReqPane from "../Components/OutgoingReqPane"
import { MessReqRow } from "./ApproveReq"
import { Database } from "../database.types"

import ToastFunctions from "../Components/ToastFunctions"
import { useEffect, useState } from "react"

type OutgoingReqProps = {
    supabase : SupabaseClient<Database>,
    studentUID : string,
    pageStatus : boolean,
    setpageStatus: Function
}


export default function OutgoingReq(props : OutgoingReqProps) {

    const toastFunctions = new ToastFunctions()
    const [data, setData] = useState<Array<MessReqRow> | null>()
    const [refreshData, setrefreshData] = useState<boolean>(false)

    async function fetchOutgoingReqs(){
        const { data, error } = await props.supabase
          .from('messreq')
          .select()
          .eq("Sender", props.studentUID)
          .eq("Rejected",false)
    
    
        if (error) {
        toastFunctions.error("Something went wrong.")
          return
        }
        setData(data)
      }

      useEffect(()=>{
        fetchOutgoingReqs()
      },[refreshData])
    

    async function handleReqPaneClick(e: React.ChangeEventHandler<HTMLButtonElement>,id:number){

        const deleteReq = data![id]

        try {
        await props.supabase
          .from('messreq')
          .delete()
          .eq("Sender", props.studentUID)
          .eq("id",deleteReq.id)
        }
        catch(e){
            toastFunctions.error("Something went wrong.")
            return
        }
        toastFunctions.success("Deleted Request Successfully")
        setrefreshData(!refreshData)
    }


  return data! && (
    <div>
        <button className='customBtn' onClick={() => {props.setpageStatus(!props.pageStatus);setData(null)}}>Incoming Requests</button>
        <h3>Outgoing requests</h3>
    {data.map((request, index) => {
      return <OutgoingReqPane id={`${index}`} receiver={request.Receiver} timestamp={new Date(request.time).toLocaleString()} onClick={handleReqPaneClick}/>
    })}</div>
  )
}
