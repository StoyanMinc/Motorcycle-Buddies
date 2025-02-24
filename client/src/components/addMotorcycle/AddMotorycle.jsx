import { useForm } from 'react-hook-form';
import { useCreateMotorcycle } from '../../hooks/useMotorcycle.js';

export default function AddMotorcycle() {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            model: '',
            year: '',
            buyYear: '',
            soldYear: '',
            imageUrl: '',
            description: ''
        }
    });

    const submitHandler = useCreateMotorcycle();
    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Motorcycle Details Form</h2>
                <form method="POST" onSubmit={handleSubmit((values) => submitHandler(values))}>
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" name="model" required {...register('model')}/>

                    <label htmlFor="year">Year:</label>
                    <input type="number" id="year" name="year" required {...register('year')}/>

                    <label htmlFor="buyYear">Year on Buying:</label>
                    <input type="number" id="buyYear" name="buyYear" required {...register('buyYear')}/>

                    <label htmlFor="soldYear">Year on Sold:</label>
                    <input type="number" id="soldYear" name="soldYear" {...register('soldYear')}/>

                    <label htmlFor="imageUrl">Image URL:</label>
                    <input type="url" id="imageUrl" name="imageUrl" required {...register('imageUrl')}/>

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required {...register('description')}></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}