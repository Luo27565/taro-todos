import Taro from '@tarojs/taro'
import './index.scss'

export default class Title extends Taro.Component<{ title: string }> {

    constructor(props) {
        super(props);
    }

    render() {
        const {title} = this.props
        return <h1 className="title">{title}</h1>
    }
}