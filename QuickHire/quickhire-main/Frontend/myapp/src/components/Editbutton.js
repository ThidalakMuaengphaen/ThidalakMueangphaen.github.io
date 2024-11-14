import React, { useState } from "react";
import Modal from "react-modal";
import axios from 'axios'

Modal.setAppElement("#root");

function AddButton(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}${props.add}`, { name, quantity })
        .then(res => {
           console.log(res.status)
        })
        closeModal();
    }

    return (
        <div>
            <button
                onClick={openModal}
                type="button"
                className="ml-4 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Add +
            </button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} closeButtonClassName="bg-transparent">
                <button onClick={closeModal} className="absolute top-0 right-0 m-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col p-6">
                    <label htmlFor="name" className="text-lg font-semibold">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded py-2 px-3 mt-1 mb-4"
                    />
                    <label htmlFor="quantity" className="text-lg font-semibold">
                        Quantity:
                    </label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border rounded py-2 px-3 mt-1 mb-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
                        Submit
                    </button>
                </form>
            </Modal>

        </div>
    );
}

export default AddButton;
