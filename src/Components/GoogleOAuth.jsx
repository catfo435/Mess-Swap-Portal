import React, { useState , useEffect } from 'react'
import GoogleSkeleton from './GoogleSkeleton';

export default function GoogleOAuth(props) {
    
    const [loadState,setLoadState] = useState(false)

    useEffect(() => {
        /* global google */
        if (!window.google){
            return
        }
        else if (window.google && !loadState){
            setLoadState(true)
            return
        }
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENTID,
            callback: props.onSuccess,
            auto_select: true,
            hosted_domain:"hyderabad.bits-pilani.ac.in",
        })

        google.accounts.id.prompt();


        google.accounts.id.renderButton(
            document.getElementById("google-oauth"),
            { theme: "filled_black", shape:"circle",size: "large", string:"continue_with" }
        )
    },[loadState]);

    return (
        <>
        {loadState?<div id='google-oauth'></div>:<><GoogleSkeleton /><span>Loading...</span></>}
        </>
    )
}
