import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { formatNumber } from '@angular/common';

describe('LoginComponent', () => {
  let fixture: LoginComponent;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock =  {
      authenticateUser: jest.fn()
    }
    routerMock = jest.fn();

    fixture = new LoginComponent(
      authServiceMock,
      routerMock
    );

    fixture.ngOnInit();
  }

  describe('Test: login method', () => {
    it('should authenticate user', () => {
      const userObj = {
        username: 'username',
        password: 'password'
      }

      const spyLoginUser = jest.spyOn(authServiceMock, 'authenticateUser').mockReturnValue(true);
      expect(authServiceMock.authenticateUser(userObj)).toBe(true);
      expect(spyLoginUser).toHaveBeenCalledWith(userObj);
    })
  })

});
