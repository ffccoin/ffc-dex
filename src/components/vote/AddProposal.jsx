"use client";

import { addProposal } from "@/redux/reducers/proposalsSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddProposal = ({ toggleFlash }) => {
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();
  const closeModal = () => {
    toggleFlash();
  };
  const handleClose = () => {
    toggleFlash();
    dispatch(
      addProposal({
        title: title,
        desc: desc,
        endDate: endDate,
        status: "Pending",
      })
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => closeModal()}
      ></div>

      <div className="z-[100]  flex h-[450px]  md:h-[502px] w-[600px] flex-col items-center   rounded-lg  bg-gray22 text-white px-5 shadow-md md:px-10">
        <div className="mt-4 md:mt-6 flex w-full items-center justify-center">
          <p className="font-bold text-center flex-1 text-sm md:text-2xl">
            New Proposal
          </p>
          <button
            onClick={() => closeModal()}
            className="flex items-center ml-auto text-xs sm:text-sm"
          >
            <span className="mr-1">{cross}</span>
          </button>
        </div>

        <div className="flex w-full flex-col mt-2 gap-6 h-full ">
          <div>
            <label for="floating_outlined" class="px-2 text-sm">
              Title
            </label>
            <div className="relative w-full bg-gray24/35 items-center  justify-center gap-x-2 rounded-lg border border-gray12/5 px-4 py-3 ">
              <input
                type="text"
                name="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Please enter your proposal's title"
                className=" w-full resize-none  bg-transparent  outline-none"
              />
            </div>
          </div>

          <div>
            <label for="floating_outlined" class="px-2 text-sm">
              End&nbsp;Date
            </label>
            <div className="relative w-full bg-gray24/35 items-center  justify-center gap-x-2 rounded-lg border border-gray12/5 px-4 py-3 ">
              <input
                type="text"
                name="text"
                id="endDate"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                placeholder="12 April, 2024"
                className=" w-full resize-none  bg-transparent  outline-none"
              />
            </div>
          </div>
          <div>
            <label for="floating_outlined" class="px-2 text-sm">
              Description
            </label>
            <div className="relative  w-full bg-gray24/35 items-center justify-center gap-x-2 rounded-lg border border-gray12/5 px-4 py-3">
              <textarea
                name="text"
                id="desc"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                placeholder="Please write your description here..."
                className="h-16 w-full resize-none  bg-transparent outline-none"
              ></textarea>
            </div>
          </div>

          <button
            className=" w-full rounded-lg  py-2 text-lg lg:text-xl  font-extrabold   bg-primary1 text-black "
            onClick={() => handleClose()}
          >
            Upload
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddProposal;
const cross = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.9962 8.93906L11.7657 12.7088C11.8914 12.8302 12.0597 12.8974 12.2344 12.8959C12.4091 12.8944 12.5763 12.8243 12.6998 12.7007C12.8234 12.5772 12.8934 12.41 12.895 12.2353C12.8965 12.0606 12.8293 11.8922 12.7079 11.7666L8.93842 7.99678L12.7079 4.227C12.8293 4.10132 12.8965 3.93298 12.895 3.75826C12.8934 3.58353 12.8234 3.41639 12.6998 3.29284C12.5763 3.16928 12.4091 3.0992 12.2344 3.09768C12.0597 3.09616 11.8914 3.16333 11.7657 3.28472L7.9962 7.0545L4.22669 3.28472C4.10045 3.16633 3.93311 3.10171 3.76007 3.10452C3.58703 3.10733 3.42188 3.17735 3.29955 3.29978C3.17722 3.4222 3.10731 3.58742 3.10463 3.76047C3.10194 3.93352 3.16668 4.10083 3.28515 4.227L7.05399 7.99678L3.28448 11.7666C3.22084 11.828 3.17008 11.9016 3.13515 11.9829C3.10023 12.0642 3.08185 12.1516 3.08108 12.2401C3.08031 12.3286 3.09717 12.4163 3.13067 12.4982C3.16418 12.5801 3.21366 12.6545 3.27622 12.7171C3.33879 12.7797 3.41319 12.8291 3.49508 12.8627C3.57697 12.8962 3.66471 12.913 3.75319 12.9123C3.84167 12.9115 3.9291 12.8931 4.0104 12.8582C4.0917 12.8233 4.16522 12.7725 4.22669 12.7088L7.9962 8.93906Z"
      fill="#ffffff"
    />
  </svg>
);
const alert = (
  <svg
    viewBox="0 0 177 178"
    fill="none"
    className="h-[100px] w-[100px] md:h-[156px] md:w-[156px]    "
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M166.38 120.565L109.814 26.7549C105.165 19.4831 97.1304 15.083 88.4999 15.083C79.8694 15.083 71.8345 19.4831 67.1861 26.7549L10.6199 120.565C6.55291 127.344 6.41234 135.779 10.2511 142.69C14.6907 150.472 22.9747 155.262 31.9336 155.227H145.066C153.964 155.322 162.234 150.653 166.749 142.985C170.702 135.998 170.561 127.418 166.38 120.565ZM88.4999 125.727C84.4268 125.727 81.1249 122.425 81.1249 118.352C81.1249 114.279 84.4268 110.977 88.4999 110.977C92.573 110.977 95.8749 114.279 95.8749 118.352C95.8749 122.425 92.573 125.727 88.4999 125.727ZM88.4999 103.602C92.573 103.602 95.8749 100.3 95.8749 96.2274V66.7274C95.8749 62.6543 92.573 59.3524 88.4999 59.3524C84.4268 59.3524 81.1249 62.6543 81.1249 66.7274V96.2274C81.1249 100.3 84.4268 103.602 88.4999 103.602Z"
      fill="#FF5630"
    />
  </svg>
);
const arrow = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0003 12.9174C9.80558 12.9178 9.61688 12.85 9.46696 12.7257L4.46696 8.55907C4.11257 8.26452 4.06407 7.73845 4.35862 7.38407C4.65317 7.02969 5.17924 6.98119 5.53362 7.27574L10.0003 11.0091L14.467 7.40907C14.6391 7.26926 14.8599 7.20385 15.0804 7.22731C15.301 7.25077 15.5031 7.36117 15.642 7.53407C15.7962 7.70729 15.8713 7.93697 15.8492 8.16787C15.8271 8.39877 15.7097 8.61 15.5253 8.75074L10.5253 12.7757C10.3711 12.8803 10.1862 12.9302 10.0003 12.9174Z"
      fill="#637381"
    />
  </svg>
);
