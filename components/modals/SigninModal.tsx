"use client";
import React from "react";
import Modal from "./Modal";
import { useModalState } from "@/store/useModalStore";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/app/lib/auth-client";

const SigninModal = () => {
  const { isSignInOpen, closeSignIn } = useModalState();

  const signInWithGoogle=async()=>{
    await authClient.signIn.social({
        provider:"google"
    })
  }

    const signInWithGithub=async()=>{
    await authClient.signIn.social({
        provider:"github"
    })
  }
  return (
    <Modal isOpen={isSignInOpen} onClose={closeSignIn}>
      <h1 className="font-medium text-2xl mb-2">sign in your blogs</h1>
      <p className="text-sm text-gray-500 mb-2">
        continue with one of previews way
      </p>
      <div className="space-y-3">
        {/* google */}
        <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-2 border border-secondary rounded-lg py-2 px-4 hover:bg-gray-700 transition-colors">
          <FcGoogle size={20} className="inline mr-2" />
          Continue with Google
        </button>

        {/* github */}
        <button onClick={signInWithGithub} className="w-full flex items-center justify-center gap-2 border border-secondary rounded-lg py-2 px-4 hover:bg-gray-700 transition-colors">
          <FaGithub size={20} className="inline mr-2" />
          Continue with GitHub
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-4">agree to our terms and conditions</p>
    </Modal>
  );
};

export default SigninModal;
