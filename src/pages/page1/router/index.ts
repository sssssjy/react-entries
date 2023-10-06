import {ReactElement} from "react";

export interface routeProps {
    name: string
    path: string
    elementPath?: string
    component?: () => ReactElement
}

export type routeItemProps = Pick<routeProps, 'name' | 'path' | 'elementPath'>

const routes = [
  {
    name: "bpmn",
    path: "/bpmn",
  },
  {
    name: "dotCanvas",
    path: "/dotCanvas",
  },
] as Array<routeItemProps>;

export default routes
