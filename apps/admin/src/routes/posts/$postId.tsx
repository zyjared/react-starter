import { createFileRoute } from "@tanstack/react-router";
import { fetchPost } from "../../posts";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
  loader: ({ params }) => fetchPost(params.postId),
});

function RouteComponent() {
  return <div>Hello "/posts/$postId"!</div>;
}
