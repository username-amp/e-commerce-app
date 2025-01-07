import { LuCodesandbox } from "react-icons/lu"

export const LogoHeader = () => {
    return (
        <div>
            <div className="flex flex-row items-start justify-start lg:min-w-min self-start bg-transparent p-0 mb-2">
                <LuCodesandbox size={45} className="text-white"/>
                <h1 className="decoration-4 text-white text-5xl ml-1 font-extrabold">Techzone.</h1>
            </div>
            <p className="text-base mt-0 text-white font-semibold">Giving electronics a second life, delivered to you.</p>
        </div>
    )
}
