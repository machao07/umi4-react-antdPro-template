import Footer from '@/components/Footer';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useIntl } from '@umijs/max';
import React from 'react';
import Settings from '../../../../config/defaultSettings';
import { AppService } from '../../../services';
import { Lang } from './components/Login';
import { LoginFormUI } from './components/LoginForm';

const Login: React.FC = () => {
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginFormUI
          enableLoginAccount={true}
          enableLoginMobile={false}
          doLogin={(request) => {
            return AppService.login(request);
          }}
          getCaptcha={() => {
            return Promise.resolve({ isOk: true });
          }}
          onLoginOk={() => {
            const urlParams = new URL(window.location.href).searchParams;
            history.push(urlParams.get('redirect') || '/');
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
