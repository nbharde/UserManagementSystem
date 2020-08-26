import { AddUsersComponent } from './add-users.component';
import { FormBuilder } from '@angular/forms';

describe('Component: AddUsersComponent', () => {
  let fixture: AddUsersComponent;
  let formBuilderMock: FormBuilder;
  let apiServiceMock: any;
  let routerMock: any;

  beforeEach((() => {
    authServiceMock = {
      login: jest.fn();
    }
    formBuilderMock = new FormBuilder();
    routerMock = jest.fn();
    fixture = new AddUsersComponent(
      formBuilderMock,
      apiServiceMock,
      routerMock
    );
    fixture.ngOnInit();
  }));

  describe('Test: ngOnit', () => {
    it('should initialize user form', () => {
      const userForm =  {
        name: '',
        username: '',
        email: '',
        password: '',
        city: '',
        country: '',
        role: ''
      }
      expect(fixture.userForm.value).toEqual(userForm);
    });
  }

  describe('Test: user form', () => {
    it('should invalidate the form', () => {
      fixture.userForm.controls.name.setValue('');
      fixture.userForm.controls.username.setValue('');
      fixture.userForm.controls.email.setValue('');
      fixture.userForm.controls.password.setValue('');
      fixture.userForm.controls.city.setValue('');
      fixture.userForm.controls.country.setValue('');
      fixture.userForm.controls.role.setValue('');
      expect(fixture.userForm.valid).toBeFalsy();
    });

    it('should validate the form', () => {
      fixture.userForm.controls.name.setValue('admin');
      fixture.userForm.controls.username.setValue('admin01');
      fixture.userForm.controls.email.setValue('admin@email.com');
      fixture.userForm.controls.password.setValue('admin');
      fixture.userForm.controls.city.setValue('Thane');
      fixture.userForm.controls.country.setValue('India');
      fixture.userForm.controls.role.setValue('admin');
      expect(fixture.userForm.valid).toBeTruthy();
    }
  });

  describe('Test: onFormSubmit', () => {
    it('should call addUser', () => {
      const userForm =  {
        name: '',
        username: '',
        email: '',
        password: '',
        city: '',
        country: '',
        role: ''
      }

      const spyAddUser = jest.spyOn(apiServiceMock, 'addUser').mockReturnValue(true)
      
      expect(apiServiceMock.addUser(userForm)).toBe(true);
      expect(spyAddUser).toHaveBeenCalledWith(userForm);
    });
  }
});
