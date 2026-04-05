import type { SVGProps } from "react";

/**
 * **CalendarIcon** &nbsp;&nbsp; `lucide:calendar`
 *
 * ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48c3R5bGU+OnJvb3R7Y29sb3I6IzExMX1AbWVkaWEocHJlZmVycy1jb2xvci1zY2hlbWU6ZGFyayl7OnJvb3R7Y29sb3I6I2VlZX19PC9zdHlsZT48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik04IDJ2NG04LTR2NCIvPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iNCIgcng9IjIiLz48cGF0aCBkPSJNMyAxMGgxOCIvPjwvZz48L3N2Zz4=)
 *
 * @see https://icones.js.org/collection/lucide?icon=lucide:calendar
 */
export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M8 2v4m8-4v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </g>
    </svg>
  );
}
export default CalendarIcon;
