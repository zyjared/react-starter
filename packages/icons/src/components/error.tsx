import type { SVGProps } from "react";

/**
 * **ErrorIcon** &nbsp;&nbsp; `lucide:circle-x`
 *
 * ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48c3R5bGU+OnJvb3R7Y29sb3I6IzExMX1AbWVkaWEocHJlZmVycy1jb2xvci1zY2hlbWU6ZGFyayl7OnJvb3R7Y29sb3I6I2VlZX19PC9zdHlsZT48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0ibTE1IDlsLTYgNm0wLTZsNiA2Ii8+PC9nPjwvc3ZnPg==)
 *
 * @see https://icones.js.org/collection/lucide?icon=lucide:circle-x
 */
export function ErrorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9l-6 6m0-6l6 6" />
      </g>
    </svg>
  );
}
export default ErrorIcon;
