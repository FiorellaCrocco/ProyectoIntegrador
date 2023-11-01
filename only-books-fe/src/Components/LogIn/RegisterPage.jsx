/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from './Hook/UseForm'
import './index.css'
//RegisterPage
export const RegisterPage = () => {
	const navigate = useNavigate();

	const { name, surname, email, password, repeatPassword, onInputChange, onResetForm } =
		useForm({
			name: '',
			surname:'',
			email: '',
			password: '',
			repeatPassword:'',
		});

	const onLogin = e => {
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
		<div className='wrapper'>
			<form className='loginForm' onSubmit={onLogin}>
				<h1>Crear Usuario</h1>

				<div className='input-group'>
				<label htmlFor='name'>Nombre:</label>
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
					
				</div>

				<div className='input-group'> 
				<label htmlFor='surname'>Apellido:</label>
					<input
						type='text'
						name='surname'
						id='surname'
						value={surname}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
				</div>

				<div className='input-group'>
				<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
					
				</div>
				<div className='input-group'>
				<label htmlFor='password'>Contraseña:</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
				
				</div>

				<div className='input-group'>
				<label htmlFor='password'>Repetir Contraseña:</label>
					<input
						type='password'
						name='repeatPassword'
						id='repeatPassword'
						value={repeatPassword}
						onChange={onInputChange}
						required
						autoComplete='off'
					/>
					
				</div>

				<button>Registrarse</button>
			</form>
		</div>
	);
    }

	export default RegisterPage;
	
    