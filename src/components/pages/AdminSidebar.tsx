import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";

function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="px-4 py-3">
                    <div className="text-xl font-bold">Acme</div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <nav className="space-y-1 px-2 pb-2">
                        <a
                            className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                            href="/"
                        >
                            Dashboard
                        </a>
                    </nav>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default AppSidebar;
