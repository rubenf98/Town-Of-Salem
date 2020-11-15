import React, { useState } from "react";
import styled from "styled-components";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled(FlexContainer)`
  width: 100%;
  height: 100vh;
`;

const LoginContainer = styled.div`
  width: 25%;
  height: 100%;
  background-color: white;
`;

const FlexGrow = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const LoginContent = styled.div`
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const BackgroundContainer = styled.div`
  width: 75%;
  height: 100%;
  background-image: url("/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  margin: 50px 0;
`;

const Input = styled.input`
  background: #e7e7e7;
  margin: 5px 0px;
  padding: 10px 15px;
  box-sizing: border-box;
  border: none;
  width: 100%;
  font-weight: bold;
  color: black;

  &::placeholder {
    font-weight: bold;
    color: black;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  color: #1f1f1f;
  margin: 5px 0px;
  text-decoration: none;

  &:hover {
    color: #6d6d6d;
  }
`;

function Login() {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  function handleSubmit() {
    console.log(email + password);
  }

  return (
    <Container>
      <LoginContainer className="App-header">
        <LoginContent>
          <Logo
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvOPJ8yoBbFlp5SIGb50GOHmg5xh2_XjQVtw&usqp=CAU"
            alt="logo"
          />

          <div>
            <h1>Login </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Field onChange={(e) => setEmail(e.target.value)}>
                <Input placeholder="Email" />
              </Form.Field>
              <Form.Field onChange={(e) => setPassword(e.target.value)}>
                <Input placeholder="Password" />
              </Form.Field>
              <br />
              <br />
              <FlexContainer>
                <Form.Field>
                  <Checkbox label="STAY SIGNED IN" />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </FlexContainer>
            </Form>
          </div>

          <FlexGrow>
            <div>
              <StyledLink to="/">Create Account </StyledLink>
              <StyledLink to="/">Can't login in? </StyledLink>
            </div>
          </FlexGrow>
        </LoginContent>
      </LoginContainer>
      <BackgroundContainer />
    </Container>
  );
}

export default Login;
