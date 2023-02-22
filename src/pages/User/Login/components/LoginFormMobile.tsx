import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message } from 'antd';

export type GetCaptcha = (phone: string) => Promise<{ isOk: boolean; errorTips?: string }>;

export const LoginFormMobile = (props: { getCaptcha: GetCaptcha }) => {
  const intl = useIntl();
  return (
    <>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined />,
        }}
        name="mobile"
        placeholder={intl.formatMessage({
          id: 'pages.login.phoneNumber.placeholder',
          defaultMessage: '手机号',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.login.phoneNumber.required"
                defaultMessage="请输入手机号！"
              />
            ),
          },
          {
            pattern: /^1\d{10}$/,
            message: (
              <FormattedMessage
                id="pages.login.phoneNumber.invalid"
                defaultMessage="手机号格式错误！"
              />
            ),
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        captchaProps={{
          size: 'large',
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.captcha.placeholder',
          defaultMessage: '请输入验证码',
        })}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${intl.formatMessage({
              id: 'pages.getCaptchaSecondText',
              defaultMessage: '获取验证码',
            })}`;
          }
          return intl.formatMessage({
            id: 'pages.login.phoneLogin.getVerificationCode',
            defaultMessage: '获取验证码',
          });
        }}
        name="captcha"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.login.captcha.required" defaultMessage="请输入验证码！" />
            ),
          },
        ]}
        onGetCaptcha={(phone) => {
          return new Promise((resolve, reject) => {
            props
              .getCaptcha(phone)
              .then((result) => {
                if (result.isOk == true) {
                  message.success('获取验证码成功！');
                  resolve();
                } else {
                  reject();
                  message.error('获取验证码失败！' + (result.errorTips ?? ''));
                }
              })
              .catch(reject);
          });
        }}
      />
    </>
  );
};
