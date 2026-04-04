import type { SVGProps } from "react";

export function SortIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
      />
    </svg>
  );
}
export default SortIcon;
