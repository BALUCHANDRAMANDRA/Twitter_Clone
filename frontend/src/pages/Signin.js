import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signin = ({ onClose }) => {
  const [showText, setShowText] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleTextHover = () => {
    setTimeout(() => {
      setShowText(true);
    }, 1000);
  };
  
  const handleText = () => {
    setShowText(false);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password
      });

      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);  // Store token in localStorage
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Main
          onMouseEnter={HandleTextHover}
          onMouseLeave={handleText}
          onClick={onClose}>X
        </Main>
        <Img src="" alt="ximage" />
        {showText && <CloseText>Close</CloseText>}
        <T>Sign in to X</T>

        <Input name="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <InputE type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Save onClick={handleLogin} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Save>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
      </Content>
    </Container>
  );
}

const Container = styled.div`
    width: 80vh;
    height: 87vh;
    background-color: black;
    position: absolute;
    margin-left: -450px;
    margin-top: 50px;
    border-radius: 10px;

    @media (max-width: 768px) {
        width: 90%;
        height: auto;
        margin: 20px auto;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid white;
        justify-content: center;
    }
`;

const Content = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;

    @media (max-width: 768px) {
        margin-top: 5px;
       padding: 10px;
    }
`;

const CloseText = styled.span`
    visibility: hidden;
    position: absolute;
    top: 20px;
    left: 10px;
    font-size: 12px;
    background-color: #808080;
    border-radius: 3px;
    padding: 3px;
    font-weight: bold;
    color: white;

    @media (max-width: 768px) {
        font-size: 10px;
        top: 30px;
        left: 5px;
    }
`;

const Main = styled.button`
    margin-right: 540px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 15px;
    color: white;

    &:hover {
        opacity: 1;
        transition: 0.1s ease-in-out;
        background-color: #40404F;
        border-radius: 10px;
    }

    &:hover ~ ${CloseText} {
        visibility: visible;
        opacity: 1;
        transition: 3s; 
    }

    @media (max-width: 768px) {
        margin-right: auto;
        font-size: 12px;
    }
`;

const Img = styled.img`
    height: 100%;
    width: 100%;
    margin-top: -20px;
    margin-left: 480px;

    @media (max-width: 768px) {
        margin: 0 auto; /* Center horizontally */
        display: block; /* Ensures margin: auto works */
        height: auto; /* Adjust height for responsiveness */
        width: auto; /* Adjust width for responsiveness */
    }
`;

const T = styled.span`
    margin-top: 40px;
    margin-right: 140px;
    font-size: 30px; 
    font-weight: bold;

    @media (max-width: 768px) {
        margin-top: 20px;
        margin-right: auto;
        font-size: 24px;
        text-align: center; /* Center text */
        display: block; /* Ensures text-align: center works */
    }
`;


const Input = styled.input`
    width: 420px; 
    height: 45px; 
    color: white;
    background-color: black;
    border: 2px solid;
    border-radius: 5px;
    padding: 5px;
    margin-top: 120px;

    &::placeholder {
        text-indent: 10px; 
        color: #40404F;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 20px;
    }
`;

const Save = styled.button`
    width: 60vh;
    height: 57px;
    border: none;
    border-radius: 40px;
    font-weight: bold;
    font-size: 17px;
    cursor: pointer;
    margin-top: 20px;

    @media (max-width: 768px) {
        width: 100%;
        height: 50px;
        font-size: 15px;
        margin-top: 15px;
    }
`;

const InputE = styled.input`
    width: 420px; 
    height: 45px; 
    color: white;
    background-color: black;
    border: 2px solid;
    border-radius: 5px;
    padding: 5px;
    margin-top: 17px;

    &::placeholder {
        text-indent: 10px; 
        color: #40404F;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;
