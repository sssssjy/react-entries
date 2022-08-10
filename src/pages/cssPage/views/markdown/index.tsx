import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import 'github-markdown-css';
import mdConfig from "@/pages/cssPage/utils/md.config";
import {useEffect, useState} from "react";
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.module.scss'

const MenuList = props => {
    const {menuList, setMd} = props;

    const onClick = menu => {
        if (!menu.md) return;
        setMd(menu.md);
    }

    return <div>
        {
            menuList.map(menu => <div key={menu.name} className={"menu-item " + (menu?.children?.length ? 'has-children' : '')}>
                <div onClick={() => onClick(menu)}>{menu.title}</div>
                {menu?.children?.length && <MenuList menuList={menu.children} setMd={setMd} />}
            </div>)
        }
    </div>
}

const MarkDown = () => {

    const [md, setMd] = useState('');
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        const menu = [] as any;
        const mdFiles = (require as any).context('./md/', true, /\.md$/);
        const filePaths = mdFiles.keys();

        filePaths.forEach(filePath => {
           const pathList = filePath.replace('./', '').split('/');
           console.log(pathList);
           let list = menu;
           let length = pathList.length;
           pathList.forEach((path, index) => {
               const temp = list.find(item => item.name === path);
               if (index !== length - 1) {
                   if (!temp) {
                       const result = {
                           name: path,
                           title: mdConfig[path] || path,
                           children: []
                       };
                       list.push(result);
                       list = result.children;
                   } else {
                       !temp.children && (temp.children = []);
                       list = temp.children;
                   }
               } else {
                   list.push({
                       name: path,
                       title: mdConfig[path] || path,
                       md: mdFiles(filePath).default
                   })
               }
           });
        });

        setMenuList(menu);
    }, []);

    return <div className={styles.mdPage}>
        <div>
            <MenuList menuList={menuList} setMd={setMd} />
        </div>
        <ReactMarkdown
            children={md}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className={'markdown-body'}
            components={{
                code({node, inline, className, children, ...props}) {
                    return <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        PreTag="div"
                        style={xonokai}
                        language={'javascript'}
                        {...props}
                    />
                }
            }}
        />
    </div>
}

export default MarkDown;
