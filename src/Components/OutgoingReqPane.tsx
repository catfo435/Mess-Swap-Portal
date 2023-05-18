import { useState } from 'react'

type RequestPaneProps = {
    id:string,
    receiver: string,
    onClick:Function,
    timestamp:string
}


export default function OutgoingReqPane(props: RequestPaneProps) {

    const [activeState,setactiveState] = useState(false)

    return (
        <div id={props.id} className='requestBoxOutgoing' onClick={()=>{
            setactiveState(!activeState)
        }}>
            <h3 style={{color:"#8da4e3"}}>{props.receiver}</h3>
            {activeState?<button className='approvereject' id='delete' onClick={(e)=>{
                props.onClick(e,props.id)
            }}>Delete</button>:<h6>{props.timestamp}</h6>}
        </div>
    )
}
