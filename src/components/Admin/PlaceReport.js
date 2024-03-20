import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from "./adminNav";
import * as XLSX from 'xlsx';


export default class PlaceReport extends Component {

//Binding event handler method
constructor(props){
  super(props);

//Initializing local state by assigning an object to this.state
  this.state={
    place:[]
  };
}
//load data from a remote endpoint
componentDidMount(){
  this.retrivePlace();
}


retrivePlace(){
  //get server side http module to get data to client side Http request
  axios.get("http://localhost:5000/place").then(res =>{
      if(res.data.success){
        this.setState({
            place:res.data.existingPosts
        });

        console.log(this.state.place);
      }

  });
}

//delete a material card
onDelete = (id) =>{

  axios.delete(`http://localhost:5000/place/deleteplace/${id}`).then((res) =>{
    Swal.fire('Deleted','Deleted Successfilly','success')
    this.retrivePlace();
  })
}


//filter data
filterData(place,searchKey){

const result = place.filter((place) =>
  
place.name.toLowerCase().includes(searchKey) ||
place.category.toLowerCase().includes(searchKey)||
place.address.toLowerCase().includes(searchKey)
)

this.setState({place:result})

}

//Search Function
handleSearchArea = (e) =>{

  const searchKey= e.currentTarget.value;

  axios.get("http://localhost:5000/place").then(res =>{
      if(res.data.success){

        this.filterData(res.data.existingPosts,searchKey)

      }
  });
}

exportToExcel = () => {
    const { place } = this.state;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(place);
    XLSX.utils.book_append_sheet(wb, ws, "Place Data");
    XLSX.writeFile(wb, "place.xlsx");
  }
  //gather outputs
  render() {
    return (

        <div class="dashboard-main-wrapper" >
        <Navbar />
        <div style={{ padding: '30px' }} class="dashboard-wrapper">
        <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fa-solid fa-folder-open"></i> Place Management Reports</h4>
        <hr/>
      
        <div className="container-fluid bg-light ">
            
         <br/>
         <a href="/PlaceDash">
        <button  className="btn btn-dark" >
       
        <i class="fa-solid fa-circle-left"></i>
       
                              
                          </button>
                          </a>
          <center>
          <div className="col-lg-4 mt-2 mb-3">
        
        <input
        className="form-control "
        type="search"
        placeholder="Search Place Details"
        name="searchQuery"
        onChange={this.handleSearchArea}>

        </input>
        </div>
        
        
       
        </center>
        <button  onClick={this.exportToExcel} className="btn btn-dark" >
                <i class="fa-solid fa-file-arrow-down"></i>
                </button>
                <hr/>
                <br/>

          <table className="table">
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Place ID</th>
      <th>Address</th>
      <th>Phone</th>
      <th>Cost</th>
      <th>Description</th>
      <th>Category</th>
     
    </tr>
  </thead>
  <tbody>
    {this.state.place.map((place, index) => (
      <tr key={index}>
        <td><img src={place.image} alt={place.image} style={{ width: '100px', height: 'auto' }} /></td>
        <td>{place.name}</td>
        <td><a href={`/PlacePost/${place._id}`} style={{ textDecoration: 'none' }}>{`PID${place._id.substr(0, 7)}`}</a></td>
        <td>{place.address}</td>
        <td>{place.contact}</td>
        <td>{place.cost}</td>
        <td>{place.description}</td>
        <td>{place.category}</td>
       
      </tr>
    ))}
  </tbody>
</table>


         </div> 
         </div>
         </div>   
     

      
    )
  }
}