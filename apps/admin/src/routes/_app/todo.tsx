import { createFileRoute } from "@tanstack/react-router";

const fetchTodosByUserId = async ({ userId }: { userId?: string }) => {
  const response = await fetch(`/api/todos?userId=${userId}`);
  const data = await response.json();
  return data;
};

export const Route = createFileRoute("/_app/todo")({
  component: RouteComponent,
  loader: ({ context }) => fetchTodosByUserId({ userId: context.user?.id }),
});

function RouteComponent() {
  return <div>Hello "/todo"!</div>;
}
