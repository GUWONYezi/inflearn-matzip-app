import {createStackNavigator} from '@react-navigation/stack';
import MapHomeScreen from '../screens/map/MapHomeScreen';
import AddLocationsScreen from '../screens/map/AddLocationsScreen';
import SearchLoactionScreen from '../screens/map/SearchLoactionScreen';
import {colors} from '../constants/colors';

export const MapStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
  },
  screens: {
    MapHome: {
      screen: MapHomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddLocation: {
      screen: AddLocationsScreen,
    },
    SearchLoaction: {
      screen: SearchLoactionScreen,
    },
  },
});
