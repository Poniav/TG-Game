import React from "react";
import { Heart } from "lucide-react";

interface GameOverModalProps {
  score: number;
  lives: number;
  maxLives: number;
  onRestart: () => void;
  onBuyLives: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  lives,
  maxLives,
  onRestart,
  onBuyLives,
}) => {
  const canRestart = lives > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-4/5 max-w-md">
        {/* Titre */}
        <h2 className="text-2xl font-bold text-center mb-4 stroke-effect">
          Game Over
        </h2>

        {/* Score */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium mb-1">Your score</p>
          <p className="text-3xl font-bold text-green-500">
            {Math.floor(score)} pts
          </p>
        </div>

        {/* Hearts */}
        <div className="flex justify-center mb-6">
          {Array.from({ length: maxLives }).map((_, index) => (
            <Heart
              key={index}
              fill={index < lives ? "#ff0000" : "#777777"}
              color={index < lives ? "#ff0000" : "#777777"}
              size={36}
              className="mx-2"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          {canRestart && (
            <button
              onClick={onRestart}
              className="bg-green-500 text-green-900 py-3 px-4 rounded-lg border-2 border-black font-bold text-lg"
            >
              Play Again
            </button>
          )}

          <button
            onClick={onBuyLives}
            className="bg-yellow-400 text-yellow-900 py-3 px-4 rounded-lg border-2 border-black font-bold text-lg"
          >
            Buy Lives Pack
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
