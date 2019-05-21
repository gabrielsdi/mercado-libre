import React, { Component } from 'react';
import '../styles/SearchBar.scss';
import { createHashHistory } from 'history'


export const history = createHashHistory();

var query;

class SearchBar extends Component {

    query;
    description
    placeHolder = "Nunca dejes de buscar";

    handleQueryChange(e) {
        query = e.target.value;
    }

    navigateToResultPage = () => {
        if(query === undefined)
            query = "";

        this.props.history.push({ pathname: '/items', search: "?search=" + query });       
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-yellow">
                    <i className="navbar-brand nav-logo"></i>
                    <form className="form-inline">
                        <div className="input-group">
                            <input className="form-control mr-sm-2 search-bar" type="query" id="search-bar" placeholder={this.placeHolder} aria-label="Search" value={query} onChange={this.handleQueryChange}></input>
                            <div className="input-group-append">
                                <button className="btn btn nav-search-button" type="button" onClick={this.navigateToResultPage}><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                </nav>
            </div>
        );
    }


}

export default SearchBar;

