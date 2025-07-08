"use client";

import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import { signIn } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

const SocialAuthForm = () => {

    const buttonClass = "flex-1 px-4 py-3.5 rounded-2 min-h-12  background-dark400_light900 body-medium";

    const handleSignIn = async(provider: "github" | "google") => {
      try{
        await signIn(provider,{
          callbackUrl: ROUTES.HOME,
          redirect: true,
        })
      }
      catch (error) {
        toast("Sign-in Failed", {
          description: error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
         className: "bg-red-500 text-white"
        });
      }
    }
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
    <Button className={buttonClass} onClick={() => handleSignIn("github")}
    >
     
      <span>Log in with GitHub</span>
    </Button>

    <Button className={buttonClass}  onClick={() => handleSignIn("google")}
    >
    
      <span>Log in with Google</span>
    </Button>
  </div>
  )
}

export default SocialAuthForm