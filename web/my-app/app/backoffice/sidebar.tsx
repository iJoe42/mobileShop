import Link from "next/link";

export default function SideBar() {
    return(
        <div className="bg-teal-400 h-screen w-64">
            <div className="p-5 bg-teal-700 text-white font-bold">
                <h1>Next Mobile Shop 1.0</h1>
            </div>
            <div className="p-5 text-white text-xl flex flex-col gap-2">

                <div className="flex">
                    <Link href="/backoffice/dashboard">
                        <i className="fa fa-tachometer-alt mr-2 w-[25px] text-center"></i>
                        Dashboard
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/buy">
                        <i className="fa fa-shopping-cart mr-2 w-[25px] text-center"></i>
                        ซื้อสินค้า
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/sell">
                        <i className="fa fa-dollar-sign mr-2 w-[25px] text-center"></i>
                        ขายสินค้า
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/repair">
                        <i className="fa fa-wrench mr-2 w-[25px] text-center"></i>
                        รับซ่อม
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/company">
                        <i className="fa fa-building mr-2 w-[25px] text-center"></i>
                        ข้อมูลร้าน
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/user">
                        <i className="fa fa-user mr-2 w-[25px] text-center"></i>
                        ผู้ใช้งาน
                    </Link>
                </div>

            </div>
        </div>
    );
}