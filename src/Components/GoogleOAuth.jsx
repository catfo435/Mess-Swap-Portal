import React, { useEffect, useState } from 'react'
import GoogleSkeleton from './GoogleSkeleton'

export default function GoogleOAuth(props) {

    const [scriptLoadState,setscriptLoadState] = useState(false)
    const [skeletonState,setskeletonState] = useState(true)

    useEffect(() => {
        /* global google */

        try {
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

        }
        catch(e){
            setscriptLoadState(!scriptLoadState) //doesnt actually mean whether the script actually loaded
                                               // its to trigger the useEffect again
            return
        }
        setskeletonState(false)
    },[scriptLoadState]);

    return (
        <>
        {skeletonState && <GoogleSkeleton/>}
        <div id="google-oauth"></div>
        </>
    )
}
