import styles from './chat.module.scss';
import {DialogList} from "@/app/components/dialog/dialog-list";

//在 React 中，只有被引用的组件才会被渲染，而未被引用的组件不会被渲染到页面上。
export function Chat() {
    return (
        <div className={styles["chat"]}>
            <DialogList/>
        </div>
    );
}