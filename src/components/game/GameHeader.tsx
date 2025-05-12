import React from "react";
import { Heart } from "lucide-react";
import useTelegramWebApp from "@/hooks/useTelegramApp";
interface GameHeaderProps {
  score: number;
  lives: number;
  maxLives: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, lives, maxLives }) => {
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
      <div className="flex items-center">
        {Array.from({ length: maxLives }).map((_, index) => (
          <Heart
            key={index}
            fill={index < lives ? "#ff0000" : "#777777"}
            color={index < lives ? "#ff0000" : "#777777"}
            size={28}
            className="mr-1"
          />
        ))}
      </div>

      {/* Score (à droite) */}
      <div className="bg-yellow-500 border-2 border-yellow-700 rounded-lg px-3 py-1 flex items-center">
        <span className="text-xl font-bold text-yellow-900">
          {Math.floor(score)} pts
        </span>
      </div>
    </div>
  );
};

export default GameHeader;
