import {useEffect, useState} from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import {PREFIX} from '../../helpers/api';
import {Product} from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, {AxiosError} from 'axios';
import {MenuList} from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);

			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
			setError('');
		} catch (err) {
			if (err instanceof AxiosError) {
				setError(err.message);
			}
			setIsLoading(false);
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
			<div>
				{error && <h1>{error}</h1>}
				{!isLoading && <MenuList products={products} />}
				{isLoading && <h1>Загрузка....</h1>}
			</div>
		</>
	);
}

export default Menu;
