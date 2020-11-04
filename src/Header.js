import React from "react";
import { NavLink } from "react-router-dom";
import GoogleAuth from "./components/GoogleAuth";
import { useDispatch } from "react-redux";
import { initializeData, initializeForm, initializePage } from "./actions";
import history from "./history";

const Header = () => {
    const dispatch = useDispatch();

    const onClick = (newPathname) => {
        const prevPathname = history.location.pathname;
        if (prevPathname !== newPathname) {
            dispatch(initializeData());
            dispatch(initializeForm());
            dispatch(initializePage());
        }
    };

    return (
        <div className="ui container">
            <div
                className="haeder-logo"
                style={{ height: "150px", paddingTop: "40px" }}
            >
                <NavLink to="/" exact onClick={() => onClick()}>
                    <img
                        className="ui centered small image"
                        src="https://www.coronaout.kr/images/verbal.png"
                        alt="로고"
                    ></img>
                </NavLink>
            </div>
            <div
                className="ui large secondary pointing menu"
                style={{ fontSize: "1.2rem" }}
            >
                <NavLink
                    to="/"
                    exact
                    activeClassName="active"
                    className="item"
                    onClick={() => onClick("/")}
                >
                    상품 관리
                </NavLink>
                <NavLink
                    to="/order"
                    activeClassName="active"
                    className="item"
                    onClick={() => onClick("/order")}
                >
                    구매 관리
                </NavLink>
                {/* <NavLink to="/buyer" activeClassName="active" className="item" onClick={() => onClick()}>추천 관리</NavLink> */}

                <div className="right menu">
                    <div className="item">
                        <GoogleAuth />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
