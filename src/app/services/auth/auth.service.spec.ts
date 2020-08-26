import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('service: AuthService', () => {
  let service: AuthService;
  const http = jest.fn();

  beforeEach(() => {
    service = new AuthService(http as any);
    window.localStorage.clear();
  });

  describe('Test: storeUserData', () => {
    it('should be defined', () => {
      const token = 'string';
      const user = 'admin01';
      const userRole = 'admin';
      expect(service.storeUserData(token, user, userRole)).toBeDefined();
    });
  })
  
  describe('Test: loadToken', () => {
    it('should be defined', () => {
      expect(service.loadToken()).toBeDefined();
      expect(window.localStorage.getItem('id_token')).toBeDefined();
    });
  })

  describe('Test: loggedIn', () => {
    it('should return false', () => {
      expect(service.loggedIn()).toBe(false);
    });

    it('should return true', () => {
      window.localStorage.setItem('id_token', 'string');
      expect(window.localStorage.getItem('id_token')).toBeDefined();
      expect(service.loggedIn()).toBe(true);
    });
  })

  describe('Test: authenticateUser', () => {
    it('should return success response', () => {
      const user = {
        username: 'admin01',
        password: 'admin'
      }

      const response = {
        success: true,
        token: {},
        user: 'admin01',
        role: 'admin'
      }
      const serviceMock = new AuthService(httpMock as any);
      serviceMock.authenticateUser(user).subscribe((res) => {
        expect(httpMock.post).toBeDefined();
        expect(httpMock.post).toHaveBeenCalled();
        expect(serviceMock.currentUserName).toBeDefined();
        expect(data).toEqual(response);

        window.localStorage.setItem('id_token', response.token);
        window.localStorage.setItem('user', response.user);
        window.localStorage.setItem('userRole', response.role);

        expect(window.localStorage.getItem('id_token')).not.toBeNull();
        expect(window.localStorage.getItem('user')).not.toBeNull();
        expect(window.localStorage.getItem('userRole')).not.toBeNull();
        done();
      })
    });
  })
});
