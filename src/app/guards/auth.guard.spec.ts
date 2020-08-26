import { AuthGuard } from './auth.guard';
import { JsonpClientBackend } from '@angular/common/http';

describe('service: AuthGuard', () => {
    let service: AuthGuard;
    let authServiceMock: any;
    let routerMock: any;

    beforeEach(() => {
        authServiceMock = {
            loggedIn: jest.fn();
        }

        routerMock = {
            navigate: jest.fn();
        }

        service = new AuthGuard(
            authServiceMock,
            routerMock
        )
    })

    describe('Test: canActivate', () => {
        it('should return true', () => {
            const spyCanActivate = jest.spyOn(authServiceMock, 'loggedIn').mockReturnValue(true);
            expect(authServiceMock.loggedIn()).toBe(true);
        })

        it('should return false', () => {
            const spyCanActivate = jest.spyOn(authServiceMock, 'loggedIn').mockReturnValue(false);
            expect(authServiceMock.loggedIn()).toBe(false);
            expect(routerMock.navigate).toBeDefined();
        })
    })
})