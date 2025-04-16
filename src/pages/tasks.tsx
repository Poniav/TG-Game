import Menu from "@/components/Menu";
import Task from "@/components/Tasks";
import Wrapper from "@/lib/wrapper";

const Tasks = () => {
  return (
    <div>
      <Wrapper>
        <Task />
        <Menu />
      </Wrapper>
    </div>
  );
};

export default Tasks;
