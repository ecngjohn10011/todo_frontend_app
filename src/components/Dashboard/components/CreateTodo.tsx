import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { TodoPost } from "../../../types";
import { todoValidationRules } from "../../../scripts/todoValidationRules";

const CreateTodo = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TodoPost>();

  const onSubmit = (data: TodoPost) => {};

  return (
    <div className="mb-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hidden md:flex justify-center flex-row w-full text-left"
      >
        <div className="flex rounded md:w-4/5">
          <FormControl
            className="rounded w-full"
            error={Boolean(errors.todo)}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.todo)}
                  className="w-full bg-white hover:border-slate-400 rounded rounded-tr-none rounded-br-none"
                  label="Todo Description"
                  variant="filled"
                />
              )}
              name="todo"
              control={control}
              defaultValue=""
              rules={todoValidationRules}
            />
            {errors.todo && (
              <span className="text-red-500 text-sm mt-2 font-medium">
                {errors.todo.message || "Todo is required."}
              </span>
            )}
          </FormControl>
        </div>

        <div className="">
          <button
            type="submit"
            className=" text-slate-800 border-none px-4 h-14 hover:border-none hover:bg-slate-200 transition-all ease-in-out duration-200 hover:text-slate-600 rounded rounded-tl-none rounded-bl-none bg-slate-100"
          >
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export { CreateTodo };
