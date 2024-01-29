import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ConfirmModal, Nav, QuestionGrid } from '../libs/components';
import { useRouter } from 'next/router';
import { useConfirmModal, useMetaStore } from '../libs/store';
import axios from 'axios';
import { SERVER_URL } from '../libs/constants';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    const [isClient, setIsClient] = useState(false)
    const isModalOpen = useConfirmModal((state) => state.isOpen);
    const setMeta = useMetaStore((state) => state.setMeta);

    const router = useRouter()
    useEffect(() => {
        const GET = async () => {
            const { data } = await axios.get(SERVER_URL + "/get-metadata")
            if (data.success) {
                setMeta(data.data)
                return;
            }
        }
        GET()
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null;
    }
    return (
        <>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <div className="font-primary">
                <Nav />
                <div className="w-full h-screen pt-[75px]">
                    {router.pathname === "/question/[id]" ? (
                        <div className="flex flex-row w-full h-full">
                            {isModalOpen && <ConfirmModal />}
                            <Component {...pageProps} />
                            <QuestionGrid />
                        </div>
                    ) :
                        <Component {...pageProps} />}
                </div>
            </div>
        </>
    )
}

export default MyApp;
