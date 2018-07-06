import React, { Component } from 'react';
import { Button, Table, Row, Col, Input, Select } from 'antd';
import axios from 'axios';

const Option = Select.Option;

const columns = [{
  title: 'Subject ID',
  dataIndex: 'subject_id',
  key: 'subject_id',
},{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}];


export default class Subject extends Component {
	
	state = {
		subjectList: [],
		showAllSubject: false,
		showAddSubject: false,
	}

	getSubject() {
		var subjectList;
		axios.get('http://localhost:4000/api/results/getsubjects')
		.then(res => subjectList = res.data)
		.then(subjectList => this.setState({subjectList}))
	}

	toggleAllSubject = () => {
		this.getSubject();
		if(this.state.showAddSubject) this.setState({showAddSubject: false});
		this.setState({showAllSubject: !this.state.showAllSubject});
	}

	toggleAddSubject = () => {
		if(this.state.showAllSubject) this.setState({showAllSubject: false});
		this.setState({showAddSubject: !this.state.showAddSubject});
	}

	render()
	{
		return (
			<div>
				<Row>
					<Col md = {3}>
					<Button type = "primary" onClick = {this.toggleAllSubject}>{!this.state.showAllSubject ? <span>See All Subjects</span> : <span>Hide</span>}</Button>
					</Col>
					<Col md = {3}>
					<Button type = "primary" onClick = {this.toggleAddSubject}>{!this.state.showAddSubject ? <span>Add Subject</span> : <span>Hide</span>}</Button>
					</Col>
				</Row>
				{this.state.showAllSubject && <Table dataSource = {this.state.subjectList} columns={columns}/>}
				{this.state.showAddSubject && <AddSubject/>}
			</div>
		);
	}
}

class AddSubject extends Component {
	state = {
		name: '',
		subject_id: ''
	}

	change = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}


	submit = () => {
		axios.post('http://localhost:4000/api/results/addsubject', {
			subject_id: this.state.subject_id,
			name: this.state.name,
		})
		.then(res => console.log(res))
	}

	render() {
		return (
			<div>
				<Input name = "name" placeholder = "Enter name" style = {{width: '200px'}} onChange = {this.change}/>
				<Input name = "subject_id" placeholder = "Enter ID" style = {{width: '200px'}} onChange = {this.change}/>
				<Button type = "primary" onClick = {this.submit}>Submit</Button>
			</div>
		);
	}
}