import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/category/{-$category}")({
  component: RouteComponent,
});

function RouteComponent() {
  const { category } = Route.useParams();

  return <div>{category ? `Posts in ${category}` : `All Posts`}</div>;
}
