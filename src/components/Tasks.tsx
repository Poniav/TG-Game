import Fish from "@/assets/elements/fish.png";
import bg from "@/assets/elements/bg.png";
import BtnPrimary from "@/components/BtnPrimary";
import tasksList from "@/assets/config/tasks_list.json";
import { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState(tasksList);
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
      {/* List */}
      <div className="absolute inset-0 w-full h-full p-4">
        <div className="flex flex-col items-center justify-center text-white mb-4">
          <h1 className="text-2xl font-bold stroke-effect">Do your tasks</h1>
          <p className="text-xs stroke-effect-small">
            and earn points to get rewards
          </p>
        </div>
        <ul className="w-full flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center rounded-lg p-2 bg-white"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-black">
                    <img src={task.icon} alt={task.name} className="w-6 h-6" />
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
  );
};

export default Tasks;
