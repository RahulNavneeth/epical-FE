import Image from "next/image";
import { useCandidateStore } from "../../libs/store"
import { useRouter } from "next/router";

const End = () => {
    const useCandidate = useCandidateStore((state) => state.candidate);
    const router = useRouter();
    if (!useCandidate) {
        router.push("/");
        return;
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-evenly">
            <div className="font-bold text-3xl">THANKS FOR ATTENDING!!!</div>
            <Image src="../images/logo.png" width={450} height={450} />
        </div>
    )
}

export default End;
