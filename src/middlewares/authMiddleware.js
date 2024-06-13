const views = require('../views/productView.js');

const { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut } = require('firebase/auth');

const auth = getAuth();

function signInUser (req, res, next) {
  console.log(req.body);
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(`OK singin LOGIN`);
          req.session.user = { email: req.body.email };
          next();
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`ERROR: ${errorCode} - ${errorMessage}`);
          return res.status(401).send('El email o la contraseña no son válidos.');
          //return res.status(401).send(views.getWithoutProducts('El email o la contraseña no son válidos.', false));
      });
}

function signUpUser (req, res, next) {
  console.log(req.body);
    if (req.body.email.length < 5 || req.body.password.length < 5) 
      return res.status(422).send('El email y la contraseña deben tener una longitud de más de 5 caracteres.\n Por favor revisa los datos introducidos');
    
    createUserWithEmailAndPassword(auth,req.body.email, req.body.password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(`OK create LOGIN: ${user} - ${userCredential}`);
          req.session.user = { email: req.body.email };
          next();
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`ERROR: ${errorCode} - ${errorMessage}`);
          //return res.status(422).send(views.getWithoutProducts('Ha ocurrido algún problema con el login.', false));
          return res.status(422).send( 'Ha ocurrido algún problema con el login.');
      });
      
  }

  function statusUser (req, res, next) {
    console.log('estoy en statusUser' );
    console.log(req.session.user);
  
    try {
      if (req.session && req.session.user) {
        next();
      } else {
        res.status(401).send(views.getUserAccess('/singup'));
      }
    
    } catch (error) {
      return res.status(400).send('Ha ocurrido algún problema con el cierre de sesión.');
    }
  }


  function logoutUser (req, res, next) {
    try {
      if (auth.currentUser) {
        signOut(auth);
      }
      if (req.session && req.session.user) {
        req.session.destroy();
      }
      next();
    } catch (error) {
      return res.status(400).send('Ha ocurrido algún problema con el cierre de sesión.');
    }
    
  }

  module.exports = { signUpUser, signInUser, logoutUser, statusUser };