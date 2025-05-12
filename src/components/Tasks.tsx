import Fish from "@/assets/elements/fish.png";
import bg from "@/assets/elements/bg.png";
import BtnPrimary from "@/components/BtnPrimary";
import tasksList from "@/assets/config/tasks_list.json";
import { useState } from "react";
import useTelegramWebApp from "@/hooks/useTelegramApp";

const Tasks = () => {
  const [tasks, setTasks] = useState(tasksList);
  const { areaInsets } = useTelegramWebApp();
  
  return (
    <div className="relative w-full h-full">
      {/* Background image - utilisation de fixed pour ne pas défiler avec le contenu */}
      <div className="fixed inset-0 z-0">
        <div
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed", /* Maintient le background fixe pendant le scroll */
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      
      {/* Contenu défilant - avec z-index positif pour être au-dessus du background */}
      <div
        className="relative z-10 w-full h-full overflow-y-auto"
        style={{
          paddingBottom: `calc(${areaInsets.bottom}px + 5rem)`, /* Ajoute de l'espace pour le menu */
          paddingTop: `${areaInsets.top}px`,
          WebkitOverflowScrolling: "touch", /* Améliore le défilement sur iOS */
          touchAction: "pan-y", /* Permet le défilement tactile vertical */
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-white mb-4 p-4">
          <h1 className="text-2xl font-bold stroke-effect">Daily tasks</h1>
          <p className="text-xs stroke-effect-small">
            and earn points to get rewards
          </p>
        </div>
        
        {/* List 1 */}
        <div className="px-4">
          <ul className="w-full flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center rounded-lg p-2 bg-white"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-black">
                      <img src={task.icon} alt={task.alt} className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="text-sm inter-font">{task.name}</span>
                      <span className="text-xs inter-font text-green-500 font-bold">
                        +{task.points} pts
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <BtnPrimary text="Claim" color="green" link={task.link} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Separator */}
        <div className="flex flex-col items-center justify-center text-white mt-4 mb-4 p-4">
          <h1 className="text-2xl font-bold stroke-effect">Partners rewards</h1>
        </div>
        
        {/* List 2 */}
        <div className="px-4 pb-4">
          <ul className="w-full flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={`partner-${task.id}`}
                className="flex items-center rounded-lg p-2 bg-white"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-black">
                      <img src={task.icon} alt={task.alt} className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="text-sm inter-font">{task.name}</span>
                      <span className="text-xs inter-font text-green-500 font-bold">
                        +{task.points} pts
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <BtnPrimary text="Claim" color="green" link={task.link} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;