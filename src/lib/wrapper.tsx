import Menu from "@/components/Menu";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Menu />
    </div>
  );
};

export default Wrapper;
