import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (moveLocation: LatLng | null) => void;
}

// 좌표 전달을 위한 store
const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  setMoveLocation: (moveLocation: LatLng | null) => {
    set(state => ({...state, moveLocation}));
  },
}));

export default useLocationStore;
