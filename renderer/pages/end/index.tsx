import Image from "next/image";

const End = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-evenly">
            <div className="font-bold text-3xl">THANKS FOR ATTENDING!!!</div>
            <Image src="../images/end.png" width={500} height={500} />
        </div>
    )
}

export default End;
