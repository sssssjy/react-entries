// /*-选项卡
//   |
//   -组
//    |
//    -属性*/
// return [
//     { // 选项卡
//         id: 'general',
//         groups: [] // 组
//     },
//     { // 选项卡
//         id: 'authority',
//         groups: [
//             { // 组
//                 id: 'edit-authority', // 组id
//                 entries: [
//                     { // 单个props
//                         id: 'title',
//                         description : '权限的标题',
//                         label : '标题',
//                         modelProperty : 'title'
//                     }
//                 ]
//             }
//         ]
//     }
// ]

import inherits from 'inherits';
// 引入自带的PropertiesActivator,  因为我们要用到它来处理eventBus
// import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';
//
// export default function AuthorityPropertiesProvider(
//     eventBus, bpmnFactory, canvas, // 这里是要用到什么就引入什么
//     elementRegistry, translate
// ) {
//     PropertiesActivator.call(this, eventBus);
//
//     this.getTabs = function (element) {
//         var generalTab = {};
//         var authorityTab = {};
//         return [
//             generalTab,
//             authorityTab
//         ];
//     }
// }
//
// inherits(AuthorityPropertiesProvider, PropertiesActivator);

