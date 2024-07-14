import TodoList from './features/todo/TodoList';

export default function Home() {
	return (
		<div>
			<h1 className='text-6xl font-bold mb-[20px]'>Todo App</h1>
			<TodoList />
		</div>
	);
}
