import {Link, useNavigate} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import {FormEvent, useEffect} from 'react';
import {register, userActions} from '../../store/user.slice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {RootState} from '../../store/store';

export type RegisterForm = {
	name: {
		value: string;
	};
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, registerErrorMessage} = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.cleanRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const {email, password, name} = target;
		await dispatch(
			register({email: email.value, password: password.value, name: name.value})
		);
	};

	return (
		<div className={styles['login']}>
			<Headling>Регистрация</Headling>
			{registerErrorMessage && (
				<div className={styles['error']}>{registerErrorMessage}</div>
			)}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder="Email" />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Пароль"
					/>
				</div>
				<div className={styles['field']}>
					<label htmlFor="name">Ваше имя</label>
					<Input id="name" name="name" type="text" placeholder="Имя" />
				</div>
				<Button appearence="big">Зарагистрироваться</Button>
			</form>
			<div className={styles['links']}>
				<div>Есть аккаунт?</div>
				<Link to="/auth/login">Войти</Link>
			</div>
		</div>
	);
};

export default Register;
