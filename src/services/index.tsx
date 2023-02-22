export class AppService {
  static queryCurrentUser(options?: {
    skipErrorHandler?: boolean;
  }): Promise<{ data: AppModels.CurrentUser }> {
    //TODO bind login api,and make error auto tips
    return Promise.resolve({ data: { name: 'hi-admin', roles: ['admin'] } });
  }

  static login(options: AppModels.LoginParams): Promise<AppModels.LoginResult> {
    //TODO bind login api,and make error auto tips
    return Promise.resolve({ status: 'ok' });
  }

  static outLogin(options?: { [key: string]: any }) {
    //TODO bind outLogin api,and make error auto tips
    return Promise.resolve({ data: {} });
  }
}
