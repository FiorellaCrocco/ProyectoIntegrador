/* eslint-disable no-unsafe-finally */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from './Hook/UseForm'
import './log&register.css'
//RegisterPage
export const RegisterPage = () => {
	const [passwordError, setPasswordError] = useState('')
	const [emailError, setEmailError] = useState('')
	const navigate = useNavigate();
	const url = "http://localhost:8080/auth/register"
	//const url = "https://onlybooks.isanerd.club/api/auth/register";

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

	function validatePassword(password) {
		const samePassword = password == repeatPassword ? true : false
		return passwordRegex.test(password) && samePassword
	}

	//const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
	// function validatePassword(password) {
	// 	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
	// 	if (password.length < 8) {
	// 	  return "Tu contraseña es demasiado corta. Debe tener al menos 8 caracteres.";
	// 	}
	// 	if (!passwordRegex.test(password)) {
	// 	  return "La contraseña no cumple con los requisitos.";
	// 	}
	// 	return true;
	//   }


	const { name, lastname, email, dni, password, repeatPassword, onInputChange, onResetForm } =
		useForm({
			name: '',
			lastname: '',
			email: '',
			dni: '',
			password: '',
			repeatPassword: '',
		});

	const settings = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			lastname: lastname,
			email: email,
			dni: dni,
			password: password,
			rol: 'USER'
		})

	}

	const onRegister = async (e) => {
		e.preventDefault();


			if (validatePassword(password)) {
				setPasswordError('')
				try {
					const response = await fetch(url, settings)
					console.log(response)
					if (response.status == 200) {
						navigate('/', {
							replace: true,
							state: {
								logged: true
							}
						});
					}
					if(response.status==500){
						setEmailError('Ya existe un usuario con ese email');
					console.log("Usuario existente");	
					}
				} catch {
					(error) => {
					console.log(error)
					}
				}
				//onResetForm();
			} else {
				setPasswordError("La contraseña no cumple con los requerimientos")
			}
	}


	return (
		<div className='login-container'>
			<div className='wrapper'>
				<form className='loginForm' onSubmit={onRegister}>
					<h2>Crear cuenta</h2>

					<div className="input-group">
						<input
							type='text'
							name='name'
							id='name'
							className="input"
							value={name}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className="label" htmlFor='name'>Nombre</label>



					</div>

					<div className='input-group'>

						<input
							type='text'
							name='lastname'
							id='lastname'
							className='input'
							value={lastname}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='lastname'>Apellido</label>
					</div>

					<div className='input-group'>

						<input
							type='email'
							name='email'
							id='email'
							className='input'
							value={email}
							onChange={(e)=>{onInputChange(e), setEmailError('')}}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='email'>Email</label>

					</div>
					<div className='input-group'>

						<input
							type='dni'
							name='dni'
							id='dni'
							className='input'
							value={dni}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='dni'>DNI</label>

					</div>

					<div className='input-group'>

						<input
							type='password'
							name='password'
							id='password'
							className='input'
							value={password}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='password'>Contraseña</label>
					</div>

					<div className='input-group'>

						<input
							type='password'
							name='repeatPassword'
							id='repeatPassword'
							className='input'
							value={repeatPassword}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='password'>Repetir Contraseña</label>
					</div>
					<div className='passwordError'>{passwordError}</div>
					<div className='passwordError'>{emailError}</div>
					<button className='btn-lr'>Registrarse</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
