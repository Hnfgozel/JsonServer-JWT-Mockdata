import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import Dropdown from "./Dropdown";
import { userActions } from '_store';


export { Library };

function Library() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [bookCategory, setBookCategory] = useState("");
    const [bookSubCategory, setBookSubCategory] = useState("")

    // ==========  API DATA ==========
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/auth/login/books`);
            const newData = await response.json();
            setData(newData);
        };
        fetchData();
    }, [])

    // ========== FİLFRELENMİŞ API DATA ==========
    useEffect(() => {

        // dropdown listelerinde durum değişirse filtrelemeyi burada gerçekleştiriyoruz

        if (bookCategory || bookSubCategory) {
            const found = data.filter(
                (item) =>
                    item.category === bookCategory && item.subcategory === bookSubCategory
            );
            setFilteredData(found);
        } else {
            setFilteredData(data);
        }
    }, [data, bookCategory, bookSubCategory]);


    // ========== Modal Yönetimi. ==========
    //Seçilen değer filtre sonrası index 0 olur. tıklayınca modal açması için var.
    const [selectedItem, setSelectedItem] = useState();

    const [openModal, setModalOpen] = useState(false);


    const handleSelect = (selectedItem) => {
        setSelectedItem(selectedItem);
        setModalOpen(true);
    };


    const handleOnCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(undefined);
    };


    //Modal için stil ayarları.
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };




    return (
        <div>

            <div>
                <div className="container-fluid">
                    <div className="top-section p-4 m-4">
                        <h1 className="top-title">Filter:</h1>
                        {/* Durum bilgilerini özellik olarak Child Componente aktardık */}
                        <Dropdown
                            data={data}
                            setSelectedCategory={setBookCategory}
                            setSelectedSubCategory={setBookSubCategory}
                        />

                        {/* Filtrelenen veriyi işliyor. Renderlama aşaması */}
                        <ol>
                            {
                                filteredData.map((item, index) =>
                                    index === 0 ? (
                                        <li key={index} onClick={() => handleSelect(item)}>
                                            <div className="row p-1 m-1">
                                                <div className="col-sm-12">
                                                    <div className="card">
                                                        <div className="card-body " >

                                                            <h5 className="card-title">{item?.name}</h5>
                                                            <p className="card-text">{item?.category}</p>
                                                            <p className="card-text">{item?.subcategory}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ) : (
                                        <li key={index}>
                                            <div className="row p-1 m-1">
                                                <div className="col-sm-12">
                                                    <div className="card">
                                                        <div className="card-body">

                                                            <h5 className="card-title">{item?.name}</h5>
                                                            <p className="card-text">{item?.category}</p>
                                                            <p className="card-text">{item?.subcategory}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </ol>

                        <Modal style={customStyles} isOpen={openModal} onClose={handleOnCloseModal} ariaHideApp={false}>

                            <div>Name : {selectedItem?.name}</div>
                            <div>Category : {selectedItem?.category}</div>
                            <div>Subcategory : {selectedItem?.subcategory}</div>
                            <div>Description : {selectedItem?.description}</div>

                            <button onClick={handleOnCloseModal} className="btn btn-primary">
                                Close
                            </button>

                        </Modal>

                    </div>
                </div>
            </div>

        </div>


    );
}