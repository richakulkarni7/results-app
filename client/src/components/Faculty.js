import React, { Component } from 'react';
import { Button, Table, Row, Col, Input, Select } from 'antd';
import axios from 'axios';

const Option = Select.Option;

const columns = [{
  title: 'Faculty ID',
  dataIndex: 'faculty_id',
  key: 'faculty_id',
},{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
},  {
  title: 'Branch',
  dataIndex: 'branch',
  key: 'branch',
}];


export default class Faculty extends Component {
	
	state = {
		facultyList: [],
		showAllFaculty: false,
		showAddFaculty: false,
	}

	getFaculty() {
		var facultyList;
		axios.get('http://localhost:4000/api/results/getfaculties')
		.then(res => facultyList = res.data)
		.then(facultyList => this.setState({facultyList}))
	}

	toggleAllFaculty = () => {
		this.getFaculty();
		if(this.state.showAddFaculty) this.setState({showAddFaculty: false});
		this.setState({showAllFaculty: !this.state.showAllFaculty});
	}

	toggleAddFaculty = () => {
		if(this.state.showAllFaculty) this.setState({showAllFaculty: false});
		this.setState({showAddFaculty: !this.state.showAddFaculty});
	}

	render()
	{
		return (
			<div>
				<Row>
					<Col md = {3}>
					<Button type = "primary" onClick = {this.toggleAllFaculty}>{!this.state.showAllFaculty ? <span>See All Faculty</span> : <span>Hide</span>}</Button>
					</Col>
					<Col md = {3}>
					<Button type = "primary" onClick = {this.toggleAddFaculty}>{!this.state.showAddFaculty ? <span>Add Faculty</span> : <span>Hide</span>}</Button>
					</Col>
				</Row>
				{this.state.showAllFaculty && <Table dataSource = {this.state.facultyList} columns={columns}/>}
				{this.state.showAddFaculty && <AddFaculty/>}
			</div>
		);
	}
}

class AddFaculty extends Component {
	state = {
		name: '',
		branch: '',
		faculty_id: ''
	}

	changeName = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	changeBranch = (value) => {
		this.setState({branch: value});
	}

	submit = () => {
		var id = Math.floor((Math.random()*10000+1));
		axios.post('http://localhost:4000/api/results/addfaculty', {
			faculty_id: id,
			name: this.state.name,
			branch: this.state.branch
		})
		.then(res => console.log(res))
	}

	render() {
		return (
			<div>
				<Input name = "name" placeholder = "Enter name" style = {{width: '200px'}} onChange = {this.changeName}/>
				<Select defaultValue="Branch" style={{ width: 120 }} onChange={this.changeBranch}>
				  <Option value="CSE">CSE</Option>
				  <Option value="ECE">ECE</Option>
				  <Option value="EEE">EEE</Option>
				  <Option value="IT">IT</Option>
				  <Option value="Mechanical">Mechanical</Option>
				  <Option value="Biotechnology">Biotechnology</Option>
				  <Option value="Chemical">Chemical</Option>
				  <Option value="Production">Production</Option>
				  <Option value="Civil">Civil</Option>
				</Select>
				<Button type = "primary" onClick = {this.submit}>Submit</Button>
			</div>
		);
	}
}