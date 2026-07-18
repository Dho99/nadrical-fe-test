import { useLocation } from "react-router";
import { Fragment } from "react";

function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="text-foreground text-lg">Dashboard</span>
            {pathnames.map((segment, i) => {
                const label = segment
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                    <Fragment key={i}>
                        <span className="text-muted-foreground/50">/</span>
                        <span>{label}</span>
                    </Fragment>
                );
            })}
        </div>
    );
}

export default Breadcrumb;
