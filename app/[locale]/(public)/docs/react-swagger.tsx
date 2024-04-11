"use client";


import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { notFound } from "next/navigation";

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

type Props = {
  spec: object;
};

function ReactSwagger({ spec }: Props) {
  if (process.env.NODE_ENV === "production") return notFound();
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
