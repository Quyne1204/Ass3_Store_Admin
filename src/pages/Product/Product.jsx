
import { NavLink } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import "./product.css";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { useState } from "react";
import { useCallback } from "react";

const Product = () => {

    const { user } = useContext(UserContext);
    const [data, setData] = useState();
    const [success, setSuccess] = useState();
    const [showMessage, setShowMessage] = useState(false);

    const handelData = useCallback(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", user.info._id);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://ass3-store-server.onrender.com/admin/products", requestOptions)
            .then((response) => response.json())
            .then((result) => setData(result))
            .catch((error) => console.error(error));
    }, [user])

    const handelDel = useCallback((id) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", user.info._id);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://ass3-store-server.onrender.com/admin/hotel/delete", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setSuccess(result);
                handelData();
            })
            .catch((error) => console.error(error));
    }, [user])

    useEffect(() => {
        if (user.isRole === 'admin') {
            handelData();
        }
    }, [user, handelData]);

    //thong bao 
    useEffect(() => {
        if (success && success.message) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    }, [success]);

    function formatPrice(number) {
        // Chuyển đổi số thành chuỗi
        const numberString = number.toString();

        // Tạo một danh sách các đơn vị số từ chuỗi số
        const units = [];
        let tempStr = numberString;
        while (tempStr.length > 3) {
            units.unshift(tempStr.slice(-3));
            tempStr = tempStr.slice(0, -3);
        }
        units.unshift(tempStr);

        // Thêm dấu chấm ngăn cách giữa các đơn vị
        const formattedPrice = units.join(".");

        return formattedPrice;
    }

    return (
        <div className="layout">
            <Navbar />
            <div className="home-container">
                <div className="home-hotels">
                    <div className="head">
                        <p>Products List</p>
                        {showMessage && success.message && <h3>{success.message}</h3>}
                        <NavLink to="#" className="navlink">Add New</NavLink>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th><span>ID</span></th>
                                <th><span>Name</span></th>
                                <th><span>Price</span></th>
                                <th><span>Image</span></th>
                                <th><span>Category</span></th>
                                <th><span>Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item) =>
                                <tr key={item._id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td><span>{item._id}</span></td>
                                    <td><span>{item.name}</span></td>
                                    <td><span>{formatPrice(item.price)} VND</span></td>
                                    <td>
                                        <span>
                                            <img width={50} src={item.img1} alt="" />
                                        </span>
                                    </td>
                                    <td><span>{item.category}</span></td>
                                    <td>
                                        <span><button className="btn-delete" onClick={() => handelDel(item._id)}>Delete</button></span>
                                    </td>
                                </tr>
                            )}
                            {!data && <tr><td>There is no data</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Product;
