import Image from "next/image";
import { useRouter } from "next/router"
import { useConfirmModal, useProblemSet, useAnswerStore } from "../../../libs/store";
import { useEffect, useState } from "react";

const Question = () => {
    const router = useRouter()
    const onModalOpen = useConfirmModal((state) => state.onConfirm);
    const problemStore = useProblemSet((state) => state.problemSet);
    const answerStore = useAnswerStore((state) => state.answer);
    const setAns = useAnswerStore((state) => state.setAnswer);

    const [answer, setAnswer] = useState<Number | null>(null);

    useEffect(() => {
        const questionIndex = Number(router.query.id) - 1;
        if (answerStore && questionIndex < answerStore.length) {
            setAnswer(answerStore[questionIndex]);
        }
    }, [router.query.id, answerStore]);

    if (!problemStore) {
        router.push("/terms");
        return null;
    }
    const problem = problemStore[Number(router.query.id) - 1];

    const handleAnswerChange = (selectedAnswer: number) => {
        setAnswer(selectedAnswer);
        setAns(Number(router.query.id) - 1, selectedAnswer);
    };

    return (
        <div className="w-full h-full flex flex-col p-10 justify-between relative">
            <div className="absolute z-[-10] right-80 opacity-5"><Image width={750} height={750} src="../../images/bg-q.png" /></div>
            <div>
                <div className="font-bold text-2xl">Question {router.query.id}</div>
                <div className="text-xl">{problem.Question}</div>
                <div className="flex flex-col items-start justify-center mt-8 gap-8">
                    {[1, 2, 3, 4].map((optionIndex) => (
                        <div key={optionIndex} className="flex flex-row items-center justify-center">
                            <input
                                onChange={() => handleAnswerChange(optionIndex)}
                                checked={answer === optionIndex}
                                className="w-[20px] h-[20px] mr-2"
                                type="radio"
                                name={`answer-${router.query.id}`}
                            />
                            <div className="text-xl">
                                <span className="font-bold">{String.fromCharCode(64 + optionIndex)}. </span>
                                {problem[`Option-${String.fromCharCode(64 + optionIndex)}`]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row mt-8">
                {Number(router.query.id) != 1 && (
                    <button
                        onClick={() => router.push(`/question/${Number(router.query.id) - 1}`)}
                        className="px-8 py-2 bg-green-500 font-medium text-white rounded-md"
                    >
                        &larr; PREVIOUS
                    </button>
                )}
                {Number(router.query.id) != problemStore.length && (
                    <button
                        onClick={() => router.push(`/question/${Number(router.query.id) + 1}`)}
                        className="px-8 py-2 bg-green-500 font-medium text-white rounded-md ml-4"
                    >
                        NEXT &rarr;
                    </button>
                )}
                {Number(router.query.id) === problemStore.length && (
                    <button
                        onClick={onModalOpen}
                        className="px-8 py-2 bg-black font-medium text-white rounded-md ml-4"
                    >
                        SUBMIT
                    </button>
                )}
            </div>
        </div>
    );
};

export default Question;
