import { ADDTodo, MINUSTodo, ChangeTodo, EditTodo } from '../constants/todos';
const INITIAL_STATE = {
  // todosList: [{type: 'Active', value: '已完成'}, {type: 'Completed', value: '没开始'}]
  todosList: new Map()
};
export default function todos(state = INITIAL_STATE, action) {
  const { data, type } = action;
  switch (type) {
    case ADDTodo:
      state.todosList.set(data.id, data);
      return {
        ...state
      };
    case MINUSTodo:
      state.todosList.delete(data.id);
      return {
        ...state
      };
    case ChangeTodo:
      state.todosList.set(data.id, { ...data, type: data.type === 'Active' ? 'Completed' : 'Active' });
      return {
        ...state
      };
    case EditTodo:
      state.todosList.set(data.id, data);
      return {
        ...state
      };
    default:
      return state;
  }
}