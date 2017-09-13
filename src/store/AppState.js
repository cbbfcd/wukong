import { observable, action } from "mobx";
import axios from "axios";
import 'MOCK/mockdata';

export default class AppState {
	// 声明被观察者
	@observable isAuthenticated;
	@observable demoUrls;
	// 初始化被观察者
	constructor() {
		this.isAuthenticated = false;
		this.demoUrls = [];	
	}

	// 登录方法
	async login(param){
		let { data } = await axios.post('/login', param);
		console.log("test", data);
	}

	@action someFunc(){
		console.log("this is a test func")
	}
}

