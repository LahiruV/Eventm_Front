import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from "./adminNav";

import * as XLSX from 'xlsx';



export default class CrewReport extends Component {

//Binding event handler method
constructor(props){
  super(props);

//Initializing local state by assigning an object to this.state
  this.state={
    crew:[]
  };
}
//load data from a remote endpoint
componentDidMount(){
  this.retriveCrew();
}


retriveCrew(){
  //get server side http module to get data to client side Http request
  axios.get("http://localhost:5000/crew").then(res =>{
      if(res.data.success){
        this.setState({
            crew:res.data.existingPosts
        });

        console.log(this.state.crew);
      }

  });
}

//delete a material card
onDelete = (id) =>{

  axios.delete(`http://localhost:5000/crew/deletecrew/${id}`).then((res) =>{
    Swal.fire('Deleted','Deleted Successfilly','success')
    this.retriveCrew();
  })
}


//filter data
filterData(crew,searchKey){

const result = crew.filter((crew) =>
  
crew.name.toLowerCase().includes(searchKey) ||
crew.category.toLowerCase().includes(searchKey)
)

this.setState({crew:result})

}

//Search Function
handleSearchArea = (e) =>{

  const searchKey= e.currentTarget.value;

  axios.get("http://localhost:5000/crew").then(res =>{
      if(res.data.success){

        this.filterData(res.data.existingPosts,searchKey)

      }
  });

  
}

exportToExcel = () => {
    const { crew } = this.state;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(crew);
    XLSX.utils.book_append_sheet(wb, ws, "Crew Data");
    XLSX.writeFile(wb, "crew_data.xlsx");
  }
  //gather outputs
  render() {
    return (

        <div class="dashboard-main-wrapper" >
        <Navbar />
        <div style={{ padding: '30px' }} class="dashboard-wrapper">
        <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fa-solid fa-folder-open"></i> Crew Reports</h4>
        <hr/>
        <div className="container-fluid bg-light ">
            
        <br/>
         

        
        <a href="/CrewDash">
        <button  className="btn btn-dark" >
       
        <i class="fa-solid fa-circle-left"></i>
       
                              
                          </button>
                          </a> 


          
<center>
          <div className="col-lg-4 mt-2 mb-3">
        
        <input
        className="form-control "
        type="search"
        placeholder="Search Crew Details"
        name="searchQuery"
        onChange={this.handleSearchArea}>

        </input>
        </div>
        
       
        </center>
        
        <div className="p-3 mb-2 text-light rounded-3" style={{ backgroundColor: "" }} >






</div>

               
                <button  onClick={this.exportToExcel} className="btn btn-dark" >
                <i class="fa-solid fa-file-arrow-down"></i>
                </button>
                <hr/>
      
                             
                        




<div className="table-responsive">
  <table id="table" className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Contact</th>
        <th>Location</th>
        <th>Cost</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {this.state.crew.map((crew, index) => (
        <tr key={index}>
          <td>{crew.name}</td>
          <td>{crew.gender}</td>
          <td>{crew.contact}</td>
          <td>{crew.from}</td>
          <td>{crew.cost}</td>
          <td>{crew.category}</td>
          <td>
            <a href={`/CrewPost/${crew._id}`} className="btn btn-light btn-sm mr-2">View Details</a>
            
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


         

         </div>
         </div>
         </div>   
     

      
    )
  }
}