import styled from "styled-components";
import { useState } from "react";

export const Lost = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Container>
      <InputContainer>
        <Img src={require('../images/Home-icon.png')} alt="" />
        <Input
          placeholder="Search by username"
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
  position: absolute;
  left: 15px;
`;

const Input = styled.input`
  font-size: 15px;
  height: 40px;
  width: 300px;
  border: none;
  border-radius: 47px;
  padding-left: 45px; 
  background-color: #17202A;
  color: white;
  
  &::placeholder {
    color: gray;
  }
`;
