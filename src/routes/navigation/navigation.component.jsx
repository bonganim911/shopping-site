import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwLogo} from "../../assets/crown.svg";
import './navigation.styles.scss';
import {userSignOut} from "../../utils/firebase/firebase.util";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../context/cart-context";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/user/user.selector";

const Navigation = () => {
    const currentUser = useSelector(userSelector);
    console.log(currentUser);
    const {cartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                                <span className="nav-link" onClick={userSignOut}>SIGN OUT</span>
                            ) :
                            (
                                <Link className="nav-link" to='/sign-in'>
                                    SIGN IN
                                </Link>
                            )
                    }
                    <CartIcon/>
                </div>
                {cartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}
export default Navigation;