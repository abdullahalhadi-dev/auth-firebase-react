import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signOut, GithubAuthProvider, OAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider =  new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const yahooProvider = new OAuthProvider('yahoo.com');


function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  // GoogleSignIn
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(loggedInUser);
    }).catch((error) => {
      console.log(error.message);
    });
  }

  // FacebookSignIn

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(loggedInUser);
    }).catch((error) => {
      console.log(error.message);
    });
  }

  // GithubSignIn

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(loggedInUser);
    }).catch((error) => {
      console.log(error.message);
    });
  }

// YahooSignIn

const handleYahooSignIn = () => {
  signInWithPopup(auth, yahooProvider)
  .then((result) => {
    const {displayName, email, photoURL} = result.user;
    const loggedInUser = {
      name: displayName,
      email: email,
      photo: photoURL,
    }
    setUser(loggedInUser);
    console.log(result.user)
  })
  .catch((error) => {
    console.log(error.message);
  });
}


// Sign Out

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({});
    }).catch((error) => {
      console.log(error);
    });
  }
  
  return (
    <div className="App">
      {
        user.accessToken && <div>
          <h2>Welcome {user.name}</h2>
          <p>My email address is: {user.email}</p>
          <img src={user.photo} alt="profilePicture"/>
        </div>
      }
      <br />
      {
        !user.accessToken ? (
      <>
      <div className='header'>
        <h1>Welcome To Login Page</h1>
      </div>
      <div className='container root-class'>
        <div className='google'>
          <button onClick={handleGoogleSignIn}>Sign In with Google</button> 
        </div>
        <div className='facebook'>
          <button onClick={handleFacebookSignIn}>Sign In with Facebook</button>  
        </div>
        <div className='github'>
          <button onClick={handleGithubSignIn}>Sign In with GitHub</button>  
        </div>
        <div className='yahoo'>
          <button onClick={handleYahooSignIn}>Sign In with Yahoo</button>
        </div>

        <div className='no-account'>
          <p>No Account? <span>Create an Account</span></p>
        </div>
      </div>
      </>
        ) :(
          <button className='signout' onClick={handleSignOut}>Sign out</button>
      )}
     
      
    </div>
  );
}

export default App;
