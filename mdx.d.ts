// types/mdx.d.ts
declare module '*.mdx' {
  export const getBlogs: () => Promise<any[]>; // 替换 YourBlogType 为实际类型
  // 其他导出函数声明...
}