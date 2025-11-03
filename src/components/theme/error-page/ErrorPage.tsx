import type {ErrorPageProps} from "./ErrorPageProps.ts";
import {Button} from "../../ui/Button/Button.tsx";


/**
 * A full-screen component to display an error message.
 *
 * @remarks
 * This component is designed to be used as a fallback UI or for specific error states,
 * providing the user with clear information about the error and a call to action.
 *
 * @param props - The props for the ErrorPage component.
 * @returns The rendered ErrorPage component.
 *
 * @example
 * ```tsx
 * <ErrorPage
 *   errorMessage="Oops! Something went wrong."
 *   errorDesc="We couldn't find the page you were looking for."
 *   errorButtonLabel="Go back to Home"
 *   onButtonClick={() => window.history.back()}
 * />
 * ```
 */
export function ErrorPage(props: ErrorPageProps) {
    return (
        <div
            className="flex flex-col h-screen items-center justify-center gap-4 bg-blue-50 text-center text-black">
            <img
                src="/man-doing-surprise-gesture-white-background%20(1).jpg"
                alt="A man with a surprised expression"
                className="h-64 w-64 rounded-full object-cover shadow-lg"
            />

            <div className="flex flex-col gap-2">
                <p className="text-3xl font-bold">{props.errorMessage}</p>
                <p className="text-lg text-gray-600">{props.errorDesc}</p>
            </div>

            <Button label={props.buttonLabel} variant="primary" onClick={props.onButtonClick}/>
        </div>
    );
}