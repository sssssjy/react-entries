import React from "react";
import styles from './index.module.scss'

const SubMenu = () => {
  return <div className={styles.subMenuCon}>
    <div>SubMenu Title</div>
    <div className='subMenu'>
      <div className={'text'}>sub-menu-items</div>
    </div>
    <div className={styles.subMenu}>
      <div className={styles.text}>sub-menu-items</div>
    </div>
    <div className={styles.subMenuBottom}>
      <div className={styles.text}>sub menu bottom text</div>
    </div>
  </div>
};

export default SubMenu
