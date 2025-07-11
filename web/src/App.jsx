import QueryProvider from './api/QueryProvider.jsx';
import { useQuery, api } from './api/api.js';
import Modal from './kit/Modal.jsx';
import Button from './kit/Button.jsx';
import TextInput from './kit/TextInput.jsx';
import SwitchInput from './kit/SwitchInput.jsx';

function TodoList() {
  const Todos = useQuery({
    queryKey: ['todosList'],
    queryFn: () => {
      return api(`#graphql
        query ToDos {
          todos { id, text }
        }`,
      );
    },
    select: data => data?.todos ?? [],
  });

  return Todos.data?.map((todo) => (
    <p key={todo.id}>{todo.text}</p>
  ));
}

function CreateTodo() {
  return (
    <>
      <div className="text-right">
        <Button
          type="button"
          // TODO 1: open the modal with this button using imperative methods
          onClick={() => console.log('open modal')}
        >
          Add Task
        </Button>
      </div>

      <Modal>
        <h3 className="text-base font-semibold text-gray-900 mb-6">
          New Task
        </h3>
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            console.log(formData.get('text'));
            // TODO 2: make this return true/false without passing additional properties to @headlessui/react/Switch
            console.log(formData.get('isComplete'));

            // TODO 3: update the api with a createTodo method
            // TODO 4: using react query, store this data in the server
          }}
        >
          <TextInput
            id="text"
            name="text"
            placeholder="Run a marathon"
            label="Task"
          />
          <SwitchInput
            id="isComplete"
            name="isComplete"
          />
          <Button type="submit">
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
        <h1 className="text-3xl font-bold">
          ToDos
        </h1>

        <CreateTodo />
        <TodoList />
      </div>
    </QueryProvider>
  )
}
