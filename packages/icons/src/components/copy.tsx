import type { SVGProps } from "react";

/**
 * **CopyIcon** &nbsp;&nbsp; `lucide:copy`
 *
 * ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48c3R5bGU+OnJvb3R7Y29sb3I6IzExMX1AbWVkaWEocHJlZmVycy1jb2xvci1zY2hlbWU6ZGFyayl7OnJvb3R7Y29sb3I6I2VlZX19PC9zdHlsZT48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxyZWN0IHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgeD0iOCIgeT0iOCIgcng9IjIiIHJ5PSIyIi8+PHBhdGggZD0iTTQgMTZjLTEuMSAwLTItLjktMi0yVjRjMC0xLjEuOS0yIDItMmgxMGMxLjEgMCAyIC45IDIgMiIvPjwvZz48L3N2Zz4=)
 *
 * @see https://icones.js.org/collection/lucide?icon=lucide:copy
 */
export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </g>
    </svg>
  );
}
export default CopyIcon;
