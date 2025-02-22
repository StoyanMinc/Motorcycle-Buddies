import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useAuth';

export default function Login() {

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const { loginHandler, error } = useLogin();

    if (error) {
        setValue('password', '')
    }

    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Login</h2>
                <form method="POST" onSubmit={handleSubmit((values) => loginHandler(values))}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" {...register('username')} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" {...register('password')} />
                    {error && <p className='error'>{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}