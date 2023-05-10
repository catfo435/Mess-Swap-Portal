import React from 'react'

export default function RequestPane(props) {
    return (
        <div className='requestBox' style={{border:"2px solid red",margin:"auto 1px 10px",width:"200px"}}>
            <h3>{props.sender}</h3>
            <h4>{props.timestamp}</h4>
        </div>
    )
}
