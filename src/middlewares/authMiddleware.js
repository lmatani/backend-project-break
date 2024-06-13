const { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut } = require('firebase/auth');

const auth = getAuth();

function signInUser (req, res, next) {
  console.log(req.body);
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(`${user}`);
          console.log(`${userCredential}`);
          console.log(`OK singin LOGIN`);
          next();
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`ERROR: ${errorCode} - ${errorMessage}`);
          return res.status(401).send('El email o la contraseña no son válidos.');
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
          next();
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`ERROR: ${errorCode} - ${errorMessage}`);
          return res.status(422).send('Ha ocurrido algún problema con el login.');
          //return res.status(401).send(views.getWithoutProducts('Ha ocurrido algún problema con el login.', false));
      });
      
  }

  function logoutUser (req, res, next) {
    try {
      if (auth.currentUser) {
        signOut(auth);
        next();
      }
    } catch (error) {
      return res.status(400).send('Ha ocurrido algún problema con el cierre de sesión.');
    }
    
  }


  module.exports = { signUpUser, signInUser, logoutUser };