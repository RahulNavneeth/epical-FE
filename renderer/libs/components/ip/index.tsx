import { useEffect, useState } from "react"
import { useIPStore } from "../../store"
import axios from "axios";

const IP = () => {
    const [ip, setIP] = useState("");
    const [check, setCheck] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const setIPStore = useIPStore((state) => state.setIP);

    const handleIP = async () => {
        setCheck(true);

        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!regex.test(ip)) {
            setError("Invalid IP Address");
            setCheck(false);
            return;
        }

        const ipR = ip.includes("http") ? ip : "http://" + ip;
        console.log(ipR);

        const axiosPromise = axios.get(ipR);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("Request timed out"));
            }, 3000);
        });

        try {
            const response = await Promise.race([axiosPromise, timeoutPromise]);
            //@ts-ignore
            const { data } = response;
            { !!error && <div className="text-red-500 font-semibold">{error}</div> }

            if (!data.success) {
                setError("Invalid IP Address");
                return;
            }

            setIPStore(ipR);
        } catch (e) {
            console.log(ipR, "CATCH");
            setError("Invalid IP Address");
        } finally {
            setCheck(false);
        }
    }
    useEffect(() => {
        if (!!error) {
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }, [error])

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-evenly font-primary">
            <div className="text-3xl font-black"> FOR ADMIN USE ONLY!! </div>
            <div className="w-full flex flex-col items-center justify-center">
                {!!error && <div className="text-red-500 font-semibold">{error}</div>}
                <div className="w-[30%]">
                    <div>Enter IP:</div>
                    <input className="bg-gray-100 border-black border-2 w-full outline-none px-2 py-4" onChange={(i) => setIP(i.target.value)} type="text" />
                </div>
                <button disabled={check} onClick={handleIP} className="disabled:bg-green-200 disabled:text-gray-500 bg-green-500 mt-4 outline-none px-4 py-2 font-semibold w-[200px] rounded-md text-center">{!check ? "CONNECT" : <>CHECKING</>}</button>
            </div>
            <div className="opacity-0">...</div>
        </div>
    )
}

export default IP;
