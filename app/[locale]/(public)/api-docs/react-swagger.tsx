"use client";


import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

type Props = {
  spec: object;
};

function ReactSwagger({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
