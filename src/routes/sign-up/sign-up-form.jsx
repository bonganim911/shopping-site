import {useState} from "react";
import {createAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.util";
import FormInput from "../../component/form-input/form-input.component";
import "./sign-up.styles.scss";
import Button from "../../component/button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const clearFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password and confirm password are not the same");
            return;
        }

        try {
            await createAuthUserWithEmailAndPassword(email, password);
            clearFields();
        } catch (err) {
            console.log("user creation has encountered and error", err.message);
        }
    }
    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span> Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" onChange={handleOnChange} name="displayName"
                           value={displayName}/>
                <FormInput label="Email" type="email" onChange={handleOnChange} name="email" value={email}/>
                <FormInput label="Password" type="password" onChange={handleOnChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password" onChange={handleOnChange} name="confirmPassword"
                           value={confirmPassword}/>
                <Button buttonType="inverted" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm;