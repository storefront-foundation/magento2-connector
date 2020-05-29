import React, { useState, useContext } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useLoginStatus from '../hooks/useLoginStatus';
import SessionContext from '../session/SessionContext';

const useStyles = makeStyles((/* theme */) => ({
  root: {
    border: '1px solid #9c0000',
    minHeight: 100,
    padding: 10,
  },
  spacingBlock: {
    margin: 10,
  },
}));

export default function BasicLoginForm() {
  const classes = useStyles();

  const { actions } = useContext(SessionContext);
  const isLoggedIn = useLoginStatus();

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpLastName, setSignUpLastName] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const signIn = async () => {
    setSignInError('');
    const email = signInEmail;
    const password = signInPassword;
    const response = await actions.signIn(email, password);
    if (!response.success) {
      setSignInError(response.reason);
    }
  };

  const signOut = async () => {
    await actions.signOut();
  };

  const signUp = async () => {
    setSignUpError('');
    const firstName = signUpFirstName;
    const lastName = signUpLastName;
    const email = signUpEmail;
    const password = signUpPassword;
    const response1 = await actions.signUp({
      firstName,
      lastName,
      email,
      password,
    });
    if (!response1.success) {
      setSignUpError(response1.reason);
      return;
    }
    const response2 = await actions.signIn(email, password);
    if (!response2.success) {
      setSignUpError(response2.reason);
    }
  };

  return (
    <>
      <Container className={classes.root}>
        <div>
          Is logged in user:
          <b>{` ${isLoggedIn}`}</b>
        </div>
        {!isLoggedIn ? (
          <>
            <div className={classes.spacingBlock}>
              <h3>SIGN IN</h3>
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                value={signInEmail}
                label="Email"
                onChange={(event) => setSignInEmail(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                type="password"
                value={signInPassword}
                label="Password"
                onChange={(event) => setSignInPassword(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <Button variant="outlined" onClick={signIn}>Sign In</Button>
            </div>
            {signInError && (
              <div className={classes.spacingBlock}>
                <b style={{ color: '#f00' }}>{signInError}</b>
              </div>
            )}
            <div className={classes.spacingBlock}>
              <p>or</p>
              <h3>SIGN UP</h3>
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                value={signUpFirstName}
                label="First Name"
                onChange={(event) => setSignUpFirstName(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                value={signUpLastName}
                label="Last Name"
                onChange={(event) => setSignUpLastName(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                value={signUpEmail}
                label="Email"
                onChange={(event) => setSignUpEmail(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                type="password"
                value={signUpPassword}
                label="Password"
                onChange={(event) => setSignUpPassword(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <Button variant="outlined" onClick={signUp}>Sign Up</Button>
            </div>
            {signUpError && (
              <div className={classes.spacingBlock}>
                <b style={{ color: '#f00' }}>{signUpError}</b>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={classes.spacingBlock}>
              <Button variant="outlined" onClick={signOut}>Sign Out</Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
