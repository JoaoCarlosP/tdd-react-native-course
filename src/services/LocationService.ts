import * as Location from "expo-location";
import GetLocation from "react-native-get-location";

class LocationService {
  static async getCurrentPosition() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location?.coords || {}

      if (latitude === null || longitude === null) throw new Error('Erro ao obter posição')
      return { latitude, longitude }
    } catch (error) {
      throw new Error("Erro ao obter a posição.");
    }
  }
}

export default LocationService;
