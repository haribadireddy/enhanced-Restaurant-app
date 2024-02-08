import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../Context/CartContext'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const {restaurantName} = props
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <div className="header-container">
            <div className="nav-container">
              <Link to="/">
                <h1 className="main-heading">{restaurantName}</h1>
              </Link>
              <div className="order-container">
                <p className="para">My Orders</p>
                <Link to="/cart">
                  <button data-testid="cart">
                    <HiOutlineShoppingCart className="icon" />
                  </button>
                </Link>
                <p className="cart-count">{cartList.length}</p>
                <button className="logout-button" onClick={onClickLogout}>
                  Logout
                </button>
              </div>
            </div>
            <hr className="line" />
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
