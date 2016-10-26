import {LoginEntity} from '../model/login';


// Just a fake loginAPI
class LoginAPI {
  public isValidLogin(loginInfo : LoginEntity) : boolean
  {
    return (loginInfo.login === 'test' && loginInfo.password === 'test');
  }
}

export const loginApi = new LoginAPI();
