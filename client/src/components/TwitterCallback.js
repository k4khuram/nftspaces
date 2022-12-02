import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { userSelector } from "../features/user/userSlice"
import { postTwitterCallback } from "../apis/twitterAPI";

export const TwitterCallback = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { userInfo } = useSelector(userSelector);


    useEffect(() => {
        const code = searchParams.get('code');
        const codeVerifier = localStorage.getItem('codeVerifier');
        const res = postTwitterCallback(code, codeVerifier, userInfo);
        console.log(res);

    }, [])

    return (<h5 className="text-center mt-5">Connecting please wait .....</h5>)
}


