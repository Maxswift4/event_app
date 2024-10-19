'use client';
import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.module.css'; 
import axios from 'axios';
import {useRouter} from 'next/navigation';



const Login = ({ closeModal, setCurrentModal, setShowmodal }) => {
    const [LoginInputfield,setLoginInputfield]=useState({
    email:'',
    password:''
    })
    const Router= useRouter()

    const showRegisterModal = () => {
    setCurrentModal({
    loginModal: false,
    registerModal: true,
    });
    setShowmodal(true);
    };
    const login = async()=>{
    try{
        const url = "http://localhost/event-api/api/organizer.php";
        const formdata= new FormData();
        formdata.append("json",JSON.stringify(LoginInputfield));
        formdata.append("operation","login");
        const response= await axios.post(url,formdata);
        console.log(response.data);
        if(Object.keys(response.data).length > 0){
        alert("login successfully");
          sessionStorage.setItem("user_id",response.data[0].org_id)
          Router.push('./organizer_main');
   
     
        }else{
        alert("Invalid email or password");
        }
    }catch(error){
    console.error("error:",error)
    }

    }

  return (
    <Container fluid className={styles.loginContainer}>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} className={styles.formCol}>
          <h3 className={styles.loginTitle}>SignIn as Organizer</h3>
      
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={LoginInputfield.email}
                onChange={(e) => setLoginInputfield({...LoginInputfield,email:e.target.value})}
                required
                className={styles.inputField}
              />
            </Form.Group>
            
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={LoginInputfield.password}
                onChange={(e) => setLoginInputfield({...LoginInputfield,password:e.target.value})}
                required
                className={styles.inputField}
              />
            </Form.Group>
            <a onClick={showRegisterModal} style={{ cursor: 'pointer'}}>No Account yet? Register here.</a>
            <Button variant="dark" type="submit" className={styles.loginButton} onClick={login}>
              Login
            </Button>
       
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
