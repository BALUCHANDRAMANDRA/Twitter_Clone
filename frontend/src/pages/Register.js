import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';

export const Register = ({ onClose }) => {
  const [showText, setShowText] = useState(false);
  const [emailPlaceholder, setEmailPlaceholder] = useState("Email");
  const [isEmail, setIsEmail] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const handleTextHover = () => {
    setTimeout(() => {
      setShowText(true);
    }, 1000);
  };

  const handleText = () => {
    setShowText(false);
  };

  const handleSave = () => {
    handleRegister();
  };

  const togglePlaceholder = () => {
    if (isEmail) {
      setEmailPlaceholder("Phone");
    } else {
      setEmailPlaceholder("Email");
    }
    setIsEmail(!isEmail);
  };

  const handleRegister = async () => {
    try {

      await schema.validate({
        username,
        email,
        password
      }, { abortEarly: false });

      
      const response = await axios.post('http://localhost:4000/register', {
        username,
        email,
        password
      });
      console.log('Registration response:', response.data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      // If validation or registration fails, catch the error
      console.error('Registration error:', error);
      if (error.response) {
       
        console.error('Server response data:', error.response.data);
        console.error('Server response status:', error.response.status);
        setErrorMessage('Registration failed: ' + error.response.data.message); 
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setErrorMessage('Registration failed: No response received');
      } else {
       
        console.error('Request error:', error.message);
        setErrorMessage('Registration failed: ' + error.message);
      }
      setShowFailureMessage(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };


  return (
    <Container>
      <Content>
        <Main 
          onMouseEnter={handleTextHover}
          onMouseLeave={handleText}
          onClick={onClose}>X
        </Main>
        <Img src="" alt="ximage" />
        {showText && <CloseText>Close</CloseText>}
        <Create>Create your account</Create>
        <InputContainer>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <N>Enter name</N>
          <InputE type={isEmail ? 'email' : 'tel'} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <E>{isEmail ? 'Enter email' : 'Enter phone'}</E>
          <InputP type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <P>Enter password</P>
        </InputContainer>
        <Mail onClick={togglePlaceholder}>Use {isEmail ? "Phone" : "Email"} instead</Mail>
        <Dob>
          <Ddob>Date of birth</Ddob>
          <Dtext>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Dtext>
        </Dob>
        <Date type="date"></Date>
        <RegisterButton onClick={handleSave}>Register</RegisterButton>
        {showSuccessMessage && <SuccessMessage>Registration successful! Redirecting...</SuccessMessage>}
        {showFailureMessage && <FailureMessage>Registration failed! Please try again.</FailureMessage>}
      </Content>
    </Container>
  );
};

const Container = styled.main`
    width: 80vh;
    max-width: 600px;
    height: 87vh;
    background-color: black;
    position: absolute;
    margin-left: -450px;
    margin-top: 50px;
    border-radius: 10px;
    z-index: 2;

    @media (max-width: 900px) {
        margin-left: 0;
        margin-right: 0;
        overflow: hidden;
        border: 1px solid white; 
    }

    @media (max-width: 768px) {
        width: 90%;
        height: auto;
        margin-top: 20px;
        padding: 10px;
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
`;

const Main = styled.button`
    margin-right: auto;
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
        font-size: 12px;
    }
`;

const Img = styled.img`
    height: 100%;
    width: 100%;
    margin-top: -20px;
    margin-left: 480px;

    @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 0;
        width: auto;
    }
`;

const Create = styled.span`
    margin-top: 40px;
    margin-left: -150px;
    font-size: 30px;
    font-weight: bold;
    color: white;

    @media (max-width: 768px) {
        margin-left: 0;
        font-size: 24px;
    }
`;
const InputLabel = styled.label`
  color: gray;
  margin-left: 20px;
  margin-top: 13px;
  font-size: 14px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 0px;
    position: relative;

    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

const N = styled.span`
    position: absolute;
    margin-left: 20px;
    margin-top: 13px;
    color: gray;
    background-color: black;
    transition: 0.2s ease;
    pointer-events: none;
`;

const Input = styled.input`
    width: 420px; 
    height: 45px; 
    color: white;
    background-color: transparent;
    border: 2px solid;
    border-radius: 5px;
    padding: 5px;

    &:focus, &:valid {
        outline: none;
        color:#0ba6ff;
        border-color: #0ba6ff; 
    }

    &:focus + ${N}, &:valid + ${N} {
        color: #0ba6ff;
        height: 30px;
        line-height: 30px;
        transform: translate(1px, -30px) scale(0.88);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const E = styled.span`
    position: absolute;
    margin-left: 20px;
    margin-top: 90px;
    color: gray;
    background-color: black;
    transition: 0.2s ease;
    pointer-events: none;
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

    &:focus, &:valid {
        outline: none;
        color: #0ba6ff;
        border-color: #0ba6ff; 
    }

    &:focus + ${E}, &:valid + ${E} {
        color: #0ba6ff;
        height: 30px;
        line-height: 30px;
        transform: translate(-1px, -30px) scale(0.88);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const P = styled.span`
    position: absolute;
    margin-left: 20px;
    margin-top: 164px;
    color: gray;
    background-color: black;
    transition: 0.2s ease;
    pointer-events: none;
`;

const InputP = styled.input`
    width: 420px; 
    height: 45px; 
    color: white;
    background-color: black;
    border: 2px solid;
    border-radius: 5px;
    padding: 5px;
    margin-top: 17px;

    &:focus, &:valid {
        outline: none;
        color: #0ba6ff;
        border-color: #0ba6ff; 
    }

    &:focus + ${P}, &:valid + ${P} {
        color: #0ba6ff;
        height: 30px;
        line-height: 30px;
        transform: translate(1px, -30px) scale(0.88);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Mail = styled.a`
    color: #0ba6ff;
    margin-left: 300px;
    margin-top: 12px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 10px;
    }
`;

const Dob = styled.div`
    display: flex;
    flex-direction: column;
    width: 420px;
    margin-top: 14px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Ddob = styled.span`
    font-weight: bold;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const Dtext = styled.span`
    font-size: 14px;
    color: gray;
    margin-top: 6px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const Date = styled.input`
    margin-top: 20px;
    width: 150px;

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 10px;
    }
`;

const RegisterButton = styled.button`
    width: 60vh;
    height: 57px;
    border: none;
    border-radius: 40px;
    font-weight: bold;
    font-size: 17px;
    cursor: pointer;
    margin-top: 50px;

    @media (max-width: 768px) {
        width: 100%;
        height: 50px;
        font-size: 15px;
        margin-top: 30px;
    }
`;

const SuccessMessage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 128, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    font-weight: bold;

    @media (max-width: 768px) {
        width: 90%;
        padding: 15px;
    }
`;

const FailureMessage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    font-weight: bold;

    @media (max-width: 768px) {
        width: 90%;
        padding: 15px;
    }
`;


