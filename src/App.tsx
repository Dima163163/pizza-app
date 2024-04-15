import Button from './components/Button/Button';
import Input from './components/Input/Input';
import {Link} from 'react-router-dom';

function App() {
	return (
		<>
			<Button>Кнопка</Button>
			<Button appearence="big">Кнопка</Button>
			<Input placeholder="Email" />
		</>
	);
}

export default App;
