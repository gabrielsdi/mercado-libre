//Dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//Assets
import './css/Header.scss';

class Header extends Component {

	placeHolder = "Nunca dejes de buscar";
	
	constructor(props) {
		super(props);
		this.state = {
			query: "",		
		}

		this.handleQueryChange = this.handleQueryChange.bind(this);		
	}
	
	handleQueryChange(e) {
		if (e.target.id === 'search-bar') {
			this.setState({
				query: (e.target.value)
			})
		}
	}

	handleOnClick = () => {
		var url = '/items?search=' + this.state.query;
		this.props.history.push(url);			
	  }
	 

	render() {		
		return (
			<div>
				<nav className="navbar navbar-light bg-yellow">
					<i className="navbar-brand nav-logo"></i>
					<form className="form-inline">
						<div className="input-group">
							<input className="form-control mr-sm-2 search-bar" type="query" id="search-bar" placeholder={this.placeHolder} aria-label="Search" value={this.state.query} onChange={this.handleQueryChange}></input>
							<div className="input-group-append">								
									<button className="btn btn nav-search-button" type="button" onClick={() => this.handleOnClick()}><i className="fas fa-search"></i></button>								
							</div>
						</div>
					</form>
				</nav>
			</div>
		);
	}
}

export default withRouter(Header);
