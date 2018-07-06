import React, { Component } from 'react';
import { Button, Table, Row, Col, Input, Select, Icon } from 'antd';
import axios from 'axios';

const Option = Select.Option;

const classColumns = [{
  title: 'Branch',
  dataIndex: 'branch',
  key: 'branch',
},{
  title: 'Year',
  dataIndex: 'year',
  key: 'year',
},  {
  title: 'Section',
  dataIndex: 'section',
  key: 'section',
},  {
  title: 'Class ID',
  dataIndex: 'class_id',
  key: 'class_id',
},  {
  title: 'Subjects',
  dataIndex: 'subjects',
  key: 'subjects',
}];


export default class SClass extends Component {
	state = {
		classList: [],
		showAllClass: false,
		showAddClass: false,
	}

	getClasses() {
		var classList;
		axios.get('http://localhost:4000/api/results/getclasses')
		.then(res => classList = res.data)
		.then(classList => this.setState({classList}))
	}

	toggleAllClasses = () => {
		this.getClasses();
		if(this.state.showAddClass) this.setState({showAddClass: false});
		this.setState({showAllClass: !this.state.showAllClass});
	}

	toggleAddClasses = () => {
		if(this.state.showAllClass) this.setState({showAllClass: false});
		this.setState({showAddClass: !this.state.showAddClass});
	}

	render()
	{
		return (
			<div>
				<Row>
					<Col md = {3}>
					<Button type = "primary" onClick = {this.toggleAllClasses}>{!this.state.showAllClass ? <span>See All Classes</span> : <span>Hide</span>}</Button>
					</Col>
					<Col md = {3}>
					<Button type = "primary" onClick = {this.toggleAddClasses}>{!this.state.showAddClass ? <span>Add Class</span> : <span>Hide</span>}</Button>
					</Col>
				</Row>
				{this.state.showAllClass && <Table dataSource = {this.state.classList} columns={classColumns}/>}
				{this.state.showAddClass && <AddClass/>}
			</div>
		);
	}
}

class AddClass extends Component {
	state = {
		branch: '',
		year: '',
		section: '',
		subjects_count: 0,
		subjects: [],
		subjectList: [],
		facultyList: [],
	};

	getSubjects() {
		var subjectList;
		axios.get('http://localhost:4000/api/results/getsubjects')
		.then(res => subjectList = res.data)
		.then(subjectList => this.setState({subjectList}))
	}

	getFaculty() {
		var facultyList;
		axios.get('http://localhost:4000/api/results/getfaculties')
		.then(res => facultyList = res.data)
		.then(facultyList => this.setState({facultyList}))
	}

	componentDidMount() {
		this.getSubjects();
		this.getFaculty();
	}

	changeBranch = (value) => {
		this.setState({branch: value});
	}

	changeYear = (value) => {
		this.setState({year: value});
	}

	changeSection = (value) => {
		this.setState({section: value});
	}

	/*changeSubjectCount = (e) => {
		this.setState({subjects_count: e.target.value});
	}*/

	changeSubject = (value) => {
		this.setState({tempSubject: value});
	}

	changeFaculty = (value) => {
		this.setState({tempFaculty: value});
	}

	addToSubjects = () => {
		var tempSubjects = this.state.subjects;
		tempSubjects.push({subject_id: this.state.tempSubject, faculty_id: this.state.tempFaculty});
		this.setState({subjects: tempSubjects, subjects_count: this.state.subjects_count+1});
	}

	removeSubject = (id) => {
		var tempSubjects = this.state.subjects;
		var i = 0;
	    for(i = 0; i < tempSubjects.length; i++)
	      if(tempSubjects[i].subject_id === id)
	        break;
	    tempSubjects.splice(i, 1);
		this.setState({subjects: tempSubjects, subjects_count: this.state.subjects_count-1});

	}

	submit = () => {
		var id = this.state.branch + this.state.year + this.state.section;
		axios.post('http://localhost:4000/api/results/addclass', {
			class_id: id,
			branch: this.state.branch,
			year: this.state.year,
			section: this.state.section,
			subjects: this.state.subjects
		})
		.then(res => console.log(res))
	}

	render() {
		const subjectOptions = this.state.subjectList.map(subject => <Option value = {subject.subject_id}>{subject.name}</Option>);
		const facultyOptions = this.state.facultyList.map(faculty => <Option value = {faculty.faculty_id}>{faculty.name}</Option>);

		const addSubject = <div>
			<Select onChange = {this.changeSubject} showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} defaultValue="Subject" style={{ width: 120 }}>
				{subjectOptions}
			</Select>
			<Select onChange = {this.changeFaculty} showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} defaultValue="Faculty" style={{width: 120}}>
				{facultyOptions}
			</Select>
			<Button type = "default" onClick = {this.addToSubjects}>Add</Button>
		</div>

		const addedSubjects = this.state.subjects.map(subject => <h6>Subject: {subject.subject_id} Faculty: {subject.faculty_id}</h6>)
		/*var addSubjectArr = [];
		for (var i = 0; i < this.state.subjects_count; i++) {
		    addSubjectArr.push(<div>{addSubject}</div>);
		}*/

		const subjectColumns = [{
			title: 'Subject',
		  dataIndex: 'subject_id',
		  key: 'subject_id',
		},{
		  title: 'Faculty',
		  dataIndex: 'faculty_id',
		  key: 'faculty_id',
		}, {
		  title: 'Action',
		  key: 'action',
		  render: (text, record) => (
		    <span style = {{cursor: 'pointer'}} onClick = {() => this.removeSubject(record.subject_id)}>
		      <Icon type = "delete"/>     
		    </span>
		  ),
		}];

		return (
			<div>
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

				<Select defaultValue="Year" style={{ width: 120 }} onChange={this.changeYear}>
				  <Option value="1">I/IV</Option>
				  <Option value="2">II/IV</Option>
				  <Option value="3">III/IV</Option>
				  <Option value="4">IV/IV</Option>
				</Select>

				<Select defaultValue="Section" style={{ width: 120 }} onChange={this.changeSection}>
				  <Option value="1">1</Option>
				  <Option value="2">2</Option>
				  <Option value="3">3</Option>
				</Select>

{/*				<Input placeholder = "No. of subjects" style = {{width: 200}} onChange = {this.changeSubjectCount}/>
*/}
				<br/>
				{addSubject}
				{this.state.subjects_count>0 && <Table dataSource = {this.state.subjects} columns={subjectColumns}/>}
				<br/>
				<Button type = "primary" onClick = {this.submit}>Submit</Button>
			</div>
		);
	}
}