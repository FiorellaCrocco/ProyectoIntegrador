/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from './Hook/UseForm'
import './log&register.css'
//RegisterPage
export const RegisterPage = () => {
	const navigate = useNavigate();

	const { name, surname, email, password, repeatPassword, onInputChange, onResetForm } =
		useForm({
			name: '',
			surname: '',
			email: '',
			password: '',
			repeatPassword: '',
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
				<form className='loginForm' onSubmit={onRegister}>
					<h2 id='h2-form'>Crear cuenta</h2>

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
							name='surname'
							id='surname'
							className='input'
							value={surname}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='surname'>Apellido</label>
					</div>

					<div className='input-group'>

						<input
							type='email'
							name='email'
							id='email'
							className='input'
							value={email}
							onChange={onInputChange}
							required
							autoComplete='off'
						/>
						<label className='label' htmlFor='email'>Email</label>

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

					<button className='btn-lr'>Registrarse</button>
				</form>
			</div>
		</div>

	);
}

export default RegisterPage;

