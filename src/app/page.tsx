import cornJob  from "@/wfu/app/lib/cron";

export default function Home() {
  cornJob();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-center">
        <p>Learning More About Everything</p>
      </div>
    </div>
  );
}
