import React, { useEffect, useState } from "react";
import HomeIcon from "@/assets/home-icon.png";
import PlayIcon from "@/assets/play-icon.png";
import WalletIcon from "@/assets/wallet-icon.png";
import TasksIcon from "@/assets/task-icon.png";
import { useLocation, useNavigate } from "react-router-dom";

// Interface pour les props des éléments du menu
interface MenuItemProps {
  icon: string;
  activeIcon?: string;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

// Composant pour un élément du menu
const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  activeIcon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-300 ${
        isActive ? "text-yellow-200 -translate-y-2" : "text-yellow-300"
      }`}
      onClick={onClick}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <img
          src={isActive && activeIcon ? activeIcon : icon}
          alt={label}
          className={`w-12 h-12 transition-transform duration-200 ${
            isActive ? "scale-110" : ""
          }`}
        />
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-500 rounded-full" />
        )}
      </div>
      <span
        className={`text-xs mt-1 font-medium transition-opacity ${
          isActive ? "opacity-100" : "opacity-70"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

// Composant principal du menu
const Menu = () => {
  const [activePath, setActivePath] = useState<string>("/");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Configuration des éléments du menu avec les icônes personnalisées
  const menuItems = [
    {
      path: "/",
      label: "Home",
      icon: HomeIcon,
      activeIcon: HomeIcon,
    },
    {
      path: "/play",
      label: "Play",
      icon: PlayIcon,
      activeIcon: PlayIcon,
    },
    {
      path: "/wallet",
      label: "Wallet",
      icon: WalletIcon,
      activeIcon: WalletIcon,
    },
    {
      path: "/tasks",
      label: "Tasks",
      icon: TasksIcon,
      activeIcon: TasksIcon,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-800 shadow-lg z-50 mb-4">
      {/* Bordure supérieure brillante */}
      <div className="h-0.5 w-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 shadow-md"></div>

      {/* Conteneur du menu avec effet 3D */}
      <div className="relative">
        {/* Fond avec dégradé pour effet 3D */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500 to-yellow-600"></div>

        {/* Effet d'ombre intérieure pour l'effet 3D */}
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Reflet en haut */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-yellow-300 to-transparent opacity-40"></div>

        {/* Ombre en bas */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-yellow-700 to-transparent opacity-30"></div>
        <div className="flex justify-around items-center h-full max-w-md mx-auto px-2">
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              activeIcon={item.activeIcon}
              label={item.label}
              path={item.path}
              isActive={activePath === item.path}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
