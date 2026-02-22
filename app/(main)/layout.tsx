import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import MusicPlayer from "@/components/music-player";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden select-none">
        <AppSidebar />
        <SidebarInset className="flex flex-col h-full overflow-hidden bg-background">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 pb-24">{children}</main>
        </SidebarInset>
      </div>
      <MusicPlayer />
    </SidebarProvider>
  );
}
