import styles from './dialog-head.module.scss';
import { userChatStore } from "@/app/store/chat-store";
import { useNavigate } from "react-router-dom";

export function DialogHead() {
    const navigate = useNavigate();
    const chatStore = userChatStore();
    const [sessions, currentSessionIndex, selectSession] = userChatStore((state) => [
        state.sessions,
        state.currentSessionIndex,
        state.selectSession
    ]);

    return (
        <div className={styles["dialog-head"]}>
            <div className={styles["dialog-search-box"]}>
                <input type="text" placeholder="搜索对话" /> {/* 添加占位符 */}
            </div>
            <div className={styles["dialog-search-add"]} onClick={() => {
                let session = chatStore.openSession();
                selectSession(0);
                navigate(`/chat/${session.id}`, { state: { title: session.dialog.title } });
            }}>
            </div>
        </div>
    );
}