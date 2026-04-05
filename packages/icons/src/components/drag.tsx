import type { SVGProps } from "react";

/**
 * **DragIcon** &nbsp;&nbsp; `lucide:grip-vertical`
 *
 * ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48c3R5bGU+OnJvb3R7Y29sb3I6IzExMX1AbWVkaWEocHJlZmVycy1jb2xvci1zY2hlbWU6ZGFyayl7OnJvb3R7Y29sb3I6I2VlZX19PC9zdHlsZT48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjkiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjkiIGN5PSI1IiByPSIxIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjE5IiByPSIxIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iNSIgcj0iMSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTkiIHI9IjEiLz48L2c+PC9zdmc+)
 *
 * @see https://icones.js.org/collection/lucide?icon=lucide:grip-vertical
 */
export function DragIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="19" r="1" />
      </g>
    </svg>
  );
}
export default DragIcon;
