import type { SVGProps } from "react";

/**
 * **LoadingIcon** &nbsp;&nbsp; `lucide:loader`
 *
 * ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48c3R5bGU+OnJvb3R7Y29sb3I6IzExMX1AbWVkaWEocHJlZmVycy1jb2xvci1zY2hlbWU6ZGFyayl7OnJvb3R7Y29sb3I6I2VlZX19PC9zdHlsZT48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xMiAydjRtNC4yIDEuOGwyLjktMi45TTE4IDEyaDRtLTUuOCA0LjJsMi45IDIuOU0xMiAxOHY0bS03LjEtMi45bDIuOS0yLjlNMiAxMmg0TTQuOSA0LjlsMi45IDIuOSIvPjwvc3ZnPg==)
 *
 * @see https://icones.js.org/collection/lucide?icon=lucide:loader
 */
export function LoadingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9"
      />
    </svg>
  );
}
export default LoadingIcon;
