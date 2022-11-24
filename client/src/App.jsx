import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav } from '_components';

import { Home, Login, Library, Register} from 'pages';
export { App };


// App bileşeni, uygulamanın kök bileşenidir ve 
// uygulama için dış html'yi ana gezinmeyi ve yolları içerir

function App() {
    // gezinmeye izin vermek için init özel geçmiş nesnesi
    // React uygulamasının herhangi bir yerinde (bileşenlerin içinde veya dışında)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Routes>
                <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}