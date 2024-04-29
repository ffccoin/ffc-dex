import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const [selected, setSelected] = useState("Proposal");
  return (
    <div className="flex flex-col md:w-[23vw] 2xl:w-[14vw] w-full ">
      {/* <div className="flex text-2xl text-white font-bold">FFC Coin</div> */}

      <div className="flex text-2xl text-white ">Dashboard</div>
      <div
        onClick={() => {
          setSelected("Proposal");
        }}
        className={`flex text-lg py-2 pl-2 w-full items-start text-white font-medium gap-2 mt-5 ${
          selected === "Proposal" ? " bg-gray22/80 " : "bg-transparent"
        }  items-center `}
      >
        {doc} Proposal{" "}
      </div>
      <div
        onClick={() => {
          setSelected("Requests");
        }}
        className={`flex  ${
          selected === "Requests" ? "bg-gray22/80" : "bg-transparent"
        } text-lg py-2 pl-2 w-full mt-3 text-white font-medium gap-2  items-center "`}
      >
        <Image src={"./home/mail.svg"} width={20} height={20} /> Requests{" "}
      </div>
    </div>
  );
}

const doc = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="20"
    height="20"
    viewBox="0,0,256,256"
  >
    <g
      fill="#ffffff"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
    >
      <g transform="scale(5.33333,5.33333)">
        <path d="M12.5,4c-2.4675,0 -4.5,2.0325 -4.5,4.5v31c0,2.4675 2.0325,4.5 4.5,4.5h23c2.4675,0 4.5,-2.0325 4.5,-4.5v-21c-0.00008,-0.3978 -0.15815,-0.77928 -0.43945,-1.06055l-0.01562,-0.01562l-12.98437,-12.98437c-0.28127,-0.2813 -0.66275,-0.43938 -1.06055,-0.43945zM12.5,7h11.5v8.5c0,2.4675 2.0325,4.5 4.5,4.5h8.5v19.5c0,0.8465 -0.6535,1.5 -1.5,1.5h-23c-0.8465,0 -1.5,-0.6535 -1.5,-1.5v-31c0,-0.8465 0.6535,-1.5 1.5,-1.5zM27,9.12109l7.87891,7.87891h-6.37891c-0.8465,0 -1.5,-0.6535 -1.5,-1.5zM17.5,25c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h13c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381zM17.5,32c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h9c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381z"></path>
      </g>
    </g>
  </svg>
);
