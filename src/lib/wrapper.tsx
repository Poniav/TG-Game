import Menu from "@/components/Menu";
import { useEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.touchAction = "none";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, []);
  return (
    <div className="app-wrapper">
      <div className="app-content">
        {children}
        <Menu />
      </div>
    </div>
  );
};

export default Wrapper;
