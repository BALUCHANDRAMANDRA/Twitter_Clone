import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import apple from '../images/apple.png';
import { auth, provider, appleProvider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Register } from './Register';
import { Signin } from './Signin';

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:4000/accessResource', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          navigate('/home', { state: { user: response.data.data } });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [navigate]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);

      const googleEmail = result.user.email;

      const response = await axios.get(`http://localhost:4000/checkEmail/${googleEmail}`);
      if (response.data.exists) {
        navigate('/home', { state: { user: response.data.user } });
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const signInWithApple = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);

      const response = await axios.get('http://localhost:4000/accessResource', { headers: { Authorization: `Bearer ${token}` } });
      navigate('/home', { state: { user: response.data.data } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const handleSignin = () => {
    navigate('/signin');
  };

  return (
    <Container>
      <Content>
        <H>Happening now</H>
        <Span>Join today.</Span>
        <Sign onClick={signInWithGoogle}>
          <ImgContainer>Sign in with Google</ImgContainer>
          <Img src={logo} alt='google' />
        </Sign>
        <Apple onClick={signInWithApple}>
          <Image src={apple} alt='' /> Sign up with Apple
        </Apple>
        <Line>
          <Separator />
          <Text>or</Text>
          <Separator />
        </Line>
        <Account onClick={handleCreateAccount}>Create account</Account>
        <Sn>
          By signing up, you agree to the <Te>Terms of Service</Te> and <Te>Privacy Policy</Te>, including <Te>Cookie Use.</Te>
        </Sn>
        <T>Already have an account?</T>
        <SigIN onClick={handleSignin}>Sign in</SigIN>
        <Routes>
          <Route path="register" element={<Register onClose={() => navigate('/')} />} />
          <Route path="signin" element={<Signin onClose={() => navigate('/')} />} />
        </Routes>
      </Content>
    </Container>
  );
};

// Styled components code here...
const Container = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  background-color: transparent;
  z-index: 10;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 740px;
  width: 500px;
  margin-left: 0px;
  margin-right: 150px;
  color: white;
  position: relative;

  @media (max-width: 768px) {
    width: 50%;
    margin-right: 0px;
    align-items: center;
    margin-top: 50px;
  }
`;

const H = styled.h1`
  font-weight: bold;
  font-width: 20px;
  font-size: 60px;
  margin-top: 90px;
  font-family: "Arial, sans-serif";

  @media (max-width: 768px) {
    font-size: 40px;
    margin-top: 60px;
  }
`;

const Span = styled.h2`
  font-weight: bold;
  display: flex;
  align-items: end;
  margin-left: 5px;
  margin-top: 0px;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-right: 180px;
  }
`;

const Sign = styled.button`
  height: 45px;
  width: 300px;
  border-radius: 80px;
  margin-top: 10px;
  cursor: pointer;
  display: inline;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  padding-bottom: 17px;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  margin-top: 13px;
  margin-left: 60px;

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

const Image = styled.img`
  height: 20px;
  width: 20px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    height: 15px;
    width: 15px;
  }
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 40px;
  margin-right: 0px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const Apple = styled.button`
  height: 45px;
  width: 300px;
  border-radius: 80px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  margin-left: -10px;

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

const Separator = styled.hr`
  border-top: 1px solid black;
  margin: 0 10px;
  width: 127px;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const Text = styled.span`
  font-weight: bold;
  width: auto;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Account = styled.button`
  height: 45px;
  width: 300px;
  border-radius: 50px;
  border: 0px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #0ba6ff;
  color: white;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Sn = styled.span`
  width: 300px;
  font-size: 10px;
  color: gray;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const T = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin-top: 50px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 30px;
  }
`;

const SigIN = styled.button`
  height: 45px;
  width: 300px;
  border-radius: 80px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: black;
  color: #24a0ed;
  border: 1px solid #0ba6ff;

  &:hover {
    opacity: 0.7;
    transition: 0.8s;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Te = styled.span`
  color: #0ba6ff;
`;
