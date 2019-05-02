import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie, VictoryChart,VictoryBar } from 'victory';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import {Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback, Container, Card } from 'reactstrap';
import axios from 'axios';


export default class Analysis extends Component {
  
  state = {
    op: ""
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({op: nextProps.match.params.op});
  }

  render() {
    return (
      <div>
        {this.state.op === "see" && <AddData/>}
        {this.state.op === "add" && <Insights/>}
      </div>
    );
  }
}

class AddData extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows
          });
        }
      }); 
  }

  fileHandler = (event) => {    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }    
      else{
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }               
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  submit = () => {
    console.log(this.state.rows);
    let n_grades = [], i;
    for (i = 0; i < this.state.rows[0][2]; i++) {
      n_grades.push({student_id: this.state.rows[i+2][0], sgpa: parseFloat(this.state.rows[i+2][1]), cgpa: parseFloat(this.state.rows[i+2][2]), sub1: this.state.rows[i+2][3], sub2: this.state.rows[i+2][4], sub3: this.state.rows[i+2][5], sub4: this.state.rows[i+2][6], sub5: this.state.rows[i+2][7], sub6: this.state.rows[i+2][8], sub7: this.state.rows[i+2][9], sub8: this.state.rows[i+2][10], sub9: this.state.rows[i+2][11]})
    }

    this.setState({
      n_grades: n_grades
    })

    console.log(n_grades);
    axios.post('http://localhost:4000/api/results/adddata', {
      class_id: this.state.rows[0][0],
      no_subjects: this.state.rows[0][1],
      no_students: this.state.rows[0][2],
      grades: this.state.n_grades,
      subjects_list: {sub1: this.state.rows[1][3], sub2: this.state.rows[1][4], sub3: this.state.rows[1][5], sub4: this.state.rows[1][6], sub5: this.state.rows[1][7], sub6: this.state.rows[1][8], sub7: this.state.rows[1][9], sub8: this.state.rows[1][10], sub9: this.state.rows[1][11]}
    })
    .then(res => console.log(res))
  }

  render() {
    return (
      <div>
        <Container>
        <form>
          <FormGroup row>
            <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">Upload</Label>          
            <Col xs={4} sm={8} lg={10}>                                                     
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button color="info" style={{color: "white", zIndex: 0}} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Browse&hellip;</Button>
                  <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event)=> { event.target.value = null }} style={{"padding":"10px"}} />                                
                </InputGroupAddon>
                <Input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />                                              
                <FormFeedback>    
                  <Fade in={this.state.isFormInvalid} tag="h6" style={{fontStyle: "italic"}}>
                    Please select a .xlsx file
                  </Fade>                                                                
                </FormFeedback>
              </InputGroup>     
            </Col>                                                   
          </FormGroup>   
        </form>

        {this.state.dataLoaded && 
        <div>
          <Button color="info" style={{color: "white", zIndex: 0}} onClick={this.submit.bind(this)}>Submit</Button>
          <Card body outline color="secondary" className="restrict-card">
            
              <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
            
          </Card>  
        </div>}
        </Container>
      </div>
    );
  }
}

class Insights extends Component {

  getInsight() {
    var analysisList;
    axios.get('http://localhost:4000/api/results/getinsights')
    .then(res => analysisList = res.data)
    .then(analysisList => this.setState({analysisList}))
  }

  componentDidMount() {
    this.getInsight();
  }

  seeSubmit = () => {
    let analysis = this.state.analysisList[0];
    let class_id = analysis.class_id;
    let subjects = Object.values(analysis.subjects_list);
    let grades = analysis.grades;
    let no_students = analysis.no_students;
    let no_subjects = analysis.no_subjects;
    var x, grade_list = [];
    var failed_students = [];
    var failed_subjectwise = [];
    var failed_no_subjectwise = [];
    for (x in grades) {
      grade_list = Object.values(grades[x]);
      if(grade_list.includes("F"))
        failed_students.push(grade_list[1]);
    }
    var g, s;
    for (x = 0; x < no_subjects; x++) {
      s = subjects[x];
      var failed_temp = [];
      for (g in grades) {
        grade_list = Object.values(grades[g]);
        if(grade_list[x+4] == "F") {        
          console.log("found");  
          failed_temp.push(grade_list[1])
        }
      }
    failed_subjectwise.push(failed_temp); 
    }
    
    for (x = 0; x < no_subjects; x++) {
      failed_no_subjectwise.push(failed_subjectwise[x].length)
    }

    console.log(failed_no_subjectwise);

    this.setState({
      failed_students: failed_students,
      no_students: no_students,
      passed_students: no_students - failed_students.length,
      failed_no_subjectwise: failed_no_subjectwise,
      subjects: subjects,
      failed_subjectwise: failed_subjectwise
    });

  }

  render() {
    if(this.state) console.log(this.state.analysisList[0].class_id);
    return (
      <div>
        <h1>{this.state && this.state.analysisList[0].class_id}</h1>
        <Button color="info" style={{color: "white", zIndex: 0}} onClick={this.seeSubmit.bind(this)}>See</Button>
          
        
          {this.state && this.state.failed_students && 
            <div>
              <h4 style = {{alignment: 'center'}}>Passed: {this.state.passed_students}, Failed: {this.state.failed_students.length} </h4>
              <div style = {{height: 300}}><VictoryPie data  = {[{x: "Failed", y: this.state.failed_students.length}, {x: "Passed", y: this.state.passed_students}]}/></div>
            </div>
          }          

          {this.state && this.state.failed_no_subjectwise && 
            <div>
              <h4> Failed, subject-wise </h4>
              {
                this.state.failed_no_subjectwise.map((value, index) => <div> {this.state.subjects[index]}: {value} </div> )
              }
              <div style = {{height: 300}}><VictoryChart>
                <VictoryBar data = {this.state.failed_no_subjectwise}/>
              </VictoryChart></div>
            </div>
          }

        <ul>
            {this.state && this.state.subjects && this.state.failed_no_subjectwise && this.state.subjects.map((value, index) => 
              <div>
                <li>{value}, <h4>Failed: </h4> {this.state.failed_no_subjectwise[index]}</li>
                <div style = {{height: 300}}><VictoryPie colorScale = {["navy", "cyan"]} data  = {[{x: "Failed", y: this.state.failed_no_subjectwise[index]}, {x: "Passed", y: this.state.no_students - this.state.failed_no_subjectwise[index]}]}/></div>
              </div>
            )}
        </ul>
      </div>
    );
  }
}

