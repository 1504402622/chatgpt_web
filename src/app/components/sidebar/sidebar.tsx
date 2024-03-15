import styles from "./sidebar.module.scss";

import ChatGPTIcon from "../../icons/chatgpt.svg";
import ChatIcon from "../../icons/chat.svg";
import RoleIcon from "../../icons/role.svg";
//图片显示
import MaxIcon from "../../icons/max.svg";
import MinIcon from "../../icons/min.svg";
import ExitIcon from "../../icons/exit.svg";

import {useNavigate} from "react-router-dom";
import {Path} from "@/app/constants";
import {IconButton} from "@/app/components/button/button";
import {useAppConfig} from "@/app/store/config";

export function SideBar() {
    const navigate = useNavigate();
    const config = useAppConfig();

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

            {/*按钮点击触发*/}
            <div className={styles["action-button"]}>
                <IconButton icon={<ExitIcon/>} backgroundColor={"#ff4e4e"} onClick={() => {
                    alert("尚未实现");
                }}/>
                <IconButton icon={<MinIcon/>} backgroundColor={"#f3c910"} onClick={() => {
                    config.update(
                        (config) => (config.tightBorder = false),
                    );
                }}/>
                <IconButton icon={<MaxIcon/>} backgroundColor={"#04c204"} onClick={() => {
                    config.update(
                        (config) => (config.tightBorder = true),
                    );
                }}/>
            </div>

            {/*点击该图片触发该函数*/}
            <div className={styles["sidebar-header"]}>
                <ChatGPTIcon/>
            </div>
            <div className={styles["sidebar-chat"]} onClick={handleChatClick}>

                <ChatIcon/>
            </div>

            <div className={styles["sidebar-role"]} onClick={handleRoleClick}>
                <RoleIcon/>
            </div>
        </div>
    );
}