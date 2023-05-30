interface TodoItemProps {
  todo: String;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className="p-4 bg-white border-slate-100 text-slate-700 rounded mb-5 hover:bg-slate-100">
      {todo}
    </div>
  );
};

export { TodoItem };
