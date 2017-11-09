import React, {Component} from 'react';
import {ProgressBar} from 'react-materialize';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SinglePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            err: null,
        }
    }

    componentDidMount() {
        // Router params
        console.log('Route parameters : ', this.props.match);

        // Get data from API with Axios
        axios.get('http://localhost:1337/' + this.props.match.params.id)
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
                    <div className="center"><a className="btn btn-floating btn-large"><i className="material-icons">cloud</i></a>
                        <pre className="warn">{err.message}</pre>
                    </div>
                </div>)
                : (<ProgressBar/>)
        ) : (
            <div>
                <table className="highlight">
                    <thead><tr><th className="center">Informations</th></tr></thead>
                    <tbody>
                        <tr><td className="center">{data.reason} : Le {data.date} à partir de {data.start} jusqu'à {data.end}</td></tr>
                        <tr><td className="center"><a className="waves-effect waves-light btn" href={data.link}><i className="material-icons left">info_outline</i>En savoir plus</a></td></tr>
                    </tbody>
                </table>
            </div>
        );

        return (
            <div>
                <h2 className="center">SinglePage</h2>
                <Link className="center back" to={'/'}><i className="material-icons">keyboard_arrow_left</i>Accueil</Link>
                {res}
            </div>
        );
    }
}

export default SinglePage;
