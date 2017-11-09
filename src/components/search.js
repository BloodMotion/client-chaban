import React, {Component} from 'react';
import {Input} from 'react-materialize';

class Search extends Component {
    handleChange = (e) => {
        this.props.onInputChange(e);
    };

    render() {
        return (
            <Input className="center" placeholder="Filter, eg: 23 November, 2017" type='date' onChange={this.handleChange}/>
        );
    }
}

export default Search;