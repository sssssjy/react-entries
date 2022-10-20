##svg 滤镜
### 语法

```jsx
//所有svg都包含在defs标签内
<defs>
    {/*filter定义一个svg滤镜*/}
    {/*需要一个id 标记filter*/}
    <filter id={'blur'}>
        {/*模糊滤镜*/}
        {/*in 模糊效果作用源*/}
        {/*SourceGraphic 模糊效果作用于整个图片*/}
        {/*stdDeviation 定义模糊程度*/}
        {/*可通过url引入该svg #blur*/}
        <feGaussianBlur in={'SourceGraphic'} stdDeviation={5} />
    </filter>
</defs>
```

滤镜类型

| 类型             |   描述    |
|----------------|:-------:|
| feGaussianBlur |  模糊滤镜   |
| feOffset       |  位移滤镜   |
| feMerge        | 多滤镜叠加滤镜 |
| feMorphology   |  形态滤镜   |


svg标签 通用属性  

| 属性            |                    作用                    |
|---------------|:----------------------------------------:|
| x,y           |      提供左上角的坐标来定义在哪里渲染滤镜效果。 （默认值：0）       |
| width, height |          绘制滤镜容器框的高宽（默认都为 100%）           |
| result        |   用于定义一个滤镜效果的输出名字，以便将其用作另一个滤镜效果的输入（in）   |
| in            | 指定滤镜效果的输入源，可以是某个滤镜导出的 result，也可以是下面 6 个值 |

filter in: 模糊效果作用源  
后4个基本用不上

| 属性              |                 作用                  |
|-----------------|:-----------------------------------:|
| SourceGraphic   |                整个图片                 |
| SourceAlpha     |         整个图片，rgba只取a，rgb失效          |
| FillPaint       |               图像的填充颜色               |
| StrokePaint     |               图像的描边颜色               |
| BackgroundImage | 与 SourceGraphic 类似，但可在背景上使用。 需要显式设置 |
| BackgroundAlpha |  与 SourceAlpha 类似，但可在背景上使用。 需要显式设置  |

####多个svg滤镜

默认连续使用上个滤镜的结果  
feGaussianBlur 默认 in 为 SourceGraphic
```jsx
<defs>
    <filter id={'filter1'}>
        <feGaussianBlur in={'SourceAlpha'} stdDeviation={5} result={'blur'} />
        <feOffset in={'blur'} dx={10} dy={10} result={'offsetBlur'}/>
        
        {/*将上述滤镜与原图合在一起*/}
        <feMerge>
            <feMergeNode in={'offsetBlur'} />
            <feMergeNode in={'SourceGraphic'} />
        </feMerge>
    </filter>
</defs>
```
```css
div {
    width: 200px;
    height: 200px;
    background: url(xxx);
    filter: url(#filter1);
}
```
###feMorphology 形态滤镜
radius 默认0 滤镜效果程度  
operate 默认erode

| 属性值    | 应用场景 |        描述         |
|--------|------|:-----------------:|
| erode  | 文字   |       腐蚀效果        |
|        | 图片   |  每个像素往更暗更透明方向变化   |
| dilate | 文字   |       扩张模式        |
|        | 图片   |  每个像素往更亮更不透明方向变化  |

###feTurbulence 纹理滤镜 ❤

######type

| 属性值          |       描述       |
|--------------|:--------------:|
| fractalNoise | 分形噪声，更平滑，更接近云雾 |
| turbulence   |      湍流噪声      |

######baseFrequency
噪声函数的基本频率  
频率越小，产生的图形越大  
频率越大，产生的图形越复杂越小越精细  
通常范围：0.02 ~ 0.2  可传入2个值表示x,y方向

######numOctaves
噪声函数的精细度  
数值越高，产生的噪声越精细，默认1  

###feDisplacementMap 映射置换滤镜
改变元素和图形的像素位置  
遍历原图形所有像素点 重新映射到新位置 形成新图形  

######scale
图像扭曲程度 值越大 越扭曲
