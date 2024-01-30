import { useState } from "react"
import { useIPStore } from "../../store"

const IP = () => {
    const [ip, setIP] = useState("");
    const setIPStore = useIPStore((state) => state.setIP);
    const handleIP = () => {
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!regex.test(ip)) {
            alert("Invalid IP Address");
            return;
        }
        const ipR = ip.includes("http") ? ip : "http://" + ip;
        setIPStore(ipR);
    }
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-evenly font-primary">
            <div className="text-3xl font-black"> FOR ADMIN USE ONLY!! </div>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-[30%]">
                    <div>Enter IP:</div>
                    <input className="border-black border-2 w-full outline-none px-2 py-4" onChange={(i) => setIP(i.target.value)} type="text" />
                </div>
                <button onClick={handleIP} className="bg-green-500 mt-4 outline-none px-4 py-2 font-semibold w-[200px] rounded-md text-center">CONNECT</button>
            </div>
            <div className="opacity-0">...</div>
        </div>
    )
}

export default IP;
