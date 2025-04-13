import Fish from "@/assets/fish.png";
import bg from "@/assets/bg.png";

const Home = () => {
  return (
    <div className="relative w-full h-screen pb-16 overflow-hidden">
      {/* Background image with proper styling to cover the full height */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <img src={bg} alt="bg" className="w-full h-full object-cover" />
      <img src={Fish} alt="Fish" className="absolute fish-home" />
    </div>
  );
};

export default Home;
