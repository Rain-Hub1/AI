import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SettingsLayout from './layouts/SettingsLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProfileSettings, AccountSettings } from './pages/Settings';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="account" element={<AccountSettings />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
