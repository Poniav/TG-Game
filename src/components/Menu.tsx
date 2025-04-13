import React, { useState } from "react";
import HomeIcon from "@/assets/home-icon.png";
import PlayIcon from "@/assets/play-icon.png";
import WalletIcon from "@/assets/wallet-icon.png";
import TasksIcon from "@/assets/task-icon.png";
import { useNavigate } from "react-router-dom";

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
        isActive ? "text-yellow-500 -translate-y-2" : "text-gray-400"
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
  // Simulation de navigation
  const handleNavigation = (path: string) => {
    setActivePath(path);
    console.log(`Navigation vers: ${path}`);
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
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-800 shadow-lg z-50">
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
  );
};

export default Menu;
