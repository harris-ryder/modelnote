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
