import { FC } from 'react';
import Button from './standard-button';
import { useApiStore } from '../../store/api-store';
import { useNavigate } from 'react-router-dom';

export type ButtonAction = {
  name: string;
  function: (...args: any[]) => any;
};

export type SmartButton = 'login' | 'logout' | 'dashboard' | 'profile' | ButtonAction;

export interface NavbarProps {
  route: string;
  buttons: SmartButton[];
  isLoggedIn: boolean;
}

const Navbar: FC<NavbarProps> = ({ route, buttons, isLoggedIn }) => {

  const navigate = useNavigate();
  const { logout, userPicUrl, loginWithGoogle } = useApiStore(state => ({
    logout: state.logout,
    userPicUrl: state.userPicUrl,
    loginWithGoogle: state.loginWithGoogle
  }));

  async function handleLogout() {
    logout().then(() => navigate('/')).catch(error => console.error('Failed to log out:', error))
  }

  // JSX Button Map
  const buttonMap: Record<string, JSX.Element> = {
    login: <Button onClick={loginWithGoogle} icon='Google'>Login </Button>,
    logout: <Button onClick={handleLogout}>Logout </Button>,
    dashboard: <Button onClick={() => navigate('/dashboard')} >Dashboard </Button>,
    profile: <Button >Profile </Button>,
  };

  // Function to handle custom ButtonAction types if they are objects not strings
  const renderCustomButton = (button: ButtonAction) => (
    <Button key={button.name} onClick={button.function}>
      {button.name}
    </Button>
  );

  return (
    <nav className='fixed left-2 right-2 top-2 rounded-md border border-sky-200 bg-sky-100 h-20 p-4 flex items-center justify-between shadow-level2 z-20'>
      <div className='flex gap-2 items-center justify-center'>
        <img onClick={() => navigate('/')} src="/logo.svg" alt="Logo" style={{ width: '40px', marginRight: '8px' }} />
        <h1 className='text-xl font-poppins font-semibold'>ModelNote</h1>
        {route && (
          <p className="border-l-2 border-gray-800 pl-2">{route}</p>
        )}
      </div>

      <div className='flex items-center gap-4'>
        {buttons.map((button) => (
          typeof button === 'string' ? buttonMap[button] : renderCustomButton(button)
        ))}
        {isLoggedIn && <img src={userPicUrl ? userPicUrl : './placeholder.svg'} className='rounded-full h-10 w-10 border-2 p-1 border-sky-300' alt="My SVG" />}
      </div>
    </nav>
  );
};

export default Navbar;


