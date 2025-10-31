import {Button} from "../../../ui/Button/Button.tsx";
import {Input} from "../../../ui/Input/Input.tsx";
import type LoginFormProps from "./LoginFormProps.ts";

export function LoginForm(props: LoginFormProps) {
    return (
        <>
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
        </>
    );
}