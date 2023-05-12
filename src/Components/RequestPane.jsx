import React from 'react'

export default function RequestPane(props) {
    return (
        <div id={props.id} className='requestBox' onClick={props.onClick}>
            <h3 style={{color:"#8da4e3"}}>{props.sender}</h3>
            <h4>{`Has Mess ${props.mess}`}</h4>
            <h6>{props.timestamp}</h6>
        </div>
    )
}
