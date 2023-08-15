import React, { Component } from 'react'
import Login from '../../auth/login';
import { withRouter } from 'react-router-dom';
// import Cartsidebar from '../web/views/cart-sidebar';
import { GetUserLogin } from '../../components/services';
import CartSidebar from '../web/views/cart-sidebar';
// import Login from '../web/views/checkout/login';
import "./index.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '', userName: '', searchtxt: ''
        };
    }
  
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    async componentDidMount() {
        let cookies = await GetUserLogin.isAuthenticate();
        this.setState({ token: cookies })
        let email = sessionStorage.getItem('email')
        if (email) {
            let user = await GetUserLogin.getCustomerDetail(email);
            if (user) {
                this.setState({ userName: user.data.firstName })
            }
        }
    }
    handleLogout = (event) => {
        event.preventDefault();
        GetUserLogin.logout();
    }
    handleClickSearch = event => {
        let { searchtxt } = this.state;
        this.props.history.push(`/product/catalogsearch/result/${searchtxt}`);
    }
    render() {
        let { token, userName, searchtxt } = this.state;
        return (
            <div>
                <header className="header clearfix">
                    <div className="navbar-top bg-success pt-2 pb-2">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <a href="/" className="mb-0 text-white">
                                        20% cashback for new users | Code: <strong><span className="text-light">OGOFERS13 <span className="mdi mdi-tag-faces" /></span> </strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-light navbar-expand-lg bg-dark bg-faded osahan-menu">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/"> <img src="img/grocLogo.png" alt="logo" style={{width:"50px"}}/> </a>
                            <button className="navbar-toggler navbar-toggler-white" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>

                            <div className="collapse navbar-collapse" id='navbarText'>
                            <a data-target="#bd-example-modal" data-toggle="modal" className="text-white" style={token ? { display: 'none' } : { display: 'block' }}><i className="mdi mdi-account-circle" /> Login/Sign Up</a>

                                <ul className="navbar-nav btn btn-link d-lg-none " style={token ? { display: 'block' } : { display: 'none' }}>
                                    <li className="nav-item active" >
                                        <Link className="nav-link text-white fs-1 fw-bold" to="/account/view"  >Dashboard</Link>
                                    </li>
                                    <li className="nav-item active" >
                                        <Link className="nav-link text-white fs-1 fw-bold" to="/account/profile"  >My Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white fs-1 fw-bold" to="/account/wishlist">Wish List</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white fs-1 fw-bold" to="/account/order/list">Orders List</Link>
                                    </li>
                                    <li className="nav-item  d-inline">
                                        <span className="nav-link text-white fw-bolder bg-danger d-inline p-2 px-3 border-4 fs-1" onClick={this.handleLogout}>Logout</span>
                                    </li>
                                </ul>

                            </div>

                            <div className="navbar-collapse" id="navbarNavDropdown">
                                <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                                    <div className="top-categories-search" onSubmit={this.handleClickSearch}>
                                        <div className="input-group">
                                            <input className="form-control" placeholder="Search products in Your City" aria-label="Search products in Your City" type="text" name="searchtxt" value={searchtxt} onChange={(e) => this.handleChange(e)} />
                                            <span className="input-group-btn">
                                                <button className="btn btn-secondary" type="submit" onClick={this.handleClickSearch}><i className="mdi mdi-file-find" /> Search</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 my-lg-0">
                                    <ul className="list-inline main-nav-right" >
                                        <li className="list-inline-item">
                                            <a data-target="#bd-example-modal" data-toggle="modal" className="btn btn-link" style={token ? { display: 'none' } : { display: 'block' }}><i className="mdi mdi-account-circle" /> Login/Sign Up</a>
                                            <div className="dropdown" style={token ? { display: 'block' } : { display: 'none' }}>
                                                <button className="btn btn-account dropdown-toggle d-sm-none d-lg-block" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {userName}
                                                </button>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" href="/account/view"><i className="uil uil-apps" />Dashboard</a>
                                                    <a className="dropdown-item" href="/account/profile"><i className="mdi mdi-account-outline" aria-hidden="true"></i>My Profile</a>
                                                    <a className="dropdown-item" href="/account/wishlist"><i className="mdi mdi-heart-outline" aria-hidden="true"></i>Wish List</a>
                                                    <a className="dropdown-item" href="/account/order/list"><i className="mdi mdi-format-list-bulleted" aria-hidden="true"></i> Orders List</a>
                                                    <div className="dropdown-divider"></div>
                                                    <span className="dropdown-item" onClick={this.handleLogout}><i className="mdi mdi-lock" aria-hidden="true"></i> Logout</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-inline-item cart-btn">
                                            <CartSidebar />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            //    <Login/>
            </div>
        )
    }
}
export default withRouter(Navigation)
