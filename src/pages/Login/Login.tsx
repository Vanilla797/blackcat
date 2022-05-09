import { useState } from 'react';
import { useIntl, setLocale, getLocale, history } from 'umi';
import { Input, Form, message, Switch, Button } from 'antd';

import { ReactComponent as Logo } from '@/assets/SVGs/logo-cat.svg';
import { ReactComponent as User } from '@/assets/SVGs/user.svg';
import { ReactComponent as Password } from '@/assets/SVGs/password.svg';

import { auth } from '@/fetchAPI/api';
import { connect } from 'umi';
import { mapDispatchToProps } from './mapToProps';
import styled from 'styled-components';
import backGround from '@/assets/images/Street-Dance-01.jpg';

function LoginPage(props: any) {
  const intl = useIntl();
  const { messages } = intl;
  const initialLocale = getLocale();
  // console.log(initialLocale);

  const [lang, setLang] = useState(initialLocale === 'en-US' ? 'en' : 'zh');
  const { setUser } = props;

  const changeLanguage = () => {
    if (lang === 'zh') {
      setLocale('en-US', false);
      setLang('en');
    } else {
      setLocale('zh-CN', false);
      setLang('zh');
    }
  };

  const validateUser = async (input: { name: string; password: string }) => {
    console.log(input.name, input.password);

    if (input.name === '' || input.password === '') {
      message.error('please check your username and password!');
    } else {
      try {
        const res = await auth({
          username: input.name,
          password: input.password,
        });
        if (res.token) {
          setUser(res.user);
          history.push('/list');
        }
      } catch (error) {
        console.log(error);
        message.error('please check your username and password!');
      }
    }
  };

  return (
    <LoginContainer>
      <Lang>{lang === 'en' ? 'English' : '中文'}</Lang>
      <SwitchContainer>
        <Switch onChange={changeLanguage} />
      </SwitchContainer>

      <Wrapper>
        <Title>{messages.title}</Title>
        <Subtitle>{messages.subtitle}</Subtitle>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <FormContainer>
          <Form onFinish={validateUser}>
            <Form.Item name="name" required>
              <Input
                style={InputStyle}
                prefix={<User style={prefixStyle} />}
                placeholder={intl.formatMessage({ id: 'username' })}
              />
            </Form.Item>
            <Form.Item name="password" required>
              <Input
                style={InputStyle}
                prefix={<Password style={prefixStyle} />}
                placeholder={intl.formatMessage({ id: 'password' })}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={buttonStyle}>
                {messages.submit}
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      </Wrapper>
    </LoginContainer>
  );
}

export default connect(
  ({ user }: any) => ({ ...user }),
  mapDispatchToProps,
)(LoginPage);

const LoginContainer = styled.div`
  background: url(${backGround}) no-repeat center top;
  background-size: cover;
  background-attachment: scroll;
  position: relative;
  height: 88vh;
`;

const Lang = styled.div`
  position: absolute;
  top: 1rem;
  right: 2.5rem;
  color: #d5ef7f;
  z-index: 1;
  font-size: 0.4rem;
`;

const SwitchContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 1;
`;

const Wrapper = styled.div`
  background-color: #8560a9;
  height: 100%;
  padding: 2.1rem 0 0 0;
  opacity: 0.8;
`;

const Title = styled.div`
  color: #d5ef7f;
  font-size: 0.5rem;
  opacity: 100%;
  text-align: center;
  margin-top: 1rem;
  z-index: 1;
`;
const Subtitle = styled.div`
  color: #d5ef7f;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  margin-top: 0.5rem;
  z-index: 1;
`;
const LogoContainer = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  border-radius: 50%;
  margin: 1rem auto 0;
  border: 1px solid #d5ef7f;
`;
const FormContainer = styled.div`
  position: relative;
  margin: 0.7rem auto;
  width: 7.5rem;
  padding: 2rem 0;
`;

const InputStyle = {
  opacity: '0.9',
  border: '0.5px',
  marginBottom: '0.1rem',
  borderRadius: '1rem',
  height: '1.3rem',
};

const prefixStyle = {
  height: '0.5rem',
  width: '0.5rem',
  margin: '0 auto',
};

const buttonStyle = {
  width: '100%',
  border: 'none',
  fontSize: '0.5rem',
  background: '#d5ef7f',
  cursor: 'pointer',
  color: '#453257',
  height: '12%',
  opacity: 1,
  marginTop: 0,
  bottom: 0,
  left: 0,
  position: 'fixed',
};
