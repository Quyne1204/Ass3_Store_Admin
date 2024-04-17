import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import "./home.css";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { useCallback } from "react";
import { useState } from "react";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const handelData = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.info._id);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://ass3-store-server.onrender.com/admin/", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, [user])

  useEffect(() => {
    if (!user.auth) {
      navigate('/login');
    }
    if (user.isRole === 'admin') {
      handelData();
    }
  }, [user]);

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
        <Header />
        <div className="home-main">
          <p>Latest Transactions</p>
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th><span>ID User</span></th>
                <th><span>Name</span></th>
                <th><span>Phone</span></th>
                <th><span>Address</span></th>
                <th><span>Total</span></th>
                <th><span>Delivery</span></th>
                <th><span>Status</span></th>
                <th><span>Detail</span></th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) =>
                <tr key={item._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td><span>{item.user._id}</span></td>
                  <td><span>{item.user.fullName}</span></td>
                  <td><span>{item.user.phone}</span></td>
                  <td><span>{item.user.address}</span></td>
                  <td><span>{formatPrice(item.total_price)} VND</span></td>
                  <td><span>Waiting for progressing</span></td>
                  <td><span>{item.status}</span></td>
                  <td>
                    <NavLink to={`/order/history/detail/${item._id}`}>
                      <span><button className="btn-ad">View</button></span>
                    </NavLink>
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

export default Home;
