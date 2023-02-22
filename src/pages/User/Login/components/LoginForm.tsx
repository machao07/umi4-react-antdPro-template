import { LoginForm } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../../config/defaultSettings';
import { LoginFormFooder } from './Login';
import { LoginFormAccount } from './LoginFormAccount';
import { GetCaptcha, LoginFormMobile } from './LoginFormMobile';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

export interface LoginFormProps {
  enableLoginAccount: boolean;
  enableLoginMobile: boolean;
  doLogin: (request: AppModels.LoginParams) => Promise<AppModels.LoginResult>;
  getCaptcha?: GetCaptcha;
  onLoginOk: () => void;
}
export const LoginFormUI = (props: LoginFormProps) => {
  const [userLoginState, setUserLoginState] = useState<AppModels.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: AppModels.LoginParams) => {
    try {
      // 登录
      let msg: AppModels.LoginResult | undefined = await props.doLogin(values);
      if (msg?.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        props.onLoginOk();
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  const intl = useIntl();
  const { status, type: loginType } = userLoginState;
  return (
    <LoginForm
      contentStyle={{
        minWidth: 280,
        maxWidth: '75vw',
      }}
      logo={<img alt="logo" src="/logo.svg" />}
      title={Settings.title}
      subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title', defaultMessage: ' ' })}
      initialValues={{
        autoLogin: true,
      }}
      // actions={[
      //   <FormattedMessage
      //     key="loginWith"
      //     id="pages.login.loginWith"
      //     defaultMessage="其他登录方式"
      //   />,
      //   <ActionIcons key="icons" />,
      // ]}
      onFinish={async (values) => {
        await handleSubmit({
          accountType: type == 'account' ? 'acount' : 'phone',
          account: values.username,
          pwassword: values.password,
          verifyCode: values.password,
        });
      }}
    >
      {props.enableLoginAccount && props.enableLoginMobile ? (
        <Tabs
          activeKey={type}
          onChange={setType}
          centered
          items={[
            {
              key: 'account',
              label: intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账户密码登录',
              }),
            },
            {
              key: 'mobile',
              label: intl.formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: '手机号登录',
              }),
            },
          ]}
        />
      ) : undefined}

      {status === 'error' && loginType === 'account' && (
        <LoginMessage
          content={intl.formatMessage({
            id: 'pages.login.accountLogin.errorMessage',
            defaultMessage: '账户或密码错误',
          })}
        />
      )}
      {type === 'account' && <LoginFormAccount />}

      {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}

      {type === 'mobile' && <LoginFormMobile getCaptcha={props.getCaptcha as any} />}
      <LoginFormFooder />
    </LoginForm>
  );
};
