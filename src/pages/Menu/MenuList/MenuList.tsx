import ProductCard from '../../../components/ProductCard/ProductCard';
import {MenuListProps} from './MenuList.props';
import styles from './MenuList.module.css';

export const MenuList = ({products}: MenuListProps) => {
	return (
		<div className={styles.wrapper}>
			{products.map((product) => (
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
	);
};
