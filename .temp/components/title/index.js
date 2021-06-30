import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import './index.scss';
export default class Title extends Taro.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title } = this.props;
    return <h1 className="title">{title}</h1>;
  }
}