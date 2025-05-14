import React from "react";
import { Heart } from "lucide-react";
import useTelegramWebApp from "@/hooks/useTelegramApp";

interface HomeHeaderProps {
  score: number;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ score }) => {
  const { areaInsets } = useTelegramWebApp();
  return (
    <div
      className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50"
      style={{
        paddingBottom: `${areaInsets.bottom}px`,
        paddingTop: `${areaInsets.top}px`,
      }}
    >
      {/* Vies (à gauche) */}
      <div className="flex items-center"></div>

      {/* Score (à droite) */}
      <div className="bg-yellow-500 border-2 border-yellow-700 rounded-lg px-3 py-1 flex items-center">
        <span className="text-xl font-bold text-yellow-900">
          {Math.floor(score)} pts
        </span>
      </div>
    </div>
  );
};

export default HomeHeader;
