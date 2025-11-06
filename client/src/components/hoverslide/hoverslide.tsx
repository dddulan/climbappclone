import { Home } from "lucide-react";
import {SquareArrowDown} from "lucide-react"
import React from "react";
interface HoverSlideIconProps {
  onClick?: () => void; // optional click handler
}


export const HoverSlideIcon:React.FC<HoverSlideIconProps> =({onClick}) =>{
  return (
       <div
      className="fixed top-40 left-0 transform -translate-y-1/2 flex items-center"
    >
      <button
        onClick={onClick}
        className="
          flex items-center justify-center
          h-8 w-5
          bg-black text-white
          rounded-r-md
          shadow-lg
          relative
          group
          overflow-hidden
          hover:w-16
          transition-all duration-300 ease-in-out
        "
      >


        {/* Sliding label */}
        <span
          className="
            absolute left-5
            text-white font-medium
            whitespace-nowrap
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300 ease-in-out
          "
        >
                    {/* Icon */}
        <SquareArrowDown className="w-6 h-6 z-10" />
        </span>
      </button>
    </div>
  );
}
