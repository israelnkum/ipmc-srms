import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/')
    }, [])

    return (
        <div className={'flex flex-col gap-5 justify-center items-center h-screen'}>
            <p>Please wait...</p>
        </div>
    )
}

export default PageNotFound
