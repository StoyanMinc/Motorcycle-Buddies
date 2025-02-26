import { useForm } from "react-hook-form"
import { useEditMotorcycle, useGetOneMotorcycle } from "../../hooks/useMotorcycle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditMotorcycle() {

    const {motorcycleId} = useParams();

    const motorcycle = useGetOneMotorcycle(motorcycleId);

    console.log(motorcycle);
    const {register, handleSubmit, setValue } = useForm({
        defaultValues: {
            model: '',
            year: '',
            buyYear: '',
            soldYear: '',
            image: '',
            description: '',
            imageType: '',
        }
    });

    useEffect(() => {
        if (motorcycle) {
            setValue('model', motorcycle.model || '');
            setValue('year', motorcycle.year || '');
            setValue('buyYear', motorcycle.buyYear || '');
            setValue('soldYear', motorcycle.soldYear || '');
            setValue('description', motorcycle.description || '');
            setValue('imageType', motorcycle.imageType || '');
        }
    }, [motorcycle, setValue]);
    
    const handleImageChange = (e) => {
        const image = e.target.files[0];
        let image_split = image.name.split(".");
        let image_type = image_split[image_split.length - 1];
        setValue('imageType', image_type);
        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image); // Convert file to Base64
            reader.onload = () => {
                const base64File = reader.result.split(",")[1];
                setValue('image', base64File);
            };
        }
    };

    const submitHandler = useEditMotorcycle();
    
    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Edit Your Motorcycle</h2>
                <form method="POST" onSubmit={handleSubmit((values) => submitHandler(motorcycleId, values))}>
                    <div>

                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" name="model" required {...register('model')} autoComplete="off" />
                    </div>
                    <div>

                        <label htmlFor="year">Year:</label>
                        <input type="number" id="year" name="year" required {...register('year')} />
                    </div>

                    <div>
                        <label htmlFor="buyYear">Year on Buying:</label>
                        <input type="number" id="buyYear" name="buyYear" required {...register('buyYear')} />
                    </div>

                    <div>
                        <label htmlFor="soldYear">Year on Sold:</label>
                        <input type="number" id="soldYear" name="soldYear" {...register('soldYear')} autoComplete="off" />
                    </div>

                    <div className="image-container">
                        <input className="image-input" type="file" name='image' id='image' onChange={handleImageChange} />
                        <label htmlFor="image" className='image-label'>Избери снимка</label>
                    </div>

                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" required {...register('description')}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}