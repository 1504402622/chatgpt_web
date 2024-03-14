import "./styles/globals.scss";
import { Inter } from 'next/font/google'

/*
* 1.使用 Inter 字体作为页面的默认字体，通过调用 Inter 函数并指定子集为拉丁语（latin）来创建字体对象 inter。
2.导出了一个名为 metadata 的对象，其中包含了页面的元数据，如标题和描述。
3.定义了一个名为 RootLayout 的函数组件，该组件接收一个 children 属性，表示需要包裹的子元素。
4.RootLayout 组件返回了一个 HTML 结构，包含了 <html> 和 <body> 元素。lang 属性被设置为 'en'，表示页面语言为英语。
5.body 元素的 className 属性被设置为 inter.className，这将应用 Inter 字体的样式到整个页面，确保页面上的文本都使用 Inter 字体。
* */
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OpenAi - 牛',
  description: '您的 ChatGPT 贴心助手！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
