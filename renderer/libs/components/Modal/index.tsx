import { useRouter } from "next/router";
import { useConfirmModal, useCandidateStore, useAnswerStore } from "../../store";
import axios from "axios";
import { SERVER_URL } from "../../constants";

const Modal = () => {
    const setModalClose = useConfirmModal((state) => state.onCancel);
    const getCandidate = useCandidateStore((state) => state.candidate);
    const getAnswer = useAnswerStore((state) => state.answer);

    const router = useRouter();
    const handleSubmit = async () => {
        const { data }: { data: { success: boolean, message: boolean } } = await axios.post(SERVER_URL + "/save-mark", {
            candidateName: getCandidate.candidateName,
            regNo: getCandidate.regNo,
            answer: getAnswer
        });
        if (!data.success) {
            alert(data.message);
            return;
        }
        router.push("/end");
    }
    return (
        <div className="z-[1000] fixed w-full h-full bg-black bg-opacity-20 flex flex-col justify-center items-center">
            <div className="w-[500px] h-[300px] bg-white rounded-md flex flex-col items-center justify-center">
                <div className="px-6 font-bold text-xl text-center">Once you submit, Your test will be submitted and you will not be able to change your answers.</div>
                <div className="flex flex-row mt-8">
                    <button onClick={handleSubmit} className="px-8 py-2 bg-green-500 font-medium text-white rounded-md">YES</button>
                    <button onClick={setModalClose} className="px-8 py-2 bg-red-500 font-medium text-white rounded-md ml-4">NO</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
