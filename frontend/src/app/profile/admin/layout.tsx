import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='relative flex-1'>
        <div className='absolute top-2 left-4 z-10'>
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
