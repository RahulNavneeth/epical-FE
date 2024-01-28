import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from "axios"
import { SERVER_URL } from '../libs/constants';
import { useCandidateStore, useMetaStore } from "../libs/store"

function Home() {
    const [username, setUsername] = useState<string>("");
    const [regNo, setRegNo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const router = useRouter();
    const setCandidate = useCandidateStore((state) => state.setCandidate);
    const getMeta = useMetaStore((state) => state.meta);

    const handleLogin = async () => {
        const { data }: { data: { success: boolean, message: string } } = await axios.post(SERVER_URL + "/login", {
            candidateName: username,
            regNo,
            password
        });
        if (data.success) {
            setCandidate({ candidateName: username, regNo });
            router.push("/terms");
            return;
        }
        setError(data.message);
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="absolute z-[-10] right-0 bottom-0"><Image width={800} height={800} src="images/bg.png" /></div>
            <div className="w-[50%] h-full flex flex-col items-center justify-evenly">
                <div style={{ letterSpacing: "5px" }} className="font-black text-3xl">EPICAL LAYOUTS</div>
                <div className="bg-gray-200 bg-opacity-60 w-full p-10 py-20 flex flex-col items-center justify-center rounded-xl">
                    <div className="w-full my-4">
                        <input onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent text-black placeholder:font-bold placeholder:text-black pt-2 outline-none" placeholder="username" type="text" />
                        <div className="w-full h-[2px] bg-black mb-2" />
                    </div>
                    <div className="w-full my-4">
                        <input onChange={(e) => setRegNo(e.target.value)} className="w-full bg-transparent text-black placeholder:font-bold placeholder:text-black pt-2 outline-none" placeholder="regno." type="text" />
                        <div className="w-full h-[2px] bg-black mb-2" />
                    </div>
                    <div className="w-full my-4">
                        <input onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent text-black placeholder:font-bold placeholder:text-black pt-2 outline-none" placeholder="password" type="text" />
                        <div className="w-full h-[2px] bg-black mb-2" />
                    </div>
                    {!!error && <div className="bg-red-500 text-white px-16 py-2 font-semibold rounded-md mt-2">{error}</div>}
                    <div className="mt-8">
                        <button onClick={handleLogin} className="bg-green-500 outline-none px-4 py-2 font-semibold w-[200px] rounded-md text-center">LOGIN</button>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="bg-green-500 py-2 px-4 text-white rounded-md w-[80%] text-center">
                        {getMeta.clgName.toUpperCase()}
                    </div>
                    <div className="text-[8px] font-bold flex flex-row">
                        2023 ©
                        <div className="epical-layouts-private">&nbsp;EPICAL LAYOUTS PRIVATE LIMITED</div>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default Home;
