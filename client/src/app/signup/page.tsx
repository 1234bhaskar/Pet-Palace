"use client"
import { GridBackgroundDemo } from "@/components/background";
import { ModeToggle } from "@/components/navbarcom/dark-light-mode";
import { FlipWords } from "@/components/ui/flip-words";
import toast from "react-hot-toast";
import {  TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { graphqlClient } from "../../../GraphqlClient/api";
import { verifyGoogleTokenQuery } from "../../../graphql/query/user";
import { useRouter  } from "next/navigation";
import {  ComboboxDemo } from "@/components/combobox/page";
import React from "react";


const Role = [
    {
        value: "Client",
        label: "Client",
    },
    {
        value: "Seller",
        label: "Seller",
    },
    {
        value: "Admin",
        label: "Admin",
    },
    
    ]

export default function SignUp() {
    
  const [value, setValue] = React.useState(Role[0].label)
  
  const router = useRouter();
  
  console.log(value);
  const handleLogin = useCallback(async(cred:TokenResponse) => {
      // console.log(cred.access_token);
      const googleToken = cred.access_token;
      if(!googleToken) return toast.error("Login failed");
      try{
          const {verifyGoogleToken}=await graphqlClient.request(verifyGoogleTokenQuery,{token:googleToken,role:value});
          
          console.log(value);
            toast.success("Verified Success");
            console.log(`token-> ${verifyGoogleToken}`);
            console.log(toast);
            
            if (verifyGoogleToken) {
                window.localStorage.setItem("_Pet_Palace", verifyGoogleToken);
                router.push("/"); 
            }
        }
        catch (error) {
            toast.error("Verification failed");
            console.error(error);
        } 
    }, [value,router]);

    const words = ["Delight ", "Treat ", "Comfort ", "Cherish ", "Celebrate "];

    const login = useGoogleLogin({  
        onSuccess: tokenResponse  => handleLogin(tokenResponse),
        onError: error => console.log('Login Failed:', error),
    });
    return(
        <div >
            <GridBackgroundDemo>
            <div  className="">
            </div>
            <div className="absolute top-0 right-0"><ModeToggle/></div>
            <div className="md:grid md:grid-cols-12 h-screen w-screen md:divide-x md:divide-slate-500 md:px-20  ">
                <div className= "hidden  md:col-span-8 md:block ">
                    {/* <LampDemo/> */}
                    <div className="flex items-center text-4xl font-medium md:text-7xl h-screen  ">
                        <div>
                        <FlipWords words={words} className="text-slate-700" /> 
                        your pets with  <br />
                        Pet Palace products 
                        </div>
                    </div>
                </div>
                <div className="md:col-span-4 h-screen flex md:flex-col gap-4 items-center justify-center">
                    <div>
                        {/* <SignUpComponent/> */}
                        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">
                        <button className="relative group/btn flex space-x-2 items-center justify-start py-4 px-7 rounded-full text-black  h-15 font-bold shadow-input hover:border hover:border-cyan-300 bg-slate-800  dark:bg-white dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" onClick={() => login()}>
                            <FcGoogle className="h-7 w-7 dark:text-neutral-900 " />
                                <span className="text-neutral-200 dark:text-neutral-700 text-lg">
                                    Continue with Google
                                </span>
                        </button>
                        
                        </div>
                    </div>
                    <div>
                        <ComboboxDemo Role={Role} value={value} setValue={setValue} />
                    </div>
                </div>
            </div>
            </GridBackgroundDemo>
        </div>
    )
}