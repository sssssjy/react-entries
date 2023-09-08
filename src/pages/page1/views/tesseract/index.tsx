import Tesseract from 'tesseract.js';
import {useEffect} from "react";
export default () => {

    useEffect(() => {
        Tesseract.recognize(
            'https://img9.doubanio.com/view/photo/l/public/p2895871904.webp',
            'eng+chi_sim',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log(text);
        })
    }, []);


    return <div>1</div>
}
