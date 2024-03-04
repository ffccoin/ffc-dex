"use client";
const Button = ({
  size = "small",
  width = "fit",
  outline,
  disabled = false,
  icon,
  title,
  className,
}) => {
  return (
    <button
      className={`grid place-items-center  rounded-[40px]  
      ${outline ? "border border-black" : ""}
      ${
        size === "small"
          ? "px-4 py-3"
          : size === "normal"
          ? "px-[25px] py-[15px]"
          : size === "medium"
          ? "px-[25px] py-[20px]"
          : size === "large"
          ? "px-[30px] py-[25px]"
          : ""
      }
        ${width === "fit" ? "w-auto" : "w-full"}
        disabled:opacity-50 ${className}
      `}
      disabled={disabled}
    >
      <div className="flex gap-x-2.5 text-sm">
        {title}
        {icon}
      </div>
    </button>
  );
};

export default Button;
