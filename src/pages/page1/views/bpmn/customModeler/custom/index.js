// custom/index.js
import CustomPalette from './palette'
import CustomContextPad from './contextPad'

export default {
    __init__: ['paletteProvider', 'contextPadProvider'],
    paletteProvider: ['type', CustomPalette],
    contextPadProvider: ['type', CustomContextPad],
}
