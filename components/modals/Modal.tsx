import React from "react";
import { LuX } from "react-icons/lu";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 flex items-center justify-center px-4 transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/90 transition-all duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        {/* model */}

        <div
        onClick={(e) => e.stopPropagation()} 
          className={`relative z-10 w-full max-w-md mx-auto my-24 p-5  rounded-2xl bg-gray-800/55 backdrop-blur-2xl text-white border border-secondary px-6 py-12 shadow transform translate-all duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"} ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <button
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <LuX size={20} />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
