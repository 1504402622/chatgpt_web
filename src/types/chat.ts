import {GptVersion} from "@/app/constants";

export interface Dialog {
    // 头像
    avatar: string;
    // 小标题
    subTitle: string;
    // 对话最后时间
    timestamp: number;
    // 聊天头
    title: string;
    // 消息数
    count: number;
}

//Message 接口定义了消息的结构，包括头像 (avatar)、内容 (content)、消息类型 (message_type)、
// 时间 (time)、方向 (direction) 和角色 (role)。
export interface Message {
    avatar: string;
    content: string;
    message_type: MessageType;
    time: number;
    direction?: MessageDirection;
    role: MessageRole;
}

//表示 GPT 版本。
export interface SessionConfig {
    gptVersion: GptVersion;
}
//枚举类角色
export enum MessageRole{
    system = 0,
    user = 1,
    assistant = 2
}
export enum MessageType {
    Link = "link",
    Pic = "pic",
    Text = "text",
}

export enum MessageDirection {
    Send = 0,
    Receive,
}
