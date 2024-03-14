import {create} from "zustand";
import {persist} from "zustand/middleware";

/**
 * 配置文件
 * @param tightBorder true/false 是否全框体展示
 */
// DEFAULT_CONFIG: 这是默认的配置对象，包含了应用程序的默认配置参数，例如 tightBorder 表示是否全框体展示，默认为 false。
export const DEFAULT_CONFIG = {
    tightBorder: false,
}

//ChatConfig: 这是一个 TypeScript 类型，表示了配置对象的类型，它与 DEFAULT_CONFIG 的类型相同。
export type ChatConfig = typeof DEFAULT_CONFIG;

//ChatConfigStore: 这是一个 TypeScript 接口，表示了配置存储对象的类型，、
//它扩展了 ChatConfig 并添加了两个方法：reset 和 update。reset 方法用于重置配置为默认值，update 方法用于更新配置。
export type ChatConfigStore = ChatConfig & {
    reset: () => void;
    update: (updater: (config: ChatConfig) => void) => void;
};

/**
 * create 函数创建了一个 ChatConfigStore 实例，并且通过 export 关键字导出了一个名为 useAppConfig 的常量。
 * ChatConfigStore 可能是一个自定义的数据存储类，而 useAppConfig 是一个用于在 React 组件中访问和修改 ChatConfigStore 实例的自定义 Hook。
 */
//useAppConfig: 这是一个自定义的 Hook，用于在 React 组件中访问和修改配置存储对象。
// 它使用 create 函数创建了一个 ChatConfigStore 实例，并通过 persist 中间件实现了状态的持久化。
// persist 中间件接收两个参数：一个函数用于定义状态的初始值和更新方法，以及一个配置对象用于指定持久化的名称、版本和迁移函数。
export const useAppConfig = create<ChatConfigStore>()(
    persist(
        (set, get) => ({
            ...DEFAULT_CONFIG,

            reset() {
                set(() => ({...DEFAULT_CONFIG}));
            },

            update(updater) {
                const config = {...get()};
                updater(config);
                set(() => config);
            },
        }),
        {
            name: "app-config",
            version: 2,
            migrate(persistedState, version) {
                if (version === 2) return persistedState as any;
                return persistedState as ChatConfig;
            },
        },
    ),
);