import React from "react";
import { Star } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

// Rank badge component with circle star icons
export const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => {
  const getColors = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"; 
      case 2:
        return "text-gray-400"; 
      case 3:
        return "text-orange-600"; 
      default:
        return "text-blue-500"; 
    }
  };

  return (
    <div className="inline-flex items-center gap-1">
      <div className="relative inline-flex items-center justify-center">
        <div className={`w-8 h-8 rounded-full border-2 ${getColors(rank)} flex items-center justify-center`}>
          <Star
            className={`w-5 h-5 ${getColors(rank)} cursor-pointer`}
            fill="currentColor"
          />
        </div>
      </div>
    </div>
  );
};