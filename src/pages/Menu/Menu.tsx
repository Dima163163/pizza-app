import {useEffect, useState} from 'react';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import {PREFIX} from '../../helpers/api';
import {Product} from '../../interfaces/product.interface';
import styles from './Menu.module.css';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const getMenu = async () => {
		try {
			const res = await fetch(`${PREFIX}/products`);
			if (!res.ok) {
				return;
			}
			const data = (await res.json()) as Product[];
			setProducts(data);
		} catch (error) {
			console.error(error);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" />
			</div>
			<div className={styles['products-list']}>
				{products.length &&
					products.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							title={product.name}
							description={
								product.ingredients.join(', ')[0].toUpperCase() +
								product.ingredients.join(', ').slice(1).toLowerCase()
							}
							rating={product.rating}
							price={product.price}
							image={product.image}
						/>
					))}
			</div>
		</>
	);
}
