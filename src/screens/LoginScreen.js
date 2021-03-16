import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Message from '../components/Message';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LoginImg from '../img/call-center.jpg';
import Logo from '../img/outcess-logo.png';
import Particles from 'react-particles-js';
import '../styles/LoginScreen.css';
import { login } from '../actions/userActions';
import { css } from '@emotion/css';
import { USER_FORGOT_PASSWORD_RESET } from '../constants/userConstants';

//Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const particlesOptions={
          
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#000000"
    },
    "shape": {
      "type": "edge",
      "stroke": {
        "width": 0,
        "color": "#255aa0"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.6894671861721748,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 6,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#f25833",
      "opacity": 0.3,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 10,
        "duration": 1,
        "opacity": 4,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

function LoginTestScreen({ history }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  useEffect(() => {
    if (userInfo) {

      history.push('/home');
    } else {
      dispatch({
        type: USER_FORGOT_PASSWORD_RESET
      });
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="loginpage-wrapper">
      <Container className='loginpage-container'>
        <Row>
          <Col className='d-none d-lg-block col-xs-none col-lg-6'>
            <div className='login-img'>
              <img src={LoginImg} alt='Outcess' />
            </div>
          </Col>
          <Col className='loginform-col col-xs-12 col-lg-6'>
            <div className='logo'>
              <img src={Logo} alt='Outcess' />
            </div>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group className='form-group email' controlId="formBasicEmail">
                <i class="fas fa-user pr-3"></i>
                <Form.Label className='login-label'></Form.Label>
                {/* <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" /> */}

                <div className="form">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form__input"
                    autoComplete="true"
                    placeholder=" " />
                  <label for="email" class="form__label">Email</label>
                </div>
              </Form.Group>

              <Form.Group className='form-group password' controlId="formBasicPassword">
                <i className="fas fa-unlock pr-3"></i>
                <Form.Label className='login-label'></Form.Label>
                {/* <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" /> */}
                <div className="form pass-wrapper">
                  <input
                    // type="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form__input"
                    autoComplete="true"
                    placeholder=" " />
                  <i onClick={togglePasswordVisiblity}
                    className={passwordShown ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                  <label for="password" className="form__label">Password</label>
                </div>

              </Form.Group>
              <Button type='submit' variant='primary' className='btn btn-block'>
                Sign In
              </Button>
              <Link to='/forgotpassword' className='forget-password'>
                <p>Forgot password?</p>
              </Link>
            </Form>
            <div className="loading">
              {loading &&
                <ScaleLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={"#123abc"}
                  loading={loading} />}

            </div>
          </Col>
        </Row>
      </Container>
      <Particles className="particles"
        params={particlesOptions} />
    </div>
  );
}

export default LoginTestScreen;