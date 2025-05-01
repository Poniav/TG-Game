import Fish from "@/assets/elements/fish.png";
import bg from "@/assets/elements/bg.png";
import useTelegramWebApp from "@/hooks/useTelegramApp";
const Home = () => {
  const { areaInsets } = useTelegramWebApp();
  return (
    <div className="relative w-full h-full pb-16 overflow-hidden">
      {/* Background image with proper styling to cover the full height */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingBottom: `${areaInsets.bottom}px`,
          paddingTop: `${areaInsets.top}px`,
        }}
      />
      <img src={bg} alt="bg" className="w-full h-full object-cover" />
      <div className="absolute inset-0 w-full h-[300px] flex flex-col items-center justify-center">
        <h1 className="text-white text-6xl font-bold stroke-effect">
          Season 1
        </h1>
        <p className="text-white text-xl stroke-effect-small">
          Dive into the ocean
        </p>
      </div>
      <img src={Fish} alt="Fish" className="absolute fish-home" />
    </div>
  );
};

export default Home;
