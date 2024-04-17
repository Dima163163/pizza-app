import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, defer, RouterProvider} from 'react-router-dom';
import {Cart} from './pages/Cart/Cart.tsx';
import {Error as ErrorPage} from './pages/Error/Error.tsx';
import {Layout} from './layout/Layout/Layout.tsx';
import {ProductSingle} from './pages/Product/Product.tsx';
import axios from 'axios';
import {PREFIX} from './helpers/api.ts';
import {AuthLayout} from './layout/Auth/AuthLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import {RequireAuth} from './helpers/RequireAuth.tsx';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <ProductSingle />,
				errorElement: <>Ошибка</>,
				loader: async ({params}) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios
									.get(`${PREFIX}/products/${params.id}`)
									.then((data) => resolve(data))
									.catch((e) => reject(e));
							}, 2000);
						})
					});
					// return defer({
					// 	data: axios
					// 		.get(`${PREFIX}/products/${params.id}`)
					// 		.then((data) => data)
					// });
					// await new Promise<void>((resolve) => {
					// 	setTimeout(() => {
					// 		resolve();
					// 	}, 2000);
					// });
					// const {data} = await axios.get(`${PREFIX}/products/${params.id}`);
					// return data;
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
