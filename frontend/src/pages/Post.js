import React, { useState, useRef } from "react";
import styled from "styled-components";
import XLogo from '../images/X-Logo.png'; 
import axios from 'axios';

export const Post = ({ onClose, onAddPost }) => {
    const [showText, setShowText] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null); // For storing the object URL
    const textareaRef = useRef(null);
    const [content, setContent] = useState('');

    const handleTextHover = () => {
        setTimeout(() => {
            setShowText(true);
        }, 1000);
    };

    const handleText = () => {
        setShowText(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            setProfileImageUrl(URL.createObjectURL(file)); 
        }
    };

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('content', content);
        if (profileImage) {
            formData.append('image', profileImage);
        }
        postContent(formData, token);
    };

    const postContent = (formData, token) => {
        axios
            .post('http://localhost:4000/posts', formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            })
            .then((response) => {
                onAddPost(response.data.data);
                onClose();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Container>
            <Content>
                <Main
                    onMouseEnter={handleTextHover}
                    onMouseLeave={handleText}
                    onClick={onClose}
                >
                    X
                </Main>
                {showText && <CloseText>Close</CloseText>}
                <User>
                    <Img src={require('../images/X-Logo.png')} alt="Profile" />
                </User>
                <Input
                    ref={textareaRef}
                    onInput={handleInput}
                    placeholder="What is happening?!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {profileImageUrl && (
                    <SelectedImageContainer>
                        <SelectedImg src={profileImageUrl} alt="Selected Image" />
                    </SelectedImageContainer>
                )}
                <Seperater />
                <SubDiv>
                    <input type="file" id="fileInput" accept="image/jpeg, image/jpg, image/png, image/svg" style={{ display: 'none' }} onChange={handleFileChange} />
                    <Label htmlFor="fileInput">
                        <Icon src={XLogo} alt="Upload" />
                    </Label>
                    <Icon src={XLogo} alt="Emoji" />
                    <Icon src={XLogo} alt="Gif" />
                    <Icon src={XLogo} alt="Date" />
                    <Icon src={XLogo} alt="Location" />
                    <Save onClick={handleSubmit}>Post</Save>
                </SubDiv>   
            </Content>
        </Container>
    );
};

const Container = styled.div`
    height: auto !important;
    width: 100%;
    max-width: 500px;
    position: absolute;
    margin-left: 22rem;
    margin-top: 10rem;
    top: 10%;
    background-color: black;
    border-radius: 17px;
    z-index: 100;
    padding: 10px;

    @media (max-width: 768px) {
        width: 90%;
        top: 5%;
    }
`;

const Content = styled.div`
    position: relative;
    height: auto;
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
        top: 10px;
        left: 5px;
    }
`;

const Main = styled.button`
    margin-top: 10px;
    margin-left: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 15px;
    color: white;
    position: relative;
    display: block;

    &:hover {
        opacity: 1;
        transition: 0.1s ease-in-out;
        background-color: #40404F;
        border-radius: 10px;
    }

    &:hover + ${CloseText} {
        visibility: visible;
        opacity: 1;
        transition: 3s;
    }

    @media (max-width: 768px) {
        font-size: 12px;
        margin-left: 5px;
    }
`;

const User = styled.div``;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-top: 20px;
    margin-left: 10px;
    border-radius: 50%;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }
`;

const Input = styled.textarea`
    margin-left: 30px;
    margin-top: -44px;
    color: white;
    border: none;
    background-color: black;
    width: calc(100% - 60px);
    height: auto;
    resize: none;
    outline: none;
    padding: 15px;
    font-size: 20px;
    overflow: hidden;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    &::placeholder {
        font-size: 20px;
        font-weight: medium;
        font-family: 'Poppins', sans-serif;
    }

    @media (max-width: 768px) {
        margin-left: 10px;
        margin-top: -30px;
        width: calc(100% - 40px);
        font-size: 16px;
        padding: 10px;
    }
`;

const Seperater = styled.hr`
    margin-top: 50px;
    border-color: #17202A;

    @media (max-width: 768px) {
        margin-top: 30px;
    }
`;

const SubDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .6em;
    margin-bottom: 10px;
    justify-content: center;

    @media (max-width: 768px) {
        display: flex;
    flex-direction: row;
    align-items: center;
    gap: .6em;
    margin-bottom: 10px;
    justify-content: center;
    }
`;

const Label = styled.label`
    cursor: pointer;
`;

const Icon = styled.img`
    width: 15px;
    height: 15px;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    border: none;
    background-color: transparent;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const Save = styled.button`
    width: 80px;
    height: 35px;
    border-radius: 40px;
    background-color: #0ba6ff;
    border: none;
    color: white;
    font-size: 15px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;

    @media (max-width: 768px) {
        width: 70px;
        height: 30px;
        font-size: 14px;
    }
`;

const SelectedImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const SelectedImg = styled.img`
    width: 95%;
    height: auto;
    max-height: 400px;
    border-radius: 10px;

    @media (max-width: 768px) {
        max-height: 300px;
    }
`;
