import {ExpandableCardDemo} from "@/components/blocks/expandable-card-demo-standard";
import { AccordionDemo } from "@/components/navbarcom/Accordion";
import { Dashboard } from "@/components/navbarcom/testing";

interface Productprops {
    title: string;
    description: string;
    price: number;
    imageURL:string
  }
  

const products:Productprops[] = [ { 
    title:'Crucial RAM 8GB DDR4 3200MHz CL22 (or 2933MHz or 2666MHz) Laptop Memory CT8G4SFRA32A', description:'', price:0 ,
    imageURL:"https://m.media-amazon.com/images/I/4172Cepb0ZL._SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
        title:"TEAMGROUP T-Force Vulcan Z 512GB SLC Cache 3D NAND TLC 2.5 Inch SATA III Gaming Internal Solid State Drive SSD (R/W Speed up to 530/470 MB/s) T253TZ512G0C101",
        description:"",
        price:50,
        imageURL:"https://m.media-amazon.com/images/I/91FAhElMh8L._SX679_.jpg"
    }
];  


export default function Order() {
    return(
        <div className=" flex flex-col">
            <div className="h-10"><Dashboard/></div> {/* navbar */}
            
            <div className="text-4xl font-medium md:text-7xl md:ml-10 md:mt-10 text-slate-800 dark:text-slate-300 ">Cart</div>

            <div className="md:grid md:grid-cols-12 md:mt-20" >
                
                <div className="md:col-span-8 mr-6">{products.map((product:Productprops) => ( <ExpandableCardDemo product={product} /> ))}</div>

                <div className="md:col-span-4 md:m-6 ">
                    <div className="text-3xl">Total Price</div>
                    <div className="text-3xl mt-4"> $200</div>
                    <AccordionDemo title="Sub-Total"/>
                </div>

            </div>
        </div>
    )
}