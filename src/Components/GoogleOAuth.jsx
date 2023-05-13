import React, { useEffect, useState } from 'react'
import GoogleSkeleton from './GoogleSkeleton'

export default function GoogleOAuth(props) {

    useEffect(() => {
        /* global google */

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENTID,
            callback: props.onSuccess,
            hosted_domain: "hyderabad.bits-pilani.ac.in",
        })

        google.accounts.id.prompt();


        google.accounts.id.renderButton(
            document.getElementById("google-oauth"),
            { theme: "filled_black", shape: "circle", size: "large", string: "continue_with" }
        )
    }, []);

    return (
        <>
            <div id="google-oauth"></div>
        </>
    )
}
