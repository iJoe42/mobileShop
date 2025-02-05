export default function SideBar() {
    return(
        <div className="bg-teal-400 h-screen w-64">
            <div className="p-5 bg-teal-700 text-white font-bold">
                <h1>Next Mobile Shop 1.0</h1>
            </div>
            <div className="p-5 text-white text-xl flex flex-col gap-2">
                <h1>Dashboard</h1>
                <h1>Company</h1>
                <h1>User</h1>
            </div>
        </div>
    );
}