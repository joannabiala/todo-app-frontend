import React, {useState} from "react";
import PageTemplateComponent from "../Components/PageTemplateComponent";
import axios from "axios";
import {Redirect} from "react-router-dom";


const MainPage = () => {

  const [isToggledLogin, setToggledLogin] = useState(false);
  const toggleTrueFalseLogin = () => {
    if (isToggledLogin) {
      setToggledLogin(false)
    } else {
      setToggledLogin(true)
      setToggledRegister(false)
    }
  }

  const [isToggledRegister, setToggledRegister] = useState(false);
  const toggleTrueFalseRegister = () => {
    if (isToggledRegister) {
      setToggledRegister(false)
    } else {
      setToggledRegister(true)
      setToggledLogin(false)
    }
  }


  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [redirectToMyProfile, setRedirectToMyProfile] = useState(false)

  const [usernameRegister, setUsernameRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState('')
  const [redirectToLogin, setRedirectToLogin] = useState(false)


  const handleSubmitRegister = (event) => {
    event.preventDefault();

    const data = {
      username: usernameRegister,
      password: passwordRegister
    };

    axios.post('http://127.0.0.1:8000/api/registration/', data)
      .then((response) => {
        console.log(response);
        setRedirectToLogin(true);

        const token = `Token ${response.data.token}`
        axios.defaults.headers.common['Authorization'] = token;

        localStorage.setItem('token', token);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  if (redirectToLogin) {
    return <Redirect to="/main"/>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: usernameLogin,
      password: passwordLogin
    };

    axios.post('http://127.0.0.1:8000/auth/', data)
      .then((response) => {

        const token = `Token ${response.data.token}`
        axios.defaults.headers.common['Authorization'] = token;

        localStorage.setItem('token', token);

        setRedirectToMyProfile(true);

      })
      .catch((error) => {
        console.log(error);
      })
  }


  if (redirectToMyProfile) {
    return <Redirect to="/myprofile"/>;
  }

  return (
    <div className="mainWrapper">
      <PageTemplateComponent>
        <div className="row" id="box">
          <div id="headerWrapper" className="col-12 ">
            <div id="mainPageJumbotron" className="jumbotron jumbotron-fluid">
              <img id="logo" src="/default-monochrome-white.svg" alt="logo"/>
              <button
                onClick={() => toggleTrueFalseLogin()}
                id="logout-button"
                type="button"
                className="float-right btn"
              >
                Log in
              </button>
              <button
                onClick={() => toggleTrueFalseRegister()}
                id="options-button"
                type="button"
                className="float-right btn"
              >
                Sign up
              </button>

              <div id="jumbotron-text-container" className="container">
                <div id="mainContainer" className="row">
                  <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <h3 className="">
                      Hello you!
                    </h3>
                    <p className="lead">
                      organize your day, start creating lists!
                    </p>
                  </div>
                  <div className="col-xs-2 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <div>
                      {isToggledLogin ?
                        <div id="loginFormBox">
                          <h3>Log in</h3>
                          <div className="mx-auto">
                            <div className="form-group">
                              <p>username</p>
                              <input
                                type="text"
                                name="username"
                                onChange={(e) => setUsernameLogin(e.target.value)}
                                value={usernameLogin}
                                className="form-control"
                                placeholder="username"
                              />
                            </div>
                            <div className="form-group">
                              <p>password</p>
                              <input
                                type="password"
                                name="password"
                                onChange={(e) => setPasswordLogin(e.target.value)}
                                value={passwordLogin}
                                className="form-control"
                                placeholder="password"
                              />
                            </div>
                            <div className="form-group">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                              >Go!
                              </button>
                            </div>
                          </div>
                        </div> :
                        null}</div>


                    <div>
                      {isToggledRegister ? <div id="registerFormBox">
                          <h3>Sign up</h3>
                          <div className="mx-auto">
                            <div className="form-group">
                              <p>username</p>
                              <input
                                type="text"
                                name="username"
                                onChange={(e) => setUsernameRegister(e.target.value)}
                                value={usernameRegister}
                                className="form-control"
                                placeholder="username"
                              />
                            </div>
                            <div className="form-group">
                              <p>password</p>
                              <input
                                type="password"
                                name="password"
                                onChange={(e) => setPasswordRegister(e.target.value)}
                                value={passwordRegister}
                                className="form-control"
                                placeholder="password"
                              />
                            </div>
                            <div className="form-group">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmitRegister}
                              >Go!
                              </button>
                            </div>
                          </div>

                        </div> :
                        null}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center">© 2020 Joanna Biała
            <p>
              <a id="github" href="https://github.com/joannabiala">
                Visit my GitHub profile! &hearts;
              </a>
            </p>
          </div>
        </div>

      </PageTemplateComponent>
    </div>
  )
}

export default MainPage