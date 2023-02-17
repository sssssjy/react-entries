// custom/index.js
import CustomPalette from './palette'
import CustomContextPad from './contextPad'

export default {
    __init__: ['customPalette','customContextPad'],
    customPalette: ['type', CustomPalette],
    customContextPad: ['type', CustomContextPad],
}
