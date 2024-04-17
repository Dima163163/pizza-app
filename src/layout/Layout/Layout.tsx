import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile, userActions} from '../../store/user.slice';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect} from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state: RootState) => state.user.profile);
	const items = useSelector((state: RootState) => state.cart.items);
	console.log('profile: ', items);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logOut = () => {
		dispatch(userActions.logOut());
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img
						className={styles['avatar']}
						src="/avatar.png"
						alt="Аватар пользователя"
					/>
					<div className={styles['name']}>{profile?.name}</div>
					<div className={styles['email']}>{profile?.email}</div>
				</div>
				<div className={styles['menu']}>
					<NavLink
						to="/"
						className={({isActive}) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src="/menu-icon.svg" alt="Иконка меню" />
						Menu
					</NavLink>
					<NavLink
						to="/cart"
						className={({isActive}) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src="/cart-icon.svg" alt="Иконка корзины" />
						Корзина
					</NavLink>
					{items.reduce((acc, item) => (acc += item.count), 0)}
				</div>
				<Button className={styles['exit']} onClick={logOut}>
					<img src="/exit-icon.svg" alt="Иконка выйти" />
					Выйти
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}
