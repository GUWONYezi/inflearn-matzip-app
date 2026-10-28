import AuthNavigation from './AuthNavigations';
import DrawerNavigation from './DrawerNavigation';

function RootNavigation() {
  const isLogin = true;

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
