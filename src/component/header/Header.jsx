import { useCallback, useContext, useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";

const Header = () => {

  const { user } = useContext(UserContext);
  console.log(user);
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

    fetch("http://localhost:5000/admin/infoboard", requestOptions)
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

  // console.log(data);
  return (
    <div className="header-main">
      <div className="box-header">
        <div className="box-header-item">
          <p className="title-item">Users</p>
          <p className="count-item">{data && data.countUser}</p>
          <p className="icon-user">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#ee6868" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
          </p>
        </div>
        <div className="box-header-item">
          <p className="title-item">Orders</p>
          <p className="count-item">{data && data.order}</p>
          <p className="icon-order">
            <svg height="25" width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </p>
        </div>
        <div className="box-header-item">
          <p className="title-item">Earnings</p>
          <p className="count-item">{data && formatPrice(data.earnings)} VND</p>
          <p className="icon-earning">
            <svg height="30" width="30" viewBox="-2.16 -2.16 28.32 28.32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d24b4b"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#1f7500" stroke-width="1.9919999999999998"></circle> <path d="M12 17V17.5V18" stroke="#1f7500" stroke-width="1.9919999999999998" stroke-linecap="round"></path> <path d="M12 6V6.5V7" stroke="#1f7500" stroke-width="1.9919999999999998" stroke-linecap="round"></path> <path d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" stroke="#1f7500" stroke-width="1.9919999999999998" stroke-linecap="round"></path> </g></svg>
          </p>
        </div>
        <div className="box-header-item">
          <p className="title-item">Balance</p>
          <p className="count-item">{data && formatPrice(data.balance)} VND</p>
          <p className="icon-balance">
            <svg height="28" width="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 8V6C19 4.89543 18.1046 4 17 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V16" stroke="#73099a" stroke-width="1.584" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="13" y="8" width="8" height="8" rx="1" stroke="#73099a" stroke-width="1.584" stroke-linecap="round" stroke-linejoin="round"></rect> <circle cx="17" cy="12" r="1.5" fill="#73099a"></circle> </g></svg>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
