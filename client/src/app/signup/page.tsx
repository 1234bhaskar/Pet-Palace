import { GridBackgroundDemo } from "@/components/background";
import { ModeToggle } from "@/components/navbarcom/dark-light-mode";
import { SignUpComponent } from "@/components/signupform";
import { FlipWords } from "@/components/ui/flip-words";

export default function SignUp() {
    const words = ["Delight ", "Treat ", "Comfort ", "Cherish ","Celebrate "];

    return(
        <div >
            <GridBackgroundDemo>
            <div  className="">
            </div>
            <div className="absolute top-0 right-0"><ModeToggle/></div>
            <div className="md:grid md:grid-cols-12 h-screen w-screen md:divide-x md:divide-slate-500 md:px-20  ">
                <div className= "hidden  md:col-span-8 md:block ">
                    {/* <LampDemo/> */}
                    <div className="flex items-center text-4xl font-medium md:text-7xl h-screen ">
                        <div>
                        <FlipWords words={words} className="" /> 
                        your pets with  <br />
                        Pet Palace products 
                        </div>
                    </div>
                </div>
                <div className="md:col-span-4 h-screen flex items-center justify-center">
                    <div>
                        <SignUpComponent/>
                    </div>
                </div>
            </div>
            </GridBackgroundDemo>
        </div>
    )
}