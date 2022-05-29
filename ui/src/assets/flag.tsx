import React from "react";
import { grey } from "@mui/material/colors";

interface FlagProps {
  crossed?: boolean;
}

export default function Flag({
  crossed = false,
}: FlagProps): React.ReactElement {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
    >
      <polygon fill="#CC4B4C" points="52,23.5 10,40 10,22 10,4 " />
      <path
        fill={grey[900]}
        d="M9,0C8.448,0,8,0.447,8,1v3v55c0,0.553,0.448,1,1,1s1-0.447,1-1V4V1C10,0.447,9.552,0,9,0z"
      />
      {crossed && (
        <g transform="scale(2.5)">
          <path
            fillRule="evenodd"
            d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
          />
        </g>
      )}
    </svg>
  );
}
