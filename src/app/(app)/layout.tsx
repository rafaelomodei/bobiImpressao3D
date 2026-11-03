import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <BottomNav />
      <div className="flex flex-1 flex-col pb-24 md:pb-0">{children}</div>
    </div>
  );
}
