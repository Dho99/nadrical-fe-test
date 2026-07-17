import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    UsersIcon,
    SettingsIcon,
    LogOutIcon,
    FileChartColumnIncreasing,
    CodeXml,
    UserIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { matchPath } from "react-router";
import { useIsMobile } from "@/hooks/use-mobile";

interface IProps {
    name: string;
    href: string;
    icon: typeof LayoutDashboard;
    isMobileMenu?: boolean;
}

function AppSidebar() {
    const { logout } = useAuth();

    const navItems: IProps[] = [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Users", href: "/#", icon: UsersIcon },
        { name: "Analytics", href: "/#", icon: FileChartColumnIncreasing },
        { name: "API", href: "/#", icon: CodeXml },
        { name: "Settings", href: "/#", icon: SettingsIcon },
    ];

    const navItemsMobile: IProps[] = [
        { name: "My Profile", href: "/#", icon: UserIcon, isMobileMenu: true },
    ];

    const isActive = (path: string) => {
        const match = matchPath({ path, end: false }, window.location.pathname);
        return match !== null;
    };

    const isMobile = useIsMobile();

    return (
        <Sidebar className="bg-sidebar text-sidebar-foreground">
            <SidebarHeader>
                <div className="px-4 py-3">
                    <div className="text-xl font-bold">Acme</div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <nav className="space-y-1 px-2 pb-2">
                        {navItems.map((nav, index) => (
                            <NavLink
                                key={index}
                                className={cn(
                                    "flex rounded-md px-5 py-3 text-sm hover:bg-accent hover:text-accent-foreground flex flex-row space-x-5 items-center",
                                    {
                                        "bg-accent/50 border border-slate-700/50 text-accent-foreground":
                                            isActive(nav.href),
                                    },
                                )}
                                to={nav.href}
                            >
                                <nav.icon
                                // className={cn({
                                //     "text-chart-2": isActive(nav.href),
                                // })}
                                />
                                <span>{nav.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {isMobile && (
                        <nav className="space-y-1 px-2 pb-2 ">
                            {navItemsMobile.map((nav, index) => (
                                <NavLink
                                    key={index}
                                    className={cn(
                                        "flex rounded-md px-5 py-3 text-sm hover:bg-accent hover:text-accent-foreground flex flex-row space-x-5 items-center",
                                        {
                                            "bg-accent/50 border border-slate-700/50 text-accent-foreground":
                                                isActive(nav.href),
                                        },
                                    )}
                                    to={nav.href}
                                >
                                    <nav.icon
                                        className={cn("h-4 w-4 ", {
                                            "text-chart-2": isActive(nav.href),
                                        })}
                                    />
                                    <span>{nav.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    )}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-border">
                <Button
                    variant="destructive"
                    className="w-full justify-start p-5"
                    onClick={logout}
                >
                    <LogOutIcon className="mr-2 size-5" />
                    <span>Logout</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;
