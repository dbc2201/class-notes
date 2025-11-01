import type NotFoundProps from "./NotFoundProps.ts";

/**
 * NotFound - A customizable component for displaying a 'not found' or error page.
 *
 * This component renders a centered message with a title, a descriptive paragraph,
 * and a call-to-action button.
 *
 * @param {NotFoundProps} props - The props for the component.
 * @returns {JSX.Element} The rendered 'not found' page component.
 *
 * @example
 * <NotFound
 *   title="404 - Page Not Found"
 *   message="Sorry, the page you are looking for does not exist."
 *   cardButtonLabel="Go to Homepage"
 *   onButtonClick={() => navigate('/')}
 * />
 */
export default function NotFound(props: NotFoundProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
            <h1 className="text-6xl font-bold">{props.title}</h1>
            <p className="text-lg mt-4">{props.message}</p>
            <button className="btn btn-primary mt-6"
                    onClick={props.onButtonClick}>
                {props.cardButtonLabel}
            </button>
        </div>
    );
};