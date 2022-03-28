import React from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

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