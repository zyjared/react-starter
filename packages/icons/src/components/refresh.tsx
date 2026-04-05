import type { SVGProps } from "react";

/**
 * **RefreshIcon** &nbsp;&nbsp; `lucide:refresh-cw`
 *
 * ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48c3R5bGU+OnJvb3R7Y29sb3I6IzExMX1AbWVkaWEocHJlZmVycy1jb2xvci1zY2hlbWU6ZGFyayl7OnJvb3R7Y29sb3I6I2VlZX19PC9zdHlsZT48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0zIDEyYTkgOSAwIDAgMSA5LTlhOS43NSA5Ljc1IDAgMCAxIDYuNzQgMi43NEwyMSA4Ii8+PHBhdGggZD0iTTIxIDN2NWgtNW01IDRhOSA5IDAgMCAxLTkgOWE5Ljc1IDkuNzUgMCAwIDEtNi43NC0yLjc0TDMgMTYiLz48cGF0aCBkPSJNOCAxNkgzdjUiLz48L2c+PC9zdmc+)
 *
 * @see https://icones.js.org/collection/lucide?icon=lucide:refresh-cw
 */
export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </g>
    </svg>
  );
}
export default RefreshIcon;
