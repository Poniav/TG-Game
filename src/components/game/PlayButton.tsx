import React from "react";
import { Play } from "lucide-react";

interface PlayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="relative">
        {/* Losange rouge avec rotation */}
        <div className="bg-red-500 w-24 h-24 rounded-2xl transform rotate-45 border-2 border-black shadow-lg"></div>

        {/* Icône Play à l'intérieur du losange */}
        <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
          <Play size={48} fill="white" color="white" />
        </div>

        {/* Texte en dessous du losange */}
        <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 text-center w-40">
          <span className="text-white font-bold text-xs">
            MAINTENER POUR AUTOSPIN
          </span>
        </div>
      </div>
    </button>
  );
};

export default PlayButton;
