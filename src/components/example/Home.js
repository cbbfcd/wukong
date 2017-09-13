import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import TopNav from './TopNav';
import AboutWuKong from './AboutWuKong';

@inject("store")
@observer
export default class Home extends Component{
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div>
				<TopNav />
        		<AboutWuKong />
			</div>
		)
	}
}