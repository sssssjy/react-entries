import BundledEditor from './bundledEditor'
import {useRef} from 'react'
export default () => {
    const editorRef = useRef(null) as any;
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <BundledEditor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue='<p>This is the initial content of the editor.</p>'
                init={{
                    height: 500,
                    plugins: [
                        'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                        'searchreplace', 'table', 'wordcount', 'template'
                    ],
                    toolbar: 'undo redo | styles | bold italic | table template',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    menubar: false,
                    // menubar: 'file edit insert view format table tools help'
                    menu:{
                        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                        view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                        insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                        table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                        help: { title: 'Help', items: 'help' }
                    },
                    templates: [
                        {
                            title: '选择替换',
                            description: 'This is my template.',
                            content: '<p>Hello, <span class="selcontent">this statement will be replaced.</span></p>'
                        }
                    ]
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}
