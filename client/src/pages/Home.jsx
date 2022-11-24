import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { userActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();

    //Uygulama çalıştıktan sonra ilk burası görünür.


    useEffect(() => {
        dispatch(userActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="text-center">
            <h1 className='m-3'>Hello! </h1>
            <h2 className='m-5' >It seem's like you are not Logged in</h2>
            <h3 className='m-5'>
                If you have an account, then please <Link to="/login">Login</Link>
            </h3>
            <h3 className='m-5'>
                Don't have an account, then please do{" "}
                <Link to="/register">Register</Link>
            </h3>
        </div>
    );
}