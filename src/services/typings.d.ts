declare namespace AppModels {
  export type CurrentUser = {
    name?: string;
    avatar?: string;
    roles?: string[];
  };

  export type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  export type LoginParams = {
    accountType: 'acount' | 'phone';
    account?: string;
    phone?: string;
    pwassword?: string;
    verifyCode?: string;
  };
}
