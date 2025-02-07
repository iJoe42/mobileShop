import SideBar from "./sidebar";


export default function BackOfficeLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-5">
                <div className="bg-white p-5 rounded-lg shadow-lg shadow-gray-500">
                    {children}
                </div>

            </div>
        </div>
    );
}