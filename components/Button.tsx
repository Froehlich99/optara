import Image from "next/image";
import React from "react";

type ButtonProps = {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, title, icon, variant }, ref) => {
    return (
      <button
        ref={ref}
        className={`flexCenter gap-3 rounded-full border ${variant} w-full`}
        type={type}
      >
        {icon && <Image src={icon} alt={title} width={24} height={24}></Image>}
        <label className="bold-16 whitespace-nowrap cursor-pointer">
          {title}
        </label>
      </button>
    );
  }
);

export default Button;
