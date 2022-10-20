import style from './index.module.scss'
import {MutableRefObject, useRef} from "react";
const img1 = require('@/pages/cssPage/images/back1.jpg');
const img3 = require('@/pages/cssPage/images/back3.JPG');
export default () => {

    const svgRef = useRef() as MutableRefObject<SVGFEDisplacementMapElement>;

    const onClick = () => {
        const startTime = Date.now();
        const duration = 1000;
        const target = 200;

        requestAnimationFrame(function aniMove() {
            const t = Math.min(1, (Date.now() - startTime) / duration);
            const nextTarget = target - (t * target) + 1;

            svgRef.current.setAttribute('scale', '' + nextTarget);

            if (t < 1.0) {
                requestAnimationFrame(aniMove);
            }
        });
    };

    /**
     * SourceGraphic 模糊效果要应用于整个图片
     * stdDeviation 模糊的程度
     */
    return <div className={style.svg}>
        <div className="blur-con">
            <div className="css-filter" />
            <div className="svg-filter" />
            <svg>
                <defs>
                    <filter id={'blur'}>
                        <feGaussianBlur in={'SourceGraphic'} stdDeviation={'5'} />
                    </filter>

                    <filter id={'lighten'}>
                        <feImage width={100} height={250} xlinkHref={img1} result={'img1'} />
                        <feImage width={100} height={250} xlinkHref={img3} result={'img2'} />
                        <feBlend mode="darken" in={'img1'} in2={'img3'} />
                    </filter>

                    <filter id={'erode-filter'}>
                        <feMorphology operator={'erode'} radius={0.5} />
                    </filter>
                    {/**
                         形态滤镜
                         作用于 文字：
                         operator dilate 扩张
                         erode 腐蚀 默认
                         radius 腐蚀/扩张 程度 默认0

                         作用于 图片：
                         operator dilate 更亮
                         erode 更暗
                     **/}
                    <filter id={'dilate-filter'}>
                        <feMorphology operator={'dilate'} radius={0.5} />
                    </filter>
                </defs>
            </svg>
        </div>

        <div className="lighten" />
        <div className="feSpecularLighting" />
        <div className="text">
            <div className="normal">normal</div>
            <div className="dilate">dilate</div>
            <div className="erode">erode</div>
        </div>
        <svg width={100} height={250} viewBox={'0 0 100 250'}>
            <filter id={'erode-img'}>
                <feMorphology radius={0}>
                    <animate attributeName={'radius'} from={0} to={5} dur={'5s'} repeatCount={'indefinite'} />
                </feMorphology>
            </filter>
            <image xlinkHref={img1} width={'90%'} height={'90%'} x={10} y={10} filter={'url(#erode-img)'} />
        </svg>
        <svg width={100} height={250} viewBox={'0 0 100 250'}>
            <filter id={'dilate-img'}>
                <feMorphology operator={'dilate'} radius={0}>
                    <animate attributeName={'radius'} from={0} to={5} dur={'5s'} repeatCount={'indefinite'} />
                </feMorphology>
            </filter>
            <image xlinkHref={img1} width={'90%'} height={'90%'} x={10} y={10} filter={'url(#dilate-img)'} />
        </svg>

        <svg width={100} height={100} viewBox={'0 0 100 100'}>
            <filter id={'fractalNoise'}>
                <feTurbulence type={'fractalNoise'} baseFrequency={0.1} numOctaves={2} />
            </filter>
            <filter id={'turbulence'}>
                <feTurbulence type={'turbulence'} baseFrequency={0.1} numOctaves={2} />
            </filter>
            <filter id={'turbulence-text'} filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type={'fractalNoise'} baseFrequency={0.02} />
                {/**
                    feDisplacementMap 映射置换滤镜
                    改变元素和图形的像素位置
                    遍历原图形所有像素点 重新映射到新位置 形成新图形

                    使用feTurbulence滤镜产生噪声图形
                    feDisplacementMap 根据feTurbulence产生的图形进行形变、移位 得到最终效果
                 **/}
                <feDisplacementMap in={'SourceGraphic'} scale={50} />
            </filter>

            {/*褶皱纸张纹理*/}
            <filter id={'paper'}>
                <feTurbulence type={'fractalNoise'} baseFrequency={0.04} numOctaves={5} />
                <feDiffuseLighting lightingColor='#fff' surfaceScale='2'>
                    <feDistantLight azimuth='45' elevation='60' />
                </feDiffuseLighting>
            </filter>

            {/*按钮hover效果*/}
            <filter id={'button-1'}>
                <feTurbulence type={'fractalNoise'} baseFrequency={'0.000001 9.999999'}>
                    <animate
                        attributeName={'baseFrequency'}
                        from={'0.000001 9.999999'}
                        to={'0.000001 0.0001'}
                        repeatCount={'indefinite'}
                        dur={'2s'}
                    />
                </feTurbulence>
                <feOffset dx={-90} dy={-90} result={'offset'} />
                <feDisplacementMap in={'SourceGraphic'} in2={'offset'} xChannelSelector="R" yChannelSelector="G" scale="30" />
            </filter>
            <filter id={'button-2'}>
                <feTurbulence type={'fractalNoise'} baseFrequency={'9.999999 0.000001'}>
                    <animate
                        attributeName={'baseFrequency'}
                        from={'9.999999 0.000001'}
                        to={'0.0001 0.000001'}
                        repeatCount={'indefinite'}
                        dur={'2s'}
                    />
                </feTurbulence>
                <feOffset dx={-90} dy={-90} result={'offset'} />
                <feDisplacementMap in={'SourceGraphic'} in2={'offset'} xChannelSelector="R" yChannelSelector="G" scale="30" />
            </filter>
        </svg>
        <div className="fractalNoise" />
        <div className="turbulence" />
        <div className="turbulence-text">CSS SVG</div>
        <div className="paper" />
        <div className="button-con">
            <div className="button">button</div>
            <div className="button">button</div>
        </div>

        <h4>不规则形状 边框</h4>
        <div className="border">
            <div className="box type1" />
            <div className="box type2" />
            <div className="box type3" />
            <div className="box type4" />
            <div className="box type5" />
        </div>
        <svg width="0" height="0">
            <filter id={'border-svgFilter'}>
                <feMorphology in={'SourceAlpha'} operator={'dilate'}  radius="1" result={'dilate'}/>
                <feMerge>
                    <feMergeNode in={'dilate'} />
                    <feMergeNode in={'SourceGraphic'} />
                </feMerge>
            </filter>
        </svg>

        <h4>表情包</h4>
        <div className="back-img" />
        <div className="ani-back-img" />
        <svg width={0} height={0}>
            <filter id={'img-svgFilter'} filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type={'fractalNoise'} baseFrequency={0.03}>
                    <animate
                        attributeName={'baseFrequency'}
                        from="0.1 0.1"
                        to="0.08 0.01"
                        dur="3.5s"
                        repeatCount={'indefinite'}
                    />
                </feTurbulence>
                <feDisplacementMap in={'SourceGraphic'} scale={15} />
            </filter>

            <filter id={'ani-back-img'} filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
                <feTurbulence
                    type={'fractalNoise'}
                    baseFrequency={0.0995}
                    numOctaves="10"
                    seed="1"
                    stitchTiles="noStitch"
                    result={'img'}
                />
                <feDisplacementMap
                    scale={600}
                    in={'SourceGraphic'}
                    in2={'img'}
                    xChannelSelector="R"
                    yChannelSelector="G"
                >
                    <animate attributeName={'scale'} values="600;0;0" keyTimes="0;0.75;1" begin="0s" dur="2s" repeatCount={'indefinite'} />
                </feDisplacementMap>
            </filter>
        </svg>

        <h4>点击按钮</h4>
        <div className="click-btn" onClick={onClick}>BUTTON</div>
        <svg width={0} height={0}>
            <filter id={'click-btn'}>
                <feTurbulence type={'fractalNoise'} baseFrequency={0.05} result={'img'} />
                <feDisplacementMap ref={svgRef} in={'SourceGraphic'} in2={'img'} scale={200} />
            </filter>
        </svg>

        <h4>马赛克</h4>
        <svg width={0} height={0}>
            <filter id="pixelate" x="0" y="0">
                <feFlood x="4" y="4" height="2" width="2"/>
                <feComposite width="8" height="8"/>
                <feTile result="a"/>
                <feComposite in="SourceGraphic" in2="a" operator="in"/>
                <feMorphology operator="dilate"radius="5"/>
            </filter>
        </svg>
        <img width={100} className={'pixelate-img'} src={img1} />
    </div>
}
