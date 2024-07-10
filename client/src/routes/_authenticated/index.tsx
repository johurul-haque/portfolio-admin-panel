import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: () => <App />,
});

function App() {
  return <main className="container">Hello /</main>;
}
