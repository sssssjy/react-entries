### sass modules小结

今天学到了sass modules 的基础用法  

首先需要定义ts类型 防止ts报错  

#### index.d.ts
```
    declare module '*.scss' {
        const content: any;
        export default content;
    }
```

在页面中引入styles  
`
import styles from './index.module.scss'
`

推荐使用方式 最外层使用module 内部使用global
```scss
.subMenuCon{
  background-color: #f3f3f3;
  :global{
    .subMenu{
      background-color: #abcdef;
      .text{
        font-size: 18px;
        text-decoration: line-through;
      }
    }
  }
}
```

```jsx
<div className={styles.subMenuCon}>
    <div>SubMenu Title</div>
    <div className='subMenu'>
      <div className={'text'}>sub-menu-items</div>
    </div>
  </div>
```
