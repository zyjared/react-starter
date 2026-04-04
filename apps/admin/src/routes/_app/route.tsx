import { SaveIcon } from "@repo/icons";
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
            className: "font-bold text-indigo-500",
          }}
          activeOptions={{ exact: true }}
        >
          首页
        </Link>
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          关于
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
      <SaveIcon />
      <hr />
      <Outlet />
    </div>
  );
}
