import {useState, useLayoutEffect} from "react";

function App() {
    const [num, setNum] = useState(1);

    useLayoutEffect(() => {
        if (num === 2) { // @ts-ignore
            setNum(num + 'layout')
        }
    }, [num]);

    return (
        <div className="App">
            <header className="App-header">
                <p onClick={() => setNum(num + 1)}>
                    <code title={'' + num}>{num}</code>
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
