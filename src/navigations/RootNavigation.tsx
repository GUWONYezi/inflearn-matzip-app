import useAuth from '@/hook/queries/useAuth';
import AuthNavigation from './AuthNavigations';
import DrawerNavigation from './DrawerNavigation';

function RootNavigation() {
  const {isLogin} = useAuth();

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
}

export default RootNavigation;
