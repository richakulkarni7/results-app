import React, { Component } from 'react';
import { Button, Table, Row, Col, Input, Select, Icon } from 'antd';
import axios from 'axios';

const Option = Select.Option;

export default class Marks extends Component {
	render() {
		return(
			<AddMarks/>
		);
	}
}

class ShowMarks extends Component {

}

class AddMarks extends Component {

	state = ({
		classList: [],
		selected_class: '',
		subjectList: [],
		selected_subject: '',
	})

	getClasses() {
		var classList;
		axios.get('http://localhost:4000/api/results/getclasses')
		.then(res => classList = res.data)
		.then(classList => this.setState({classList}))
	}

	getClassSubjects() {
		for(var i = 0; i < this.state.classList.length; i++) {
			if(this.state.classList[i].class_id === this.state.selected_class) {
				this.setState({subjectList: this.state.classList[i].subjects});
				break;
			}
		}
	}

	getSubjectFaculty() {
		for(var i = 0; i < this.state.subjectList.length; i++) {
			if(this.state.subjectList[i].subject_id === this.state.selected_subject) {
				this.setState({faculty: this.state.subjectList[i].faculty_id});
				break;
			}
		}
	}

	componentDidMount() {
		this.getClasses();
	}

	changeClass = (value) => {
		this.setState({selected_class: value}, () => {this.getClassSubjects()});
	}

	changeSubject = (value) => {
		this.setState({selected_subject: value}, () => {this.getSubjectFaculty()});
	}

	render() {
		const classOptions = this.state.classList.map(sclass => <Option value = {sclass.class_id}>{sclass.class_id}</Option>);
		const subjectOptions = this.state.subjectList.map(subject => <Option value = {subject.subject_id}>{subject.subject_id}</Option>);
		return (
			<div>
				<Select onChange = {this.changeClass} showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} defaultValue="Class" style={{ width: 120 }}>
					{classOptions}
				</Select>

				<Select onChange = {this.changeSubject} showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} defaultValue="Subject" style={{ width: 120 }}>
					{subjectOptions}
				</Select>
			</div>
		);
	}
}