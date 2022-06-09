import { Link } from 'react-router-dom'

const Menu = () => {
  
    const styles = {
        menu: {
            display: 'flex'
        },
        link: {
            textDecoration: 'none',
            color: 'black',
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'
        }
    }

    return (
        <div style={styles.menu}>
            <Link style={styles.link} to="/">Anecdotes</Link>
            <Link style={styles.link} to="/create">Create New</Link>
            <Link style={styles.link} to="/about">About</Link>
        </div>
    )
}

export default Menu
  