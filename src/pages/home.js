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
        }
    }

    componentDidMount() {

        // Get data from API with Axios
        let self = this;
        axios.get('http://localhost:1337')
            .then(function (response) {
                console.log(response.data);
                self.setState({
                    data: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {

        const {data} = this.state;

        return (
            <div>

                <h2> HomePage </h2>


                {!data ? (
                    <ProgressBar/>
                ) : (
                    <div>
                        <List data={data}/>
                    </div>
                )}
            </div>
        );
    }

}

export default HomePage;
