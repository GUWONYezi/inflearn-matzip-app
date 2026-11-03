declare module 'react-native-config' {
  export interface NativeConfig {
    GOOGLE_MAP_API_KEY?: string;
    GOOGLE_MAP_ID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
