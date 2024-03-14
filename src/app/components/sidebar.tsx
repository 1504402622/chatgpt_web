import styles from "./sidebar.module.scss";

//导入SVG图标组件。
import ChatGPTIcon from "../icons/chatgpt.svg";
import ChatIcon from "../icons/chat.svg";
import RoleIcon from "../icons/role.svg";

import {useNavigate} from "react-router-dom";
import {Path} from "@/app/constants";
export function SideBar() {
    const navigate = useNavigate();

    /*定义了两个路径常量，分别代表聊天页面和角色页面的路径。*/
    const handleChatClick = () => {
        if (typeof window !== 'undefined') {
            navigate(Path.Chat);
        }
    };

    const handleRoleClick = () => {
        if (typeof window !== 'undefined') {
            navigate(Path.Role);
        }
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles["sidebar-header"]}>
                <ChatGPTIcon />
            </div>
            <div className={styles["sidebar-chat"]} onClick={handleChatClick}>
                {/*点击该图片触发该函数*/}
                <ChatIcon />
            </div>

            <div className={styles["sidebar-role"]} onClick={handleRoleClick}>
                <RoleIcon />
            </div>
        </div>
    );
}