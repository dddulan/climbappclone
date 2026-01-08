import { SquareArrowDown, SquareArrowUp } from "lucide-react";
import React from "react";
interface HoverSlideIconProps {
  onClick?: () => void; // optional click handler
}

export const HoverSlideIcon: React.FC<HoverSlideIconProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="fixed left-0 pointer-events-none">
      <button
        onClick={() => {
          onClick?.();
          setIsOpen(!isOpen);
        }}
        className="
          flex flex-col items-center justify-center
          h-4 w-8
          bg-black text-white
          rounded-b-md
          shadow-lg
          relative
          group
          overflow-hidden
          hover:h-10
          transition-all duration-300 ease-in-out
          pointer-events-auto
        "
      >
        {/* Icon */}
        {isOpen ? (
          <SquareArrowUp className="w-6 h-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
        ) : (
          <SquareArrowDown className="w-6 h-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
        )}

        {/* Sliding label */}
        <span
          className="
            absolute top-2
            text-white font-medium
            whitespace-nowrap
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300 ease-in-out
          "
        ></span>
      </button>
    </div>
  );
};
