import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Register };

function Register() {
    const dispatch = useDispatch();
    const authError = useSelector(x => x.auth.error);


    // form validasyon kuralları
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().required('email is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // UseForm hooku yardımıyla form oluşturmak için fonksiyonları oluşturduk.
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password, email }) {
        return dispatch(authActions.register({ username, password, email }));
    }



    return (
        <div className="col-md-6 offset-md-3 mt-5">

            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>


                        <button disabled={isSubmitting} className="btn btn-primary d-flex justify-content-around">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>

                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}