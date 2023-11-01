/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from './Hook/UseForm';
import './log&register.css'

//LoginPage
export const LoginPage = () => {
	const navigate = useNavigate();

	const { name, email, password, onInputChange, onResetForm } =
		useForm({
			name: '',
			email: '',
			password: '',


		});

	const onRegister = e => {
		e.preventDefault();

		navigate('/', {
			replace: true,
			state: {
				logged: true,
				name,
			},
		});

		onResetForm();
	};

	return (
		<div className='login-container'>
			<div className='wrapper'>
				<form onSubmit={onRegister}>
					<h2 id='h2-form'>Iniciar Sesion</h2>

					<div className='input-group'>

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