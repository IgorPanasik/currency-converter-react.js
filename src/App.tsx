import { Header } from './components/Header.js';
import { Main } from './components/Main.js';
import './style.css';

function App() {
	return (
		<div className='container w-full flex flex-col justify-center items-center gap-[25px] bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 shadow-2xl'>
			<Header />
			<Main />
		</div>
	);
}

export default App;
