import {Button} from "../../../ui/Button/Button.tsx";
import {Input} from "../../../ui/Input/Input.tsx";
import type LoginFormProps from "./LoginFormProps.ts";

/**
 * LoginForm - A component that renders a user login form.
 *
 * This component displays a card containing email and password input fields,
 * a submit button, and an area to show potential login errors. It is designed
 * as a controlled component, meaning its state (input values, submission handling)
 * should be managed by a parent component.
 *
 * @param {LoginFormProps} props - The props for the LoginForm component.
 * @returns {JSX.Element} The rendered login form.
 *
 * @example
 * <LoginForm
 *   cardTitle="Login"
 *   cardButtonLabel="Sign In"
 *   emailValue=""
 *   passwordValue=""
 *   onEmailChange={(e) => setEmail(e.target.value)}
 *   onPasswordChange={(e) => setPassword(e.target.value)}
 *   onSubmit={(e) => handleLogin(e)}
 *   error="Invalid username or password."
 *   isLoading={false}
 * />
 */
export function LoginForm(props: Readonly<LoginFormProps>) {
    return (

        <div className="card card-bordered bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{props.cardTitle}</h2>
                <div>
                    <Input label={"email"}
                           type={"email"}
                           value={""}
                           onChange={() => {
                           }}
                           placeholder={""}
                           error={""}
                           disabled={false}
                           required={false}>
                    </Input>
                    <Input label={"password"}
                           type={"password"}
                           value={""}
                           onChange={() => {
                           }}
                           placeholder={""}
                           error={""}
                           disabled={false}
                           required={false}>
                    </Input>
                </div>
                <div className="card-actions justify-end">
                    <Button label={props.cardButtonLabel} variant="primary" type="submit"></Button>
                </div>
                <div>{props.error && <span className="text-error text-sm mt-1">{props.error}</span>}</div>
            </div>
        </div>

    );
}