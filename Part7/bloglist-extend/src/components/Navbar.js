/** @format */

import { Link } from 'react-router-dom'

const Nav = ({ user, logoff }) => {
    return (
        <nav className="nav">
            <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/">blogs</Link>
                <Link to="/users">users</Link>

                {user && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {user.username} logged in{' '}
                        <button onClick={logoff} className="text-sm">
                            Logout
                        </button>{' '}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav
