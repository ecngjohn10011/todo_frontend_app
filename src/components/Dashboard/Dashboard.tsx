import { TodoItem } from "./components/TodoItem";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { CreateTodo } from "./components/CreateTodo";

const Dashboard = () => {
  // get user todos

  const todos = ["Wash car", "Take out trash"];

  return (
    <div className="h-full w-full flex flex-col items-center justify-start md:p-12 p-4 py-8 relative bg-primary">
      <div className="text-3xl text-white">Todos</div>
      <div className="py-6 w-full md:w-4/5 lg:w-4/5">
        <CreateTodo />
        <div className="">
          {" "}
          {todos.map((todo: string, index: any) => (
            <TodoItem
              key={index}
              todo={todo}
            />
          ))}
        </div>
      </div>
      <div className="md:hidden absolute md:bottom-12 md:right-12 bottom-8 right-8">
        {" "}
        <Fab
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export { Dashboard };
