import {signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.util";
import FormInput from "../../component/form-input/form-input.component";
import {useState} from "react";
import Button, {BUTTON_TYPE_CLASSES} from "../../component/button/button.component";
import './sign-in.styles.scss';

const defaultInputs = {
        email: "",
        password: ""
    }
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultInputs);
    const {email, password} = formFields;

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await signInAuthUserWithEmailAndPassword(email, password);
            clearFields();
        }catch (err){
            switch (err.code){
                case "auth/wrong-password":
                    alert("user entered a wrong email or password");
                    break
                case "auth/user-not-found":
                    alert("user not found");
                    break
                default:
                    console.log("something went wrong, try again later", err);
            }
        }
    }

    const clearFields = () => {
        setFormFields(defaultInputs)
    }
    const handleOnChange = (event) => {
        const {name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-in-container">
            <h1>Already have an account?</h1>
            <span>Sign in with username and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email Address" type="text" onChange={handleOnChange} name="email"
                           value={email}/>
                <FormInput label="Password" type="password" onChange={handleOnChange} name="password"
                           value={password}/>
                <div className="buttons-container">
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">
                    Sign in
                </Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>
                    Sign Google
                </Button>
                </div>
            </form>

        </div>
    )
}

export default SignInForm;