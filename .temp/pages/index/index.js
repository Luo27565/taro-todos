import Nerv from "nervjs";
import { __decorate } from "tslib";
import Taro from "@tarojs/taro-h5";
import { View, Input } from '@tarojs/components';
import Title from "../../components/title/index";
import Footer from "../../components/footer/index";
import { connect } from "@tarojs/redux-h5";
import { Guid } from "guid-typescript";
import Todo from "../../components/todo/index";
import { addTodo, minusTodo } from '../../actions/todos';
import './index.scss';
let Index = class Index extends Taro.Component {
  constructor(props) {
    super(props);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    this.state = {
      title: 'todos',
      placeholder: 'What needs to be done?',
      newVal: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  render() {
    // @ts-ignore
    const { title, placeholder, newVal } = this.state;
    return <View className="index">
        <Title title={title} />
        <Input className="new-todo" placeholder={placeholder} value={newVal} autoFocus={true} onConfirm={this.onInputBlur} onBlur={this.onInputBlur} />
        <Todo />
        <Footer onClick={this.onFooterClick} />
      </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
  onInputBlur = event => {
    const { detail: { value } } = event;
    value.trim() && this.props.addTodo({ value: value, id: Guid.create().toString(), type: 'Active' });
    this.setState({ newVal: '' });
  };
  onFooterClick = data => {
    console.log(data);
  };

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
  }

};
Index = __decorate([connect(({ todos }) => ({
  todos
}), dispatch => ({
  addTodo(data) {
    dispatch(addTodo(data));
  },
  minusTodo(id) {
    dispatch(minusTodo(id));
  }
}))], Index);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Index;