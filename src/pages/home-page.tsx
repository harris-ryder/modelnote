import { useEffect } from 'react';
import DemoPanel from '../components/demo/DemoPanel';
import { useApiStore } from '../store/api-store';
import Navbar from '../components/ui/nav-bar';

function HomePage() {
  const user = useApiStore((s) => s.user);
  const fetchUser = useApiStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser(); // Fetch user information on component mount
    console.log("on mount", user)
  }, [fetchUser]);

  return (
    <>
      <DemoPanel />

      <Navbar
        route="Home"
        buttons={[
          user ? 'dashboard' : 'login'
        ]}
        isLoggedIn={!!user}
      />


    </>
  );
}

export default HomePage;

