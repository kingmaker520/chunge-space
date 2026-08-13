import type { Gender } from "@/lib/types";

export const siteConfig = {
  name: "春哥空间",
  enName: "CHUNGE.SPACE",
  domain: "chunge.space",
  owner: "李长春",
  nav: [
    { label: "首页", href: "#top" },
    { label: "关于我", href: "#about" },
    { label: "思想", href: "#thoughts" },
    { label: "实践", href: "#practice" },
    { label: "日志", href: "#log" },
  ],
  social: [
    { label: "微信", href: "#" },
    { label: "公众号", href: "#" },
    { label: "邮箱", href: "#" },
  ],
};

export const heroStats = [
  { value: "100+", label: "篇文章" },
  { value: "4", label: "个实践项目" },
  { value: "365", label: "天坚持" },
];

export const aboutParagraphs = [
  "做了 8 年保险，大部分时间在招团队。现在，我想换一种活法——把注意力放回自己身上，重新打磨个人产能。",
  "春哥空间是我给自己造的一个数字总部：把思考写下来，把实践晒出来，把长期主义变成每天的具体动作。",
  "如果你也在普通的日子里，想认真做成一件事，欢迎一起。",
];

export interface NowItem {
  icon: "spark" | "rocket" | "user" | "tree";
  title: string;
  desc: string;
}

export const nowItems: NowItem[] = [
  { icon: "spark", title: "AI 探索", desc: "用 AI 重塑个人工作流，每天学一点、用一点。" },
  { icon: "rocket", title: "轻创业", desc: "不融资、不雇人，用最小成本验证想法。" },
  { icon: "user", title: "个人 IP", desc: "把真实的自己交付出去，而不是包装一个完美人设。" },
  { icon: "tree", title: "长期事业", desc: "寻找一件能做 10 年以上的事，慢慢变厚。" },
];

export interface Thought {
  date: string;
  category: string;
  title: string;
}

export const thoughts: Thought[] = [
  { date: "2026.08.12", category: "思考", title: "普通人创业，先别想融资" },
  { date: "2026.08.05", category: "实践", title: "我用 AI 重做了我的工作日" },
  { date: "2026.07.28", category: "复盘", title: "招了 8 年团队，我学到的一件事" },
];

export type ProjectStatus = "进行中" | "实验中" | "IDEA";

export interface Project {
  name: string;
  status: ProjectStatus;
  desc: string;
  targetId: string;
}

export const projects: Project[] = [
  { name: "良久团购", status: "进行中", desc: "用社群团购验证轻创业模型。", targetId: "proj-liangjiu" },
  { name: "AI 实验室", status: "实验中", desc: "把 AI 工具拆开，做成自己的生产力系统。", targetId: "proj-ai-lab" },
  { name: "春哥个人 IP", status: "进行中", desc: "持续输出真实的创业日常。", targetId: "proj-ip" },
  { name: "全国创业实验", status: "IDEA", desc: "一个还在脑子里的长期计划。", targetId: "proj-nation" },
];

export interface LogEntry {
  date: string;
  type: string;
  content: string;
}

export const dailyLogs: LogEntry[] = [
  { date: "08.14", type: "复盘", content: "今天把评论系统想清楚了，普通人也能有自己的数字总部。" },
  { date: "08.12", type: "思考", content: "写下一年的三个目标，删掉两个。" },
  { date: "08.10", type: "实践", content: "第一次用 AI 生成设计稿，效率翻倍。" },
  { date: "08.08", type: "生活", content: "陪家人爬山，山顶想通了一件事。" },
];

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  now?: boolean;
  future?: boolean;
}

export const timeline: TimelineItem[] = [
  { year: "2007", title: "起点", desc: "第一次接触销售，发现沟通是一门手艺。" },
  { year: "2011", title: "入行", desc: "进入保险行业，开始漫长的组织发展之路。" },
  { year: "2025", title: "转折", desc: "决定把重心放回个人产能，重启 Producer 模式。" },
  { year: "2026", title: "NOW", desc: "春哥空间上线，长期实验正式开始。", now: true },
  { year: "未来", title: "进行中", desc: "建立一个更好的自己。", future: true },
];

export const emojiOptions = [
  "🚀", "🎯", "💡", "🔥", "⭐", "🌟",
  "😄", "😎", "🤔", "🥳", "😊", "🤓",
  "🦁", "🐯", "🦊", "🐼", "🐸", "🐺",
  "🌙", "☀️", "⚡", "🌈", "🎸", "⚽",
  "💪", "🧠", "🦅", "🌊", "🏔️", "🎪",
];

export const genderMeta: Record<Gender, { symbol: string; color: string; label: string }> = {
  male: { symbol: "♂", color: "var(--color-male)", label: "男生" },
  female: { symbol: "♀", color: "var(--color-female)", label: "女生" },
};
