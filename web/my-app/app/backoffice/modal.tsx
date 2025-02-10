"use client";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({title, children, isOpen, onClose}: ModalProps) {
    return (
        isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className={`bg-white p-6 rounded-lg shadow-lg w-1/2`}>
                <h2 className="text-2xl font-bold mb-4 bg-teal-400 text-white p-4 rounded-t-lg">
                    {title}
                    <button className="float-right text-gray-500" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </h2>
                <div className="mt-4 p-2">
                    {children}
                </div>
            </div>

        </div>
        )
    );
}