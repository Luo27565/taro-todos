import Nerv from "nervjs";
import { __decorate } from "tslib";
import Taro from "@tarojs/taro-h5";
import { Input, View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from "@tarojs/redux-h5";
import './index.scss';
import { minusTodo, changeTodo, editTodo } from "../../actions/todos";
let Index = class Index extends Taro.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      flag: {}
    };
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  componentWillReceiveProps() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    // @ts-ignore
    const { edit } = this.state;
    return <View className="index">
        {[...this.props.todos.todosList.values()].map(e => {
        // @ts-ignore
        const { value, type } = e;
        return <View className="todo-item">
                <View className="check" onClick={() => this.changeTodo(e)}>
                  {type === 'Active' ? '' : <AtIcon value="check" size="18" color="#98FB98" />}
                </View>
                <View className="content">
                  {type === 'Active' ? edit ? <Input value={value} onConfirm={this.onInputBlur} onBlur={this.onInputBlur} /> : <View>{value}<AtIcon value="edit" size="18" color="#DB7093" onClick={() => this.editTodo(e)} /></View> : <View className="completed">{value}</View>}
                </View>
                <AtIcon value="close" size="18" color="#DB7093" onClick={() => this.delTodo(e)} />
              </View>;
      })}
      </View>;
  }
  delTodo = data => {
    this.props.minusTodo(data);
  };
  changeTodo = data => {
    this.props.changeTodo(data);
  };
  editTodo = data => {
    this.setState({ edit: true, flag: { ...data } });
  };
  onInputBlur = event => {
    const { detail: { value } } = event;
    // @ts-ignore
    const { id, type } = this.state.flag;
    this.props.editTodo({ id: id, type: type, value: value });
    this.setState({ edit: false, flag: {} });
  };
};
Index = __decorate([connect(({ todos }) => ({
  todos
}), dispatch => ({
  minusTodo(data) {
    dispatch(minusTodo(data));
  },
  changeTodo(data) {
    dispatch(changeTodo(data));
  },
  editTodo(data) {
    dispatch(editTodo(data));
  }
}))], Index);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Index;