import { Home } from "./components/home";

// 这段代码是一个 React 应用程序的入口文件，其中定义了一个名为 App 的异步函数组件。它包含以下几个要点：
//
// 导出了一个名为 App 的异步函数组件。
// App 组件返回了一个包裹在空的 Fragment (<>...</>) 中的 Home 组件。这意味着应用程序的根组件是 Home 组件，该组件将作为整个应用程序的起点。
// 这里使用了异步函数组件，虽然在这段代码中看不出异步操作，但异步函数组件允许你在组件中执行异步操作，例如数据获取、处理等。
export default async function App() {
    return (
        <>
            <Home/>
        </>
    )
}
