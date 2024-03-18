        import React, { Component } from 'react'
        import axios from 'axios';
        import Swal from 'sweetalert2';
        import Navbar from "./adminNav";

        export default class CrewDashh extends Component {

          //handle data to database
          constructor(props){
            super(props);
            this.state={
                name:"",
                gender:"",
                contact:"",
                from:"",
                cost:"",
                category:"",
                nameError:"",
                genderError:"",
                contactError:"",
                fromError:"",
                costError:"",
                categoryError:""
          }
        } 

        handleInputChange = (e) =>{
            const{name,value} = e.target;

            this.setState({
                ...this.state,
                [name]:value
            })

        } 

        //validation
       validate= ()=>{
       
        let nameError="";
        let genderError="";
        let contactError="";
        let fromError="";
        let costError="";
        let categoryError="";
       

        if(!this.state.name){
          nameError="*Crew Name is Required!"
        }
       
        if(!this.state.gender){
          genderError="*Gender is Required!"
        }
        if(!this.state.contact){
          contactError="*Contact is Required"
        }

        if(!this.state.from){
          fromError="*Crew Location is Required"
        }
         
         
        if(!this.state.cost){
          costError="*Cost is Required"
        }
        if(!this.state.category){
          categoryError="*Category is Required"
        }
 
        if(nameError||genderError||contactError||fromError||costError||categoryError){
         this.setState({nameError,genderError,contactError,fromError,costError,categoryError});
         return false;
 
        }  
 
     return true;
 
    }



            //onsubmit method
            onSubmit =(e) =>{
              e.preventDefault();
              const isValid= this.validate();
              const {name,gender,contact,from,cost,category} = this.state;

              const data = {
                //  matID:matID,
                name:name,
                gender:gender,
                contact:contact,
                from:from,
                cost:cost,
                category:category
                  

              }


            //if validation succussesfully pass
            if(isValid){
              console.log(data)
              //Post data to back end using the Http link
              axios.post("http://localhost:5000/crew/crewsave", data).then((res) =>{
                  if(res.data.success){
                Swal.fire('Added','Crew Added Successfilly','success')
                      this.setState(
                          {
                          name:"",
                          gender:"",
                          contact:"",
                          from:"",
                          cost:"",
                          category:""
                          }
                      )
                  }
              })

            }
        }


          render() {
            return (
              <div class="dashboard-main-wrapper" >
              <Navbar />
              <div class="dashboard-wrapper">
              <form className="needs-validation" noValidate>
                            

                        
                            <div class="row">
          <div class="col">
          <label  style={{marginBottom:'5px'}} >Crew Name</label>
            <input type="text" class="form-control" name="name"  placeholder="Enter Crew Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
            />

        <div style={{fontSize:15 ,color:"red"}}>
                                  {this.state.nameError}
                          </div>
          </div>

          

    

          
        
          <div class="col">
      <label style={{marginBottom:'5px'}}>Gender</label>
      <select 
          class="form-control" 
          name="gender" 
          value={this.state.gender} 
          onChange={this.handleInputChange} 
          required
      >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
      </select>
      <div style={{fontSize:15, color:"red"}}>
          {this.state.genderError}
      </div>
  </div>


          

          <div class="col">
          <label style={{marginBottom:'5px'}} >Contact</label>
            <input type="text" class="form-control" name="contact"  placeholder="Enter Contact Details"
            value={this.state.contact}
            onChange={this.handleInputChange}
            required
            />
            <div style={{fontSize:15 ,color:"red"}}>
                                  {this.state.contactError}
                          </div>
          </div>

          

        </div>




        <div class="row">
        <div class="col">
          <label style={{marginBottom:'5px'}} >From</label>
            <input type="text" class="form-control" name="from"  placeholder="Enter Details"
            value={this.state.from}
            onChange={this.handleInputChange}
            required
            />
            <div style={{fontSize:15 ,color:"red"}}>
                                  {this.state.fromError}
                          </div>
          </div>

          


          <div class="col">
          <label style={{marginBottom:'5px'}} >Cost</label>
            <input type="text" class="form-control"  maxlength="6" name="cost"  placeholder="Enter Cost"
            value={this.state.cost}
            onChange={this.handleInputChange}
            required
            />
              <div style={{fontSize:15 ,color:"red"}}>
                                  {this.state.costError}
                          </div>

                          
          </div>

          <div class="col">
      <label style={{marginBottom:'5px'}}>Category</label>
      <select 
          class="form-control" 
          name="category" 
          value={this.state.category} 
          onChange={this.handleInputChange} 
          required
      >
          <option value="">Select Category</option>
          <option value="male">1</option>
          <option value="female">2</option>
          <option value="other">3</option>
      </select>
      <div style={{fontSize:15, color:"red"}}>
          {this.state.categoryEror}
      </div>
  </div>

        </div>




        
          

          
                                
        
                                

                                
                                

                              

                                <hr/>
                            <div>
                                <button className="btn btn-success" type="submit" style={{ backgroundColor: "#0E3662" }} onClick={this.onSubmit}>
                                    <i className="far fa-check-square"></i>
                                    &nbsp; Add Crew Details
                                </button>
                                <br/>
                                <br/>
                                <button type="submit" className="btn btn-dark"  style={{ backgroundColor: "#2D5F97"}}  onClick={this.btnDemo}>DEMO</button>
                                </div>
                            </form>  
              </div>
              </div>
            )
          }
        }
