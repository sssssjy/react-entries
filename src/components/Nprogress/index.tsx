import React from "react";
import nprogress from "nprogress";
import "/node_modules/nprogress/nprogress.css";

export default class Nprogress extends React.Component {
    constructor(props) {
        super(props);
        nprogress.start();
    }

    componentDidMount() {
        nprogress.done();
    }

    render() {
        return <></>;
    }
}
