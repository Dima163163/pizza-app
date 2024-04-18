import {Await, useLoaderData} from 'react-router-dom';
import {Product} from '../../interfaces/product.interface';
import {Suspense} from 'react';
import ProductBlock from '../../components/ProductSingle/ProductBlock';

export function ProductSingle() {
	const data = useLoaderData() as {data: Product};
	return (
		<>
			<Suspense fallback={'Загружаю...'}>
				<Await resolve={data.data}>
					{({data}: {data: Product}) => <ProductBlock {...data} />}
				</Await>
			</Suspense>
		</>
	);
}
