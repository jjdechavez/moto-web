import React, { useEffect } from "react";

const Cookie = (): JSX.Element => {
    useEffect(() => {
        async function getCookie() {
            await fetch('http://localhost:5000/cookie', {
                credentials: "include"
            })
        }

        getCookie();
    }, [])
    return <div>check your cookie</div>
}

export default Cookie;