import LocationService from '../LocationService';
import * as Location from 'expo-location';

jest.mock('expo-location');

describe('LocationService', () => {
  test('Should return latitude & longitude from current location with permission', async () => {
    const mockPermission = (Location.requestForegroundPermissionsAsync as jest.Mock)
    const mockPosition = (Location.getCurrentPositionAsync as jest.Mock)

    mockPermission.mockReturnValueOnce({ status: 'granted' })
    mockPosition.mockReturnValueOnce({coords: { latitude: 0, longitude: 0 }})

    const position = await LocationService.getCurrentPosition();

    expect(position).toEqual({
      latitude: 0,
      longitude: 0
    });
  });
});
