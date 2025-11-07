import { NavLink, Outlet } from 'react-router-dom';
import Icon from '../components/Icon';
import './SettingsLayout.css';

const SettingsLayout = () => {
    return (
        <div className="settings-layout">
            <aside className="settings-sidebar">
                <nav>
                    <NavLink to="/settings/profile">
                        <Icon name="profile" />
                        <span>Perfil</span>
                    </NavLink>
                    <NavLink to="/settings/account">
                        <Icon name="account" />
                        <span>Conta</span>
                    </NavLink>
                </nav>
            </aside>
            <section className="settings-content">
                <Outlet />
            </section>
        </div>
    );
};

export default SettingsLayout;
