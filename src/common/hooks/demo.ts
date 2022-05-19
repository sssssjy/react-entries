/**
 * 代数效应举例
 */
import {useEffect, useState} from "react";

function getTotalNum(id1, id2) {
    const num1 = getNum(id1);
    const num2 = getNum(id2);
    return num1 + num2
}

//在实际中经常需要发起后端请求
//即 在实际中经常为异步函数
function getNum(id) {
    return id;
}

/**
 * 使用async await
 * async await具有传染性
 * 但改变了function的性质 该函数也变成了一个异步函数
 */
async function getTotalNum1(id1, id2) {
    const num1 = await getNum(id1);
    const num2 = await getNum(id2);
    return num1 + num2
}

/**
 * 伪代码
 * 虚构语法 try - handle - perform - resume with
 *
 * try {
 *     getTotalNum(1, 2);
 * } handle(id) {
 *
 *     switch (id) {
 *         case 1:
 *             resume with 1;
 *         case 2:
 *             resume with 2;
 *         case 3:
 *             fetch('http://localhost:8080').then(res => res.json().then(({num}) => {
 *                 resume with 4;
 *             }))
 *         default:
 *             resume with 3;
 *     }
 * }
 *
 * function getNum1(id) {
 *     const num = perforn id;
 *     return num;
 * }
 */

//hooks 写法
function TotalCommentNum({id1, id2}) {
    const num1 = useCommentNum(id1);
    const num2 = useCommentNum(id2);
    return num1 + num2
}

function useCommentNum(id) {
    const [num, updateNum] = useState(0);
    useEffect(() => {
        fetch('http://localhost:8080').then(res => res.json().then(({num}) => updateNum(num)));
    }, [id]);

    return num;
}
