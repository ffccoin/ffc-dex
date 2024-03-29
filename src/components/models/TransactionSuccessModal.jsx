import Image from "next/image";

export default function TransactionSuccessModal({ isOpen, onClose }) {
  return (
    isOpen && (
      <div className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
        <div className="fixed  px-8 z-50 top-0 left-0  h-full w-full items-center justify-center flex">
          <div className="bg-gray23 w-[512px] h-[364px] px-8 py-10 rounded-3xl shadow-lg relative">
            <div className="flex justify-between absolute right-5 top-5">
              <p className="text-xl font-light"></p>
              <button onClick={onClose}>
                <Image
                  alt="Close Icon"
                  src="/home/cross.svg"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-y-5">
              {successSign}
              <span className="text-[#76E268] text-xl">
                Transaction Submitted
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

const successSign = (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32.5034 33.353H46.6468V47.4964"
      stroke="#76E268"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M46.6651 33.3331L21.5817 58.4164C19.8217 60.1764 16.9651 60.1764 15.2051 58.4164V58.4164C10.7717 53.9831 8.27505 47.9698 8.26172 41.6998V41.6998C8.26172 37.5998 9.05505 33.4998 10.6317 29.6431C12.1851 25.8464 14.4951 22.2898 17.5784 19.2098C23.1084 13.6798 30.7484 10.2598 39.1851 10.2598C47.6217 10.2598 55.2617 13.6798 60.7917 19.2098C66.3217 24.7398 69.7417 32.3764 69.7417 40.8164C69.7417 49.2531 66.3217 56.8931 60.7917 62.4231C55.2617 67.9531 47.6251 71.3731 39.1851 71.3731C35.8951 71.3731 32.6117 70.8064 29.4617 69.7464"
      stroke="#76E268"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
