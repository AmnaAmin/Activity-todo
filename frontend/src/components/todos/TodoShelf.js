import React from "react";
import uuid from 'react-uuid'
import TodoCard from "./TodoCard";

const TodoShelf = ({ entries }) => {
  return (
    <div>
      {entries.map(({ name, isDone }, index) => (
        <span key={index} >
          <TodoCard id={index} isDone={isDone}>
            {name}
          </TodoCard>
        </span>
      ))}
    </div>
  );
};

export default TodoShelf;
