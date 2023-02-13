import { ReactNode } from "react";
import "./breadcrumbs.css";

interface BreadcrumbsProps {
    children: ReactNode;
    name: string;
}

export default function Breadcrumbs({ children, name }: BreadcrumbsProps) {
    return(
        <div className="breadcrumbs">
            {children}
            <span>{name}</span>
        </div>
    );
}