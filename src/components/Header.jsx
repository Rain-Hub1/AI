import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <div className="logo">
                <Icon name="logo" size={28} />
                <span>Manus IA</span>
            </div>
            <nav className="main-nav">
                <NavLink to="/">
                    <Icon name="home" />
                    <span>Início</span>
                </NavLink>
                <NavLink to="/register">
                    <Icon name="userPlus" />
                    <span>Cadastre-se</span>
                </NavLink>
                <NavLink to="/login">
                    <Icon name="login" />
                    <span>Login</span>
                </NavLink>
                <NavLink to="/settings/profile">
                    <Icon name="settings" />
                    <span>Configurações</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
