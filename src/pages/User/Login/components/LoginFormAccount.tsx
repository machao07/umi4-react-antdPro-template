import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';

export const LoginFormAccount = (props: {}) => {
  const intl = useIntl();
  return (
    <>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.username.placeholder',
          defaultMessage: '用户名',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.login.username.required" defaultMessage="请输入用户名!" />
            ),
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.password.placeholder',
          defaultMessage: '密码',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.login.password.required" defaultMessage="请输入密码！" />
            ),
          },
        ]}
      />
    </>
  );
};
