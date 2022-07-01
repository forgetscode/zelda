import { FC } from "react";


export const NavBar:FC= ({children}) => {
    return (
        <>
            <div className="w-[100%] bg-gray-900 h-20">
                <div className="max-w-7xl mx-auto px-4 mb-4">
                    <div className="flex items-center justify-between h-16 ">
                        <div className="flex items-center ml-2"></div>
                    </div>
                </div>
            </div>
            {children}
        </>
    );
};


export default NavBar;