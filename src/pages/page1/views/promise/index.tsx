import MyPromise from '../../utils/promise'
import React, {useEffect} from "react";

export default () => {
    useEffect(() => {

        // console.log(new MyPromise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(1)
        //     }, 1000);
        // }).then(res => {
        //     console.log(res, 'then');
        //     return 222;
        // }, err => {
        //     console.log(err, 'catch');
        // }));
        // return

        const promise = new MyPromise((resolve, reject) => {
            console.log(0)
            setTimeout(() => {
                resolve(1)
            },0);
        }).then(res => {
            console.log(res, 'then');
            return 222;
        }, err => {
            console.log(err, 'catch');
        }).then(res => {
            console.log(res, 'then2')
        })

        console.log(333);
    }, []);

    return <div>1</div>
}
