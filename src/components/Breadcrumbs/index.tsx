import "./breadcrumbs.css";

export default function Breadcrumbs({ children, name }: any) {
    return(
        <div className="breadcrumbs">
            {children}
            <span>{name}</span>
        </div>
    );
}