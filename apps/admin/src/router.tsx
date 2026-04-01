import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    queryClient,
    user: {
      id: "123",
      name: "Jiang",
    },
  },
});
