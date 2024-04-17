import {ChangeEvent, useEffect, useState} from 'react';
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
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);

			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
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

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search
					placeholder="Введите блюдо или состав"
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <h1>{error}</h1>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <h1>Загрузка....</h1>}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
			</div>
		</>
	);
}

export default Menu;
