"use client"

import SwaggerUI from "swagger-ui-react"

import "swagger-ui-react/swagger-ui.css"
import {useEffect} from "react";
import {useTheme} from "next-themes";

type Props = {
    spec: Record<string, any>
}

function ReactSwagger({ spec }: Props) {
    return <SwaggerUI spec={spec} />
}

export default ReactSwagger;
