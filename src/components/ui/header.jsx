import { LuCodesandbox } from "react-icons/lu"

export const LogoHeader = () => {
    return (
        <div>
            <div className=" flex flex-row items-start justify-start lg:min-w-min h-0  self-start bg-[#0339D9] p-5 ">
                <LuCodesandbox size={30} className="text-white"/>
                <h1 className=" decoration-4 text-white text-xl ml-1 font-bold">Techzone.</h1>
            </div>
        </div>
    )
}