import BpmnModeler from 'bpmn-js/lib/Modeler'
import {MutableRefObject, useEffect, useRef, useState} from "react";
// 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

import 'bpmn-js-properties-panel/dist/assets/element-templates.css'
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'

import style from './index.module.scss'
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';
import CustomModeler from './customModeler'
import custom from './custom'

import xml from './xml/demo'

export default () => {
    const diagramRef = useRef() as MutableRefObject<HTMLDivElement>;
    const propertyRef = useRef() as MutableRefObject<HTMLDivElement>;
    const url = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

    useEffect(() => {
        // fetch('./xml/demo.ts').then(showDiagram);
        showDiagram(xml)
    }, []);

    const showDiagram = diagramXML => {
        const camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');
        // const view = new CustomModeler({
        const view = new BpmnModeler({
            container: diagramRef.current,
            // container: '#diagram',
            keyboard: {
                bindTo: window
            },
            propertiesPanel: {
                // parent: '#properties',
                parent: propertyRef.current,
            },
            additionalModules: [
                BpmnPropertiesPanelModule,
                BpmnPropertiesProviderModule,
                // custom,
            ],
            moddleExtensions:{
                camunda: camundaModdleDescriptor
            }
        });
        view.importXML(diagramXML).then(() => {
           console.log('import success');
            // access modeler components
            const canvas = view.get('canvas');
            const overlays = view.get('overlays');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');

            // attach an overlay to a node
            overlays.add('SCAN_OK', 'note', {
                position: {
                    bottom: 0,
                    right: 0
                },
                html: '<div class="diagram-note">Mixed up the labels?</div>'
            });

            view.on('commandStack.changed', saveDiagram);

            //bpmn properties
            initProperties(view);
            addModelerListener(view);
        });
        window.bpmn = view;
    };

    const initProperties = (view) => {
        const elementRegistry = view.get('elementRegistry');
        // console.log(elementRegistry, 'elementRegistry')
        // const startEventElement = elementRegistry.get('StartEvent_1y45yut'),
        //     startEvent = startEventElement.businessObject;
        // console.log(startEvent.name) // 开始

        const modeling = view.get('modeling');
        const moddle = view.get('moddle');
        console.log(modeling, 'modeling')
        const newCondition = moddle.create('bpmn:FormalExpression', {
            body: '${ value > 100 }'
        });
        const sequenceFlowElement = elementRegistry.get('sid-337A23B9-A923-4CCE-B613-3E247B773CCE')
        modeling.updateProperties(sequenceFlowElement, {
            conditionExpression: newCondition
        });
    };

    const addModelerListener = view => {
        const eventBus = view.get('eventBus');
        const modeling = view.get('modeling');
        const elementRegistry = view.get('elementRegistry');
        const eventTypes = ['element.click', 'element.changed'];
        eventTypes.forEach(eventType => {
            eventBus.on(eventType, e => {
                if (!e || !e.element) {
                    console.log('无效的e', e);
                    return
                }
                if (eventType === 'element.click') {
                    console.log('点击了', e);
                    const shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
                    if (shape.type === 'bpmn:Task') {
                        modeling.updateProperties(shape, {name: '我是修改后的Task名称'})
                    }
                }
            })
        })
    }

    const saveDiagram = () => {
        // 把传入的done再传给bpmn原型的saveXML函数调用
        window.bpmn.saveXML().then(res => {
            console.log(res)
        })
    };

    return <div className={style.bpmn}>
        <div className={'containers'}>
            <div className={'canvas'} id="diagram" ref={diagramRef} />
            <div className={'panel'} id="properties" ref={propertyRef} />
        </div>
    </div>
}
