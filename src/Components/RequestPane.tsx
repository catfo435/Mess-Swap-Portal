import { useState } from 'react'

type RequestPaneProps = {
    id:string,
    mess:string,
    senderName: string | null,
    sender: string,
    onClick:Function,
    timestamp:string
}


export default function RequestPane(props: RequestPaneProps) {

    const [activeState,setactiveState] = useState(false)

    return (
        <div id={props.id} className='requestBox' onClick={()=>{
            setactiveState(!activeState)
        }}>
            <h3 style={{color:"#8da4e3"}}>{props.senderName}</h3>
            <h6 style={{color:"#8da4e3"}}>{`(${props.sender})`}</h6>
            <h4>{`Has Mess ${props.mess}`}</h4>
            {activeState?<><button className='approvereject' id='approve' onClick={(e)=>{
                props.onClick(e,"Approve",props.id)
            }}>Approve</button> <button className='approvereject' id='reject' onClick={(e)=>{
                props.onClick(e,"Reject",props.id)
            }}>Reject</button></>:<h6>{props.timestamp}</h6>}
        </div>
    )
}
