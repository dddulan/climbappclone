import React from "react";

interface RankBadgeProps {
  rank: number;
}

// Rank badge component with medal colors and glow
export const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => {
  const getBadgeStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
          text: "text-yellow-900",
          shadow: "shadow-lg shadow-yellow-500/50",
          ring: "ring-2 ring-yellow-300",
        };
      case 2:
        return {
          bg: "bg-gradient-to-br from-gray-300 to-gray-500",
          text: "text-gray-900",
          shadow: "shadow-lg shadow-gray-400/50",
          ring: "ring-2 ring-gray-300",
        };
      case 3:
        return {
          bg: "bg-gradient-to-br from-orange-400 to-orange-600",
          text: "text-orange-900",
          shadow: "shadow-lg shadow-orange-500/50",
          ring: "ring-2 ring-orange-300",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-blue-100 to-blue-200",
          text: "text-blue-900",
          shadow: "shadow-md shadow-blue-200/30",
          ring: "ring-1 ring-blue-200",
        };
    }
  };

  const styles = getBadgeStyles(rank);

  return (
    <div
      className={`
        inline-flex items-center justify-center
        w-10 h-10 rounded-full
        font-bold text-sm
        ${styles.bg} ${styles.text} ${styles.shadow} ${styles.ring}
        transition-all duration-200 hover:scale-110
      `}
    >
      {rank}
    </div>
  );
};