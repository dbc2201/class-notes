import {Button} from "../Button/Button.tsx";
import type CardProps from "./CardProps.ts";

/**
 * Card - A component that displays content and actions on a single topic.
 *
 * @param {CardProps} props - The props for the Card component.
 * @returns {JSX.Element} The rendered Card component.
 *
 * @example
 * <Card
 *   cardTitle="Example Card"
 *   cardBody="This is the body of the card, where content resides."
 *   cardButtonLabel="Learn More"
 * />
 */
export function Card(props: CardProps) {
	return (
		<div className="card card-bordered bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">{props.cardTitle}</h2>
				<p>{props.cardBody}</p>
				<div className="card-actions justify-end">
					<Button label={props.cardButtonLabel} variant="primary"></Button>
				</div>
			</div>
		</div>
	);
}