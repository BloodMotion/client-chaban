import React, {Component} from 'react';
import List from './../components/list';
import {ProgressBar} from 'react-materialize';
import axios from 'axios';
import {Link} from 'react-router-dom'

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            err: null,
            tg: null,
        }
    }

    componentDidMount() {
        // Get data from API with Axios
        axios.get('http://localhost:1337')
            .then(response => {
                this.setState({
                    data: response.data
                });
            })
            .catch(error => {
                this.setState({
                    err: error
                });
            });
    }

    render() {
        const {
            data,
            err,
        } = this.state;

        let res = !data ? (
            err ? (<div>
                    <div className="center"><a className="btn btn-floating btn-large pulse"><i className="material-icons">cloud</i></a>
                        <pre className="warn">{err.message}</pre>
                    </div>
                </div>)
                : (<ProgressBar/>)
        ) : (<div><List data={data}/></div>);

        return (
            <div>

                <h2 className="center"> HomePage </h2>

                {res}

            </div>
        );
    }

}

export default HomePage;
