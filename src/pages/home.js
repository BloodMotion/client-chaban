import React, {Component} from 'react';
import List from './../components/list';
import Search from "../components/search";
import {ProgressBar} from 'react-materialize';
import axios from 'axios';
import moment from 'moment';

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
        return this.API();
    }

    API = function(date) {
        let urlEndPoint = 'http://localhost:1337';
        if(date) {urlEndPoint = 'http://localhost:1337/?from=' + date}

        // Get data from API with Axios
        axios.get(urlEndPoint)
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
    };

    dateChange = (elem) => {
        let date = moment(elem.target.value).format('DD-MM-YYYY');

        // Api call
        this.API(date);
    };

    render() {
        const {
            data,
            err,
        } = this.state;

        let res = !data ? (
            err ? (<div>
                    <div className="center"><a className="btn btn-floating btn-large"><i
                        className="material-icons">cloud</i></a>
                        <pre className="warn">{err.message}</pre>
                    </div>
                </div>)
                : (<ProgressBar/>)
        ) : (
            <div>
                <div className="row">
                    <div className="col s8 offset-s2 center">
                        <Search onInputChange={this.dateChange}/>
                    </div>

                </div>
                <List data={data}/>
            </div>
        );

        return (
            <div>
                <h2 className="center">HomePage</h2>
                {res}
            </div>
        );
    }
}

export default HomePage;
