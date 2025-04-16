import React, { useState } from "react";

// Composant principal du menu
const Header = () => {
  const [activePath, setActivePath] = useState<string>("/");

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-800 shadow-lg z-50 mb-4"></div>
  );
};

export default Header;
