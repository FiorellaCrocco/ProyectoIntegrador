/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from './Hook/UseForm';
import './log&register.css'

//LoginPage
export const LoginPage = () => {
	const url = "http://localhost:8080/auth/login"
	//const url = "https://onlybooks.isanerd.club/api/auth/login";
	const navigate = useNavigate();

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
		try{
			const response = await fetch(url,settings)
			console.log(response)
			if(response.status==200){
				navigate('/', {
					replace: true,
					state: {
						logged: true
					}
				});
			}
		}catch{(error)=>{
			console.log(error)
		}}
		onResetForm();
	};

	return (
		<div className='login-container'>
			<div className='wrapper'>
				<form onSubmit={onLogin}>
					<h2 id='h2-form'>Iniciar Sesion</h2>

					<div className='input-group'>

						<input
							type='email'
							name='email'
							id='email'
							className="input"
							value={email}
							onChange={onInputChange}
							required
							autoComplete='off'
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
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className="label" htmlFor='password'>Contraseña</label>
					</div>
					<button className='btn-lr'>Iniciar Sesion</button>
				</form>
			</div>
		</div>

	);
};

export default LoginPage;