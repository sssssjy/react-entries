import {ReactElement} from "react";

export interface routeProps {
    name: string
    path: string
    elementPath?: string
    component?: () => ReactElement
}

export type routeItemProps = Pick<routeProps, 'name' | 'path' | 'elementPath'>

const routes = [{
    name: 'css主页',
    path: '/cssHome',
    children: [{
        name: 'css filter',
        path: '/cssHome/cssFilter'
    },{
        name: 'css test',
        path: '/cssHome/cssTest'
    },{
        name: 'css charge',
        path: '/cssHome/cssCharge'
    },{
        name: 'css cssBackFilter',
        path: '/cssHome/cssBackFilter'
    },{
        name: 'css cyberpunk',
        path: '/cssHome/cyberpunk'
    },{
        name: 'css groundGlass',
        path: '/cssHome/groundGlass'
    },{
        name: 'css shadow',
        path: '/cssHome/shadow'
    },{
        name: 'css rotate',
        path: '/cssHome/rotate'
    },{
        name: 'css translate3d',
        path: '/cssHome/translate3d'
    },{
        name: 'css counterIncrement',
        path: '/cssHome/counterIncrement'
    },{
        name: 'css mask',
        path: '/cssHome/mask'
    },{
        name: 'css mixblendmode',
        path: '/cssHome/mixblendmode'
    },{
        name: 'css border',
        path: '/cssHome/border'
    },{
        name: 'css cssProperty',
        path: '/cssHome/cssProperty'
    },{
        name: 'css button',
        path: '/cssHome/button'
    },{
        name: 'css css3D',
        path: '/cssHome/css3D'
    },{
        name: 'css cssProgress',
        path: '/cssHome/cssProgress'
    },{
        name: 'css backUnderline',
        path: '/cssHome/backUnderline'
    },{
        name: 'css cssEffects',
        path: '/cssHome/cssEffects'
    },{
        name: 'css oneDiv',
        path: '/cssHome/oneDiv'
    },{
        name: 'css svg',
        path: '/cssHome/svg'
    },{
        name: 'css switch',
        path: '/cssHome/switch'
    }]
},{
    name: 'markdown test',
    path: '/markdown'
}] as Array<routeItemProps>

export default routes
