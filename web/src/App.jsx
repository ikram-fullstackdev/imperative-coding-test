import { useRef } from 'react'
import QueryProvider from './api/QueryProvider.jsx';
import { useQuery, api, queryClient } from './api/api.js';
import Modal from './kit/Modal.jsx';
import Button from './kit/Button.jsx';
import TextInput from './kit/TextInput.jsx';
import SwitchInput from './kit/SwitchInput.jsx';
import { useMutation } from '@tanstack/react-query';

function TodoList() {
  const Todos = useQuery({
    queryKey: ['todosList'],
    queryFn: () => {
      return api(`#graphql
        query ToDos {
          todos { id, text, isComplete }
        }`,
      );
    },
    select: data => data?.todos ?? [],
  });

  return Todos.data?.map((todo) => (
    <p key={todo.id}>{todo.text} {todo.isComplete ? '✅': '❌'}</p>
  ));
}

function CreateTodo() {
  const modalRef = useRef();

  const toggleModal = () => {
    modalRef.current?.toggle();
  }

  const mutation = useMutation({
    mutationFn: ({ text, isComplete }) => api(`#graphql
    mutation CreateTodo($text: String!, $isComplete: Boolean!) {
      createTodo(text: $text, isComplete: $isComplete) {
        id
        text
        isComplete
      }
    }
  `, { text, isComplete }),
    onSuccess: () => {
      queryClient.invalidateQueries(['todosList']);
      modalRef.current?.toggle();
    },
  });

  return (
    <>
      <div className="text-right">
        <Button
          type="button"
          onClick={toggleModal}
        >
          Add Task
        </Button>
      </div>

      <Modal ref={modalRef}  onClose={() => {}}>
        <h3 className="text-base font-semibold text-gray-900 mb-6">
          New Task
        </h3>
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            const text = formData.get('text');
            const isComplete = formData.get('isComplete') === 'true';

            mutation.mutate({ text, isComplete });
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
