import styles from './ProductBlock.module.css';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {cartActions} from '../../store/cart.slice';
import {MouseEvent} from 'react';
import Button from '../Button/Button';
import {Product} from '../../interfaces/product.interface';
import Headling from '../Headling/Headling';
import {useNavigate} from 'react-router-dom';

const ProductBlock = (props: Product) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};

	const backToMenu = () => {
		navigate(-1);
	};
	return (
		<div className={styles['card']}>
			<div className={styles['top']}>
				<div className={styles['left']}>
					<button className={styles['back-btn']} onClick={backToMenu}>
						<img src="/back.svg" alt="Назад" />
					</button>
					<Headling>{props.name}</Headling>
				</div>
				<Button className={styles['cart']} onClick={add}>
					<img src="/cart-white.svg" alt="Иконка корзины белая" />В корзину
				</Button>
			</div>

			<div className={styles['content-wrapper']}>
				<div
					className={styles['image']}
					style={{backgroundImage: `url('${props.image}')`}}
				></div>
				<div className={styles['content']}>
					<div className={styles['line']}>
						<div className={styles['text']}>Итог</div>
						<div className={styles['price']}>
							{props.price}&nbsp;
							<span>₽</span>
						</div>
					</div>
					<hr className={styles['hr']} />
					<div className={styles['line']}>
						<div className={styles['text']}>Рейтинг</div>
						<div className={styles['rating']}>
							{props.rating}&nbsp;
							<img src="/star-icon.svg" alt="Иконка рейтига" />
						</div>
					</div>
					<p className={styles['ingr']}>Состав:</p>
					<ul className={styles['list']}>
						{props.ingredients.map((ingr, i) => (
							<li className={styles['list-item']} key={i}>
								{ingr[0].toUpperCase() + ingr.slice(1).toLowerCase()}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProductBlock;
