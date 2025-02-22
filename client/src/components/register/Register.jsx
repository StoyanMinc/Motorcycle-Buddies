import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";

export default function Register() {

    const { register, handleSubmit, setValue} = useForm({
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: ''
        }
    });

    const { registerHandler, error } = useRegister();

    if(error) {

        setValue('password', '');
        setValue('confirmPassword', '');
    }
    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Register</h2>
                <form method="POST" onSubmit={handleSubmit((values) => registerHandler(values))}>

                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" {...register('username')} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" {...register('password')} />

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" {...register('confirmPassword')} />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}