import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from './Hook/UseForm';
import './log&register.css'

//LoginPage
export const LoginPage = () => {
	const url = "http://localhost:8080/auth/login"
	//const url = "https://onlybooks.isanerd.club/api/auth/login";
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState(null);
	const [isTyping, setIsTyping] = useState(false);

	const { email, password, onInputChange, onResetForm } =
		useForm({
			email: '',
			password: '',
		});

	const settings={
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body: JSON.stringify({
			email:email,
			password:password
		})

	}
	

	//onLogin
	const onLogin = async(e) => {
		e.preventDefault();
		setLoginError(null); // Limpiar el mensaje de error al intentar nuevamente
		setIsTyping(false); // Restablecer el estado de escritura
		try{
			const response = await fetch(url,settings)
			console.log(response)
			if(response.status===200){

				    // Autenticación exitosa, obtener el token del cuerpo de la respuesta
					const data = await response.json();
        			const { token } = data;		
					// Almacenar el token en sessionStorage
					sessionStorage.setItem('token', token);

				navigate('/', {
					replace: true,
					state: {
						logged: true
					}
				});
			}
			else if(response.status==403){
				setLoginError("Credenciales incorrectas. Inténtelo de nuevo.");
			}
		}catch(error) {
			console.log(error)
			setLoginError("Ocurrió un error al iniciar sesión. Inténtelo de nuevo más tarde.");
		}
		onResetForm();
	};

	return (
		<div className='login-container'>
			<div className='wrapper'>
				<form onSubmit={onLogin}>
					<h2 id='h2-form'>Iniciar Sesión</h2>

					<div className='input-group'>

						<input
							type='email'
							name='email'
							id='email'
							className="input"
							value={email}
							onChange={(e) => {
								onInputChange(e);
								setIsTyping(true);
							}}
							required
							autoComplete='off'
							placeholder=' '
						/>
						<label className="label" htmlFor='email'>Email</label>
					</div>
					<div className='input-group'>

						<input
							type='password'
							name='password'
							id='password'
							className="input"
							value={password}
							onChange={(e) => {
								onInputChange(e);
								setIsTyping(true);
							}}
							required
							autoComplete='off'
							placeholder=' '
						/>
						<label className="label" htmlFor='password'>Contraseña</label>
					</div>
					{!isTyping && loginError && <p className="error-message">{loginError}</p>}
					<button className='btn-lr'>Iniciar Sesion</button>
				</form>
			</div>
		</div>

	);
};

export default LoginPage;



/* Criterios de Aceptación:
- Iniciar sesión en la cuenta del usuario utilizando una dirección de correo electrónico y una contraseña válidas.
- Mostrar un mensaje de error claro y útil en caso de que el usuario proporcione información de inicio de sesión incorrecta.
- Permitir al usuario acceder a la información personal y las funcionalidades disponibles después de iniciar sesión.
- Cuando el usuario está identificado, mostrar su nombre, un avatar de letras con las iniciales del nombre de usuario. */