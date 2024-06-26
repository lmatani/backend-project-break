const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const singInButton = document.getElementById('sing-in');
const signUpButton = document.getElementById('sing-up');
const backButton = document.getElementById('back-main');

singInButton.addEventListener('click', (event) => {
    event.preventDefault();
    singButton('/singin');
  });

signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    singButton('/singup');
  });

backButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = `/products`;
  });


  async function singButton(action) 
  {
    const userCredential = {
        email: emailInput.value,
        password: passwordInput.value,  
    } 

    try {
           const response = await fetch(`${action}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userCredential)
          });
          
          console.log(response);
          if (response.ok) {
              window.location.href = `/dashboard`;
          } else {
              const errorData = await response;
              console.log(errorData);
              alert('Email o contraseña no válidos. Revise los datos.');   
          }
      } catch (error) {
          console.log('Error:', error);
          alert('Ha ocurrido un error al logarse. Inténtalo más tarde.');
      }
  }
