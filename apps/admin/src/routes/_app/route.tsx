import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <Link
          to="/posts/category/{-$category}"
          params={{ category: "react" }}
          activeProps={{
            className: "font-bold",
          }}
        >
          Posts
        </Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
