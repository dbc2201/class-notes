import type {ReactNode} from "react";

export default interface CardProps {
    children: ReactNode;
    className: string;
    onClick: () => void;
    bordered: boolean;
    shadow: boolean;
    cardTitle: string;
    cardBody: string;
    cardButtonLabel: string;
}
