import Image from "next/image"

const Nav = () => {
    return (
        <div className="bg-green-500 flex flex-row items-center justify-center p-2 h-[75px] w-full fixed">
            <div className="absolute left-2">
                <Image
                    className="rounded-md"
                    src="/images/logo.png"
                    alt="Logo image"
                    width="50px"
                    height="50px"
                />
            </div>
            <div className="text-white text-[30px] font-semibold">SCREENING TEST</div>
        </div>
    )
}

export default Nav;
