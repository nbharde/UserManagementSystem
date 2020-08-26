import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('Service: ApiService', () => {
  let service: ApiService;
  let authServiceMock: any;

  beforeEach(() => {
    service = new ApiService(http as any, authServiceMock);
  });

  describe('Test: getUsers', () => {
    it('should get the users list', () => {
      const spyLoadToken = jest.spyOn(authServiceMock, 'loadToken').mockReturnValue('string');
      const mockResponse = [
        {
          "id": 1,
          "name": "Admin",
          "username": "admin01",
          "email": "admin@email.com",
          "password": "admin",
          "city": "Dubai",
          "country": "UAE",
          "role": "admin"
        }
      ];
      const httpMock = {
        post: jest.fn().mockReturnValue(of(mockResponse))
      }
      const serviceMock = new ApiService(httpMock as any, authServiceMock)
      serviceMock.getUsers().subscribe((res) => {
        expect(authServiceMock.loadToken()).toEqual('string');
        expect(httpMock.post).toBeDefined();
        expect(httpMock.post).toHaveBeenCalled();
        expect(data).toEqual(mockResponse);
        done();
      });
    })
  });
});
