import React from 'react'
import { useEffect } from 'react';

export default function GoogleOAuth(props) {

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENTID,
            callback: props.onSuccess
        })


        google.accounts.id.renderButton(
            document.getElementById("google-oauth"),
            { theme: "outline", size: "medium" }
        )
    });

    return (
        <div id="google-oauth"></div>
    )
}
