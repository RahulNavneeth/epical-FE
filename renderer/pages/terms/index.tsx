import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { problemSetType, useIPStore, useProblemSet, useAnswerStore, useMetaStore, useCandidateStore } from "../../libs/store";
import axios from "axios";

const TermsAndConditions = () => {
    const [check, setCheck] = useState<boolean>(false);
    const problemStore = useProblemSet((state) => state.setProblemSet);
    const setAns = useAnswerStore((state) => state.fillAnswer);
    const getMeta = useMetaStore((state) => state.meta);
    const getCandidate = useCandidateStore((state) => state.candidate);
    const SERVER_URL = useIPStore((state) => state.ip);

    const router = useRouter();

    if (!getCandidate) {
        router.push("/");
        return;
    }

    function shuffleArray(array: problemSetType[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const handleCheck = async () => {
        const { data } = await axios.get(`${SERVER_URL}/get-problems`);
        console.log(data);
        const problemSet: problemSetType[] = data.data;
        shuffleArray(problemSet);
        setAns(problemSet.length);
        problemStore(problemSet);
        router.push("/question/1");
    }
    return (
        <div className="w-full h-full flex flex-col items-start justify-evenly p-10">
            <div className="absolute z-[-10] right-0 bottom-0"><Image width={500} height={500} src="../images/terms.png" /></div>
            <div className="text-3xl text-green-500 font-black">Welcome! </div>
            <div className="font-semibold mt-4 w-[60%]">
                {getMeta.terms.map((i, index) => (
                    <div key={index} className="mt-2"><span className="font-bold"></span>{i}</div>
                ))}
            </div>
            <div className="flex flex-row font-medium mt-4">
                <input onChange={() => setCheck(i => !i)} className="mr-2 outline-none" type="checkbox" />
                <div>
                    By proceeding with the online test, you acknowledge that you have read, understood,
                    and agreed to these terms and conditions.
                </div>
            </div>
            <button onClick={handleCheck} disabled={!check} className="px-8 py-2 rounded-md disabled:bg-green-200 disabled:text-gray-500 bg-green-500 font-semibold mt-4"> START TEST </button>
        </div>
    );
}

export default TermsAndConditions;
