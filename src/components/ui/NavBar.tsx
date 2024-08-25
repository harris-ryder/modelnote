import { FC } from 'react';
import Button from './Button';
import { useApiStore } from '../../store/api-store';
import { useNavigate } from 'react-router-dom';
import { NavbarProps, SmartButton } from '../../types/nav';

const Navbar: FC<NavbarProps> = ({ route, buttons, isLoggedIn }) => {
  const navigate = useNavigate();
  const { logout, userPicUrl, loginWithGoogle } = useApiStore(state => ({
    logout: state.logout,
    userPicUrl: state.userPicUrl,
    loginWithGoogle: state.loginWithGoogle
  }));

  const handleAction = (label: SmartButton) => {
    switch (label) {
      case 'login':
        loginWithGoogle();  // Ensure this function is called
        break;
      case 'logout':
        logout().then(() => navigate('/')).catch(error => console.error('Failed to log out:', error));
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      default:
        console.log('Unknown action');
    }
  };

  const renderButton = (button: SmartButton, index: number) => {
    if (typeof button === 'string') {
      if (button === 'login') {
        return (
          <Button key={index} onClick={() => handleAction(button)} >
            Sign in with Google

            <div className="gsi-material-button-icon ml-2 w-4 h-4">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ display: 'block' }}
              >
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>

          </Button>
        );
      } else {
        // Handle other string-based buttons normally
        return <Button key={index} onClick={() => handleAction(button)}>{button}</Button>;
      }
    } else {
      // Handle ButtonAction types
      return <Button key={index} onClick={() => button.function()}>{button.name}</Button>;
    }
  };


  return (
    <nav className='fixed left-2 right-2 top-2 rounded-md border border-sky-200 bg-sky-100 h-20 p-4 flex items-center justify-between shadow-level2 z-10' >
      <div className='flex gap-2 items-center justify-center'>
        <img src="/logo.svg" alt="Logo" style={{ width: '40px', marginRight: '8px' }} />
        <h1 className='text-xl font-poppins font-semibold'> ModelNote</h1>
        {route && (
          <p className="border-l-2 border-gray-800 pl-2">{route}</p>
        )}
      </div>

      <div className='flex items-center gap-4'>


        {buttons.map((button, index) => renderButton(button, index))}

        {isLoggedIn && <img src={userPicUrl ? userPicUrl : './placeholder.svg'} className='rounded-full h-10 w-10 border-2 p-1 border-sky-300' alt="My SVG" />}


      </div>




    </nav >
  );
};

export default Navbar;


