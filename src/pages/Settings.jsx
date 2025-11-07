import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Icon from '../components/Icon';
import './Settings.css';

const ProfileSettings = () => <div><h2>Perfil Público</h2><p>Atualize seus dados.</p></div>;
const AccountSettings = () => <div><h2>Conta</h2><p>Gerencie as configurações da sua conta.</p></div>;

const Settings = () => {
    return (
        <div className="settings-layout">
            <aside className="settings-sidebar">
                <nav>
                    <NavLink to="profile">
                        <Icon name="profile" />
                        <span>Perfil</span>
                    </NavLink>
                    <NavLink to="account">
                        <Icon name="account" />
                        <span>Conta</span>
                    </NavLink>
                </nav>
            </aside>
            <section className="settings-content">
                <Routes>
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="account" element={<AccountSettings />} />
                    <Route path="*" element={<Navigate to="profile" replace />} />
                </Routes>
            </section>
        </div>
    );
};

export default Settings;
