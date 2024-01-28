import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { problemSetType, useProblemSet, useAnswerStore } from "../../libs/store";
import { SERVER_URL } from "../../libs/constants";
import axios from "axios";

const TermsAndConditions = () => {
    const [check, setCheck] = useState<boolean>(false);
    const problemStore = useProblemSet((state) => state.setProblemSet);
    const setAns = useAnswerStore((state) => state.fillAnswer);
    const router = useRouter();

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
            <div className="text-3xl text-green-500 font-black"> Hello <br /> Welcome! </div>
            <div className="font-semibold mt-4 w-[60%]">
                Welcome to our online test platform! Before you begin, please take a moment to review the following terms and conditions that govern your use of this service. By accessing and participating in the online test, you agree to comply with the terms outlined below.
                <ol className="flex flex-col mt-4 items-center justify-center gap-2">
                    <li>1. User Conduct: You agree to use this platform solely for the purpose of taking the online test and to abide by all applicable local, state, national, and international laws and regulations. Any unauthorized use or access to the platform is strictly prohibited.</li>
                    <li>2. Access and Security: You are responsible for maintaining the confidentiality of your login credentials. Any activity that occurs under your account is your responsibility. In case of unauthorized access or suspected breach of security, please notify us immediately.</li>
                    <li>3. Test Integrity: You agree not to cheat or engage in any form of dishonesty during the test. Any attempt to manipulate the test, use unauthorized materials, or collaborate with others will result in disqualification and possible legal action.</li>
                    <li>4. Technical Issues: While we strive to provide a seamless testing experience, we are not responsible for any technical issues that may arise during the test, including but not limited to server outages, internet connectivity problems, or device malfunctions.</li>
                    <li>5. Data Privacy: Your personal information will be handled in accordance with our privacy policy. By participating in the online test, you consent to the collection, use, and storage of your data for test-related purposes.</li>
                    <li>6. Intellectual Property: All content provided during the test, including questions, answers, and any accompanying materials, is the intellectual property of the platform. Unauthorized reproduction, distribution, or disclosure is strictly prohibited.</li>
                    <li>7. Termination of Access: We reserve the right to terminate or suspend your access to the online test at any time and for any reason, including violation of these terms and conditions.</li>
                    <li>8. Feedback and Complaints: We welcome feedback on your testing experience. If you encounter any issues or have concerns, please contact our support team. We are committed to continuously improving our services.</li>
                </ol>
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
