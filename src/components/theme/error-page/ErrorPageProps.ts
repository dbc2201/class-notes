/**
 Props for the ErrorPage component.
 */
export interface ErrorPageProps {

    /** The main error message to display */
    errorMessage: string;
    /** A detailed description of the error */
    errorDesc: string;
    /** The label for the action button */
    errorButtonLabel: string;
    /** function to be executed on click */
    onButtonClick: () => void;
}
