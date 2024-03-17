import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Dialog, Message, MessageDirection, MessageRole, MessageType, SessionConfig} from "@/types/chat";
import {GptVersion} from "@/app/constants";

//用于描述一个聊天存储对象的结构。
//
// 这个接口包含以下属性和方法：
//
// id：表示聊天存储对象的唯一标识符。
// sessions：一个包含多个 ChatSession 对象的数组，用于存储所有的聊天会话。
// currentSessionIndex：当前选定的会话在 sessions 数组中的索引。
// openSession：一个函数，用于打开一个新的聊天会话，并返回该会话对象。
// selectSession：一个函数，用于选择指定索引的会话。
// deleteSession：一个函数，用于删除指定索引的会话。
// currentSession：一个函数，用于获取当前选定的会话。
// onSendMessage：一个函数，用于发送消息到当前会话。
// updateCurrentSession：一个函数，用于更新当前选定的会话，接受一个函数作为参数，该函数用于对当前会话进行更新操作。
interface ChatStore {
    id: number;
    sessions: ChatSession[];
    currentSessionIndex: number;
    openSession: () => ChatSession;
    selectSession: (index: number) => void;
    deleteSession: (index: number) => void;
    currentSession: () => ChatSession;
    onSendMessage: (message: Message) => void;
    updateCurrentSession: (updater: (session: ChatSession) => void) => void;
}

export interface ChatSession {
    // 会话ID
    id: number;
    // 对话框体
    dialog: Dialog;
    // 对话消息
    messages: Message[];
    // 会话配置
    config: SessionConfig;
    // 清除会话的索引
    clearContextIndex?: number;
}

/*
这段代码是一个函数 createChatSession()，它用于创建一个新的聊天会话 ChatSession。让我解释一下其中的各个部分：

函数返回类型声明: function createChatSession(): ChatSession { ... } 表明这个函数返回一个 ChatSession 类型的对象。

ChatSession 对象:
id: 聊天会话的唯一标识符，这里设定为 0。
dialog: 包含关于聊天对话框的信息，比如头像、标题、消息计数、副标题和时间戳。
avatar: 对话框的头像路径。
title: 对话框的标题。
count: 消息计数，这里初始为 0。
subTitle: 对话框的副标题。
timestamp: 对话框的时间戳，使用了 new Date().getTime() 来获取当前时间的毫秒数。
messages: 聊天消息的数组，这里初始化了一个消息对象。
avatar: 消息的头像路径。
content: 消息的内容。

message_type: 消息的类型，这里设为 MessageType.Text，表示文本消息。
time: 消息的时间戳，使用了 Date.now() 来获取当前时间的毫秒数。
direction: 消息的方向，这里设为 MessageDirection.Receive，表示是接收到的消息。
role: 消息的角色，这里设为 MessageRole.system，表示系统消息。
clearContextIndex: 可选的清除上下文索引。
config: 聊天会话的配置信息。
gptVersion: GPT 版本，这里设为 GptVersion.GPT_3_5_TURBO，表示 GPT 版本为 3.5 Turbo。
这个函数的作用是创建一个初始的聊天会话对象，包含
 */
function createChatSession(): ChatSession {
    return {
        id: 0,
        dialog: {
            avatar: "/role/wali.png",
            title: "新的对话",
            count: 0,
            subTitle: "请问有什么需要帮助的吗？",
            timestamp: new Date().getTime(),
        },
        messages: [
            {
                avatar: "/role/wali.png",
                content: "请问有什么需要帮助的吗？",
                message_type: MessageType.Text,
                time: Date.now(),
                direction: MessageDirection.Receive,
                role: MessageRole.system
            }
        ],
        clearContextIndex: undefined,
        config: {
            gptVersion: GptVersion.GPT_3_5_TURBO,
        }
    };
}

export const userChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            // 属性赋值
            id: 0,
            sessions: [createChatSession()],
            currentSessionIndex: 0,

            // 开启会话
            openSession() {
                const session = createChatSession();
                // 每开启一个会话，就对应设置一个对话ID
                set(() => ({id: get().id + 1}));
                session.id = get().id;

                // 保存创建的会话，到 sessions 数组中
                set((state) => ({
                    currentSessionIndex: session.id,
                    // 在数组头部插入数据
                    sessions: [session].concat(state.sessions),
                }));

                return session;
            },

            // 选择会话
            selectSession(index: number) {
                set({
                    currentSessionIndex: index,
                });
            },

            // 删除会话
            deleteSession(index: number) {
                const count = get().sessions.length;
                const deleteSession = get().sessions.at(index);

                if (!deleteSession) return;

                const sessions = get().sessions.slice();
                sessions.splice(index, 1);

                const currentIndex = get().currentSessionIndex;
                let nextIndex = Math.min(
                    currentIndex - Number(index < currentIndex),
                    sessions.length - 1,
                );

                if (count === 1) {
                    nextIndex = 0;
                    sessions.push(createChatSession());
                }

                set(() => ({
                    currentSessionIndex: nextIndex,
                    sessions,
                }));

            },

            // 当前会话
            currentSession() {
                let index = get().currentSessionIndex;
                const sessions = get().sessions;
                if (index < 0 || index >= sessions.length) {
                    index = Math.min(sessions.length - 1, Math.max(0, index));
                    set(() => ({currentSessionIndex: index}));
                }
                return sessions[index];
            },

            // 发送消息
            onSendMessage(message: Message) {
                const session = get().currentSession();
                get().updateCurrentSession((session) => {
                    session.messages = session.messages.concat(message);
                });
                // 后续调用接口，将消息发送给服务端

            },

            // 更新当前会话
            updateCurrentSession(updater) {
                const sessions = get().sessions;
                const index = get().currentSessionIndex;
                updater(sessions[index]);
                set(() => ({sessions}))
            }
        }),
        {
            name: "chat-store"
        }
    ),
);