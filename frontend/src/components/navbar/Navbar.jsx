import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className='logo'>Superbooking</span>
                </Link>
                <div className='navItems'>
                    <button className='navButton'>Sign up</button>
                    <button className='navButton'>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;