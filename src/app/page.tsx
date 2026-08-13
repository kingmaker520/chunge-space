import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { NowDoing } from "@/components/NowDoing";
import { RecentThoughts } from "@/components/RecentThoughts";
import { Practice } from "@/components/Practice";
import { DailyLog } from "@/components/DailyLog";
import { Timeline } from "@/components/Timeline";
import { Statement } from "@/components/Statement";
import { Welcome } from "@/components/Welcome";
import { CommentSection } from "@/components/CommentSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <Header />
      <Hero />
      <About />
      <NowDoing />
      <RecentThoughts />
      <Practice />
      <DailyLog />
      <Timeline />
      <Statement />
      <Welcome />
      <CommentSection targetType="article" targetId="homepage" title="读者留言" />
      <Footer />
    </main>
  );
}
