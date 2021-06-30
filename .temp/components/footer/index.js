import Nerv from "nervjs";
import { __decorate } from "tslib";
import Taro from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import { AtTabBar } from 'taro-ui';
import './index.scss';
let Index = class Index extends Taro.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0
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
    const tabList = [{ title: 'All', iconType: 'menu', text: this.props.todos.todosList.size }, {
      title: 'Active',
      iconType: 'numbered-list',
      text: [...this.props.todos.todosList.values()].filter(e => e.type === 'Active').length
    }, {
      title: 'Completed',
      iconType: 'check-circle',
      text: [...this.props.todos.todosList.values()].filter(e => e.type === 'Completed').length
    }];
    // @ts-ignore
    const { current } = this.state;
    return <View className="index">
        <AtTabBar fixed tabList={tabList} current={current} onClick={this.handleTabBar} />
      </View>;
  }
  handleTabBar = value => {
    const flag = { 0: 'All', 1: 'Active', 2: 'Completed' };
    this.props.onClick(flag[value]);
    this.setState({
      current: value
    });
  };
};
Index = __decorate([connect(({ todos }) => ({
  todos
}), () => ({}))], Index);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Index;