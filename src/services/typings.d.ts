declare namespace AppModels {
    // 登录接口返回字段定义
    export type UserData = API.SysUserDTO;

    export type CurrentUser = {
        name?: string;
        avatar?: string;
        data?: UserData
    };

    export type LoginResult = {
        status?: 'ok' | 'error';
        errorTips?: string;
        currentUser?: CurrentUser;
    };

    export type LoginParams = {
        accountType: 'acount' | 'phone';
        account?: string;
        phone?: string;
        pwassword?: string;
        verifyCode?: string;
    };
}
