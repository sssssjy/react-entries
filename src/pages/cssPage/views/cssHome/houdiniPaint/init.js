const init = () => {
    if (CSS.paintWorklet) {
        CSS.paintWorklet.addModule('../../../../houdiniPaint/cssHoudini.js');//todo 路径不对 根目录为public
    }
}


export default init
