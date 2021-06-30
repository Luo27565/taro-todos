import { ADDTodo, MINUSTodo, ChangeTodo, EditTodo } from '../constants/todos';
export const addTodo = data => {
  return {
    type: ADDTodo,
    data
  };
};
export const minusTodo = data => {
  return {
    type: MINUSTodo,
    data
  };
};
export const changeTodo = data => {
  return {
    type: ChangeTodo,
    data
  };
};
export const editTodo = data => {
  return {
    type: EditTodo,
    data
  };
};