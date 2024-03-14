import styles from "./button.module.scss";

/**
 * 定义通用按钮函数 IconButton
 * @param props.onClick 按钮事件(可选)
 * @param props.icon 图标(可选)
 * @param props.className CSS 样式
 * @param props.title 图标名称
 * @param props.text 图标说明
 * */
export function IconButton(props: {
    onClick?: () => void;
    icon?: JSX.Element;
    className?: string;
    title?: string;
    text?: string;
    backgroundColor?: string;
}) {
    const {backgroundColor} = props;

    const buttonStyle = {
        /*一开始是赋值了背景色*/
        backgroundColor: backgroundColor,
    };
// 组件会根据传入的 props 进行渲染，如果有图标和文本，它们会显示在按钮上。
// 按钮的背景颜色可以根据传入的 backgroundColor props 进行定制。当按钮被点击时，会触发传入的 onClick 函数。
    return (
        <button className={styles["icon-button"]} style={buttonStyle} onClick={props.onClick}>
            {/*定义图标出现，点击时触发*/}
            {props.icon && <div className={styles["icon-button-icon"]}>{props.icon}</div>}
            {/*字体好像未定义*/}
            {props.text && <div className={styles["icon-button-text"]}>{props.text}</div>}
        </button>
    );
}



