import React, { Component } from 'react';
import { Button, Table, Row, Col, Input, Select, Icon, InputNumber, Popconfirm, Form } from 'antd';
import axios from 'axios';

const Option = Select.Option;

export default class Marks extends Component {
	
	state = {
		showAllMarks: false,
		showAddMarks: false,
	}

	getClasses() {
		var classList;
		axios.get('http://localhost:4000/api/results/getclasses')
		.then(res => classList = res.data)
		.then(classList => this.setState({classList}))
	}

	componentDidMount() {
		this.getClasses();
	}
	toggleAllMarks = () => {
		// this.getMarks();
		if(this.state.showAddMarks) this.setState({showAddMarks: false});
		this.setState({showAllMarks: !this.state.showAllMarks});
	}

	toggleAddMarks = () => {
		if(this.state.showAllMarks) this.setState({showAllMarks: false});
		this.setState({showAddMarks: !this.state.showAddMarks});
	}

	render() {
		return(
			<div>
			<Row>
				<Col md = {3}>
				<Button type = "primary" onClick = {this.toggleAllMarks}>{!this.state.showAllMarks ? <span>See Marks</span> : <span>Hide</span>}</Button>
				</Col>
				<Col md = {3}>
				<Button type = "primary" onClick = {this.toggleAddMarks}>{!this.state.showAddMarks ? <span>Add Marks</span> : <span>Hide</span>}</Button>
				</Col>
			</Row>
			{this.state.showAllMarks && <ShowMarks classList = {this.state.classList}/>}
			{this.state.showAddMarks && <AddMarks classList = {this.state.classList}/> }
			</div>
		);
	}
}

class ShowMarks extends Component {
	state = ({
		classList: this.props.classList,
		selected_class: '',
		subjectList: [],
		selected_subject: '',
	})

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

	changeClass = (value) => {
		this.setState({selected_class: value}, () => {this.getClassSubjects()});
	}

	changeSubject = (value) => {
		this.setState({selected_subject: value}, () => {this.getSubjectFaculty()});
	}

	getMarks = () => {
		axios.post('http://localhost:4000/api/results/findmarks', {
			class_id: this.state.selected_class,
			subject_id: this.state.selected_subject,
		})
		.then(res => this.setState({marksList: res.data}));
	}


	render() {
		const marksColumns  = [
			{
			title: 'Student',
			dataIndex: 'student_id',
			width: '20%',
			},
			{
			title: 'Mid I',
			dataIndex: 'mid1',
			width: '10%',
			},
			{
			title: 'Mid II',
			dataIndex: 'mid2',
			width: '10%',
			},
			{
			title: 'Assignment',
			dataIndex: 'asst',
			width: '10%',
			},
			{
			title: 'Internal',
			dataIndex: 'int_total',
			width: '10%',
			},
			{
			title: 'External',
			dataIndex: 'ext',
			width: '10%',
			},{
			title: 'Total',
			dataIndex: 'total',
			width: '10%',
			}
		]
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
				{(this.state.selected_class && this.state.selected_subject) && 
					<Button type = "primary" onClick = {this.getMarks}>Get Marks</Button>
				}
				{this.state.marksList && <Table dataSource = {this.state.marksList} columns={marksColumns}/>}
			</div>
		);
	}
}

class AddMarks extends Component {

	state = ({
		classList: this.props.classList,
		selected_class: '',
		subjectList: [],
		selected_subject: '',
	})

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

	changeClass = (value) => {
		this.setState({selected_class: value}, () => {this.getClassSubjects()});
	}

	changeSubject = (value) => {
		this.setState({selected_subject: value}, () => {this.getSubjectFaculty()});
	}

	changeRN = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	addMarks = () => {
		this.setState({showTable: true});
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

				<Input type = "text" style = {{width: '120px'}} name = "start_rn" placeholder = "Starting Roll No." onChange = {this.changeRN}/>
				<Input type = "text" style = {{width: '120px'}} name = "end_rn" placeholder = "Ending Roll No." onChange = {this.changeRN}/>			

				{(this.state.selected_subject && this.state.selected_class && this.state.start_rn && this.state.end_rn) && 
					<Button type = "default" onClick = {this.addMarks}>Enter marks</Button>
				}

				{this.state.showTable && <EditableTable info = {this.state}/>}

			</div>
		);
	}
}

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const data = [];
	for (let i = this.props.info.start_rn; i <= this.props.info.end_rn; i++) {
	  data.push({
	    key: i.toString(),
	    student_id: i,
	    
	  });
	}
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'Student',
        dataIndex: 'student_id',
        width: '20%',
        editable: false,
      },
      {
        title: 'Mid I',
        dataIndex: 'mid1',
        width: '10%',
        editable: true,
      },
      {
        title: 'Mid II',
        dataIndex: 'mid2',
        width: '10%',
        editable: true,
      },
      {
        title: 'Assignment',
        dataIndex: 'asst',
        width: '10%',
        editable: true,
      },
      {
        title: 'Internal',
        dataIndex: 'int_total',
        width: '10%',
        editable: false,
      },
      {
        title: 'External',
        dataIndex: 'ext',
        width: '10%',
        editable: true,
      },{
        title: 'Total',
        dataIndex: 'total',
        width: '10%',
        editable: false,
      },      
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                	<a onClick={() => this.cancel(record.key)}>Cancel</a>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const int_total = (row.mid1 + row.mid2)/2 + row.asst;
      const total = int_total + row.ext;
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        const myrow = row;
        row.int_total = int_total;
        row.total = total;
        newData.splice(index, 1, {
          ...item,
          ...myrow,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        // newData.push(data);
        // this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  saveMarks = () => {
  	this.state.data.map(marks => {
  		var mymarks = marks;
  		mymarks.class_id = this.props.info.selected_class;
  		mymarks.subject_id = this.props.info.selected_subject;
  		mymarks.faculty_id = this.props.info.faculty;
  		axios.post('http://localhost:4000/api/results/addmarks', mymarks)
  		.then(console.log("saved "+mymarks.student_id));
  	})
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
    	<div>
    		<Button type = "primary" onClick = {this.saveMarks}>Save Marks</Button>
	      	<Table
	        components={components}
	        bordered
	        dataSource={this.state.data}
	        columns={columns}
	        rowClassName="editable-row"
	      />
	     </div>
    );
  }
}