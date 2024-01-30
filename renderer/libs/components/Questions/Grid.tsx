import { useEffect, useState } from "react";
import { useIPStore, useAnswerStore, useCandidateStore, useMetaStore } from "../../store";
import { useRouter } from "next/router";
import axios from "axios";

const CountdownTimer = ({ initialTimeInMinutes }) => {
    const initialTimeInSeconds = initialTimeInMinutes * 60;
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
    const getCandidate = useCandidateStore((state) => state.candidate);
    const getAnswer = useAnswerStore((state) => state.answer);
    const SERVER_URL = useIPStore((state) => state.ip);

    const router = useRouter();

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const getTimerColor = () => {
        if (timeLeft > initialTimeInSeconds * 0.66) return '#22c55e';
        if (timeLeft > initialTimeInSeconds * 0.33) return '#f59e0b';
        return '#ef4444';
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (timeLeft === 0) {
        axios.post(SERVER_URL + "/save-mark", {
            candidateName: getCandidate.candidateName,
            regNo: getCandidate.regNo,
            answer: getAnswer
        }).then(({ data }: { data: { success: boolean, message: boolean } }) => {
            if (!data.success) {
                alert(data.message);
                return;
            }
            router.push("/end");
        })
    }

    return (
        <div className="mt-5 flex flex-row items-center gap-4">
            <div style={{ background: getTimerColor() }} className="w-[35px] h-[35px] rounded-full" />
            <div className="font-black text-[50px]">{formatTime()}</div>
        </div>
    );
};

const QuestionGrid = () => {
    const data = useAnswerStore((state) => state.answer);
    const getMeta = useMetaStore((state) => state.meta);
    const getCandidate = useCandidateStore((state) => state.candidate);

    const router = useRouter();
    const X = getMeta.timeLimit;

    return (
        <div className="w-1/3 h-full flex flex-col items-center justify-between bg-gray-50 pt-3 pb-10">
            <div className="flex flex-col items-center justify-center">
                <div className="font-bold">QUESTION ANSWERED</div>
                <div className="flex flex-row flex-wrap items-center justify-center mt-2">
                    {data.map((j, i) => (
                        j != null ?
                            <button
                                onClick={() => router.push(`/question/${i + 1}`)}
                                style={{ border: Number(router.query.id) - 1 === i ? "2px solid black" : "" }}
                                className="m-2 w-[50px] h-[50px] bg-green-500 flex flex-col items-center justify-center">{i + 1}</button> :
                            <button
                                onClick={() => router.push(`/question/${i + 1}`)}
                                style={{ border: Number(router.query.id) - 1 === i ? "2px solid black" : "" }}
                                className="m-2 w-[50px] h-[50px] bg-green-200 flex flex-col items-center justify-center">{i + 1}</button>
                    ))}
                </div>
            </div>
            <div className="text-center">
                <div>Candidate register number </div>
                <div className="text-[30px] font-black">{getCandidate.regNo}</div>
            </div>
            <div>
                <CountdownTimer initialTimeInMinutes={X} />
            </div>
        </div>
    );
}

export default QuestionGrid;
