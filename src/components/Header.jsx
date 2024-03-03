import Image from "next/image";

const Header = () => {
  return (
    <div className="max-w-7xl flex justify-between h-[72px] px-5">
      <Image src="/logo.svg" width={44} height={32} alt="logo" />
    </div>
  );
};

export default Header;
