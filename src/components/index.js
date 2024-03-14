import React, { } from 'react';
import {
    MDBCardImage,
    MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';

function Home() {

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />

            <header class="py-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div className='row'>
                                <div className='col'>
                                    <div class="my-5 text-center text-xl-start">
                                        <h1 class="display-5 fw-bolder text-white mb-2 text-uppercase">
                                            Our Services<br />
                                            <span
                                                class="txt-rotate text-warning"
                                                data-period="2000"
                                                data-rotate='[ "Festivals", "Musical Shows", "Weddings", "Charity Events"]'></span>
                                        </h1>
                                        <p class="text-white" style={{ fontSize: '20px', fontWeight: 'bold', }}>Welcome to Event by OSH (pvt) Ltd, where dreams become reality. As a premier private event planning company, we specialize in crafting unforgettable weddings, parties, and celebrity events. With meticulous attention to detail and a passion for perfection, we are dedicated to making your dream event come true. Let us turn your vision into an extraordinary experience that you and your guests will cherish forever.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="container mt-5 pt-5 pb-5 mb-5">
                <hr />
                <br />
                <br />
                <div className="container">
                    <MDBRow className="mt-4">
                        <MDBCol >
                            <div class="my-5 text-center text-xl-start">
                                <h2 class=" fw-bolder text-black mb-2 text-uppercase">
                                    Visit Event by OSH
                                    <br />
                                    <br />
                                </h2>
                                <p class="text-black" style={{ fontSize: '18px', fontWeight: 'bold', }}>
                                    In the realm of Event by OSH (pvt) Ltd, dreams unfold into breathtaking realities. We are artisans of elegance, orchestrating extraordinary moments that transcend the ordinary. From intimate weddings to grand galas, our team infuses each event with creativity and precision, ensuring every detail is a masterpiece. With passion as our guide, we curate experiences that linger in the heart long after the final toast. At Event by OSH, we don't just plan events; we craft stories—stories of enchantment, elegance, and everlasting memories.</p>
                            </div>
                        </MDBCol>
                        <MDBCol >
                            <div >
                                <MDBCardImage src='https://images.pexels.com/photos/2263435/pexels-photo-2263435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='...' height="
                                400" width="650" />
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
                <hr />
            </section>

            <section className="container mt-5 pt-5 pb-5 mb-5">
                <h2 className="text-uppercase text-center" style={{ color: '#19011C' }}>Shop by brand</h2>
                <div className="container">
                    <MDBRow className="mt-4">
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://media.licdn.com/dms/image/C560BAQGhK1K4dfNV0g/company-logo_400_400/0/1669271403942?e=1688601600&v=beta&t=rnUCoyhDhXgLj2u9hYqAARhJCTUFP6m99_9gpil3-Yg' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAADFxcVsbGz19fXZ2dn6+vphYWG8vLwVFRXAwMCdnZ2rq6uCgoLV1dUsLCxZWVno6OilpaUMDAwhISHf3993d3c2NjaXl5ePj49ISEjt7e2IiIhBQUHPz88cHBwnJyc6OjpOTk6zs7N9fX1ubm5kZGS7MvNcAAAEOElEQVR4nO3a2ZaiOhgF4D/FJIIMMooyKr7/I3YGhthVXfbFWQWrz/4uujEQyCYmBFcRAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfMs8fuzJ0fzPE36wfflAQiREws0hIRIi4fZ+KmEZWJkUHHJZcAmawJoEVjjwj1nMZc3hUsgj3GMQNN1U37Pu/N/BWitZllEFQTCs12itoNwuISNq+qqKTgFRMBVcS0/5sFveEJtvnf1jxpdZTS2OMIjmFpfkzc2d6ng+GezOT5Jot5HaDRPadFQbvFVnVRAsOyPGDhRPH5KbTbbBNxyikyq6UD5XttdKKfNfr3cy3T0kTGyVRU/I9ISMFTZRpSU8zQFfEnK+2dDUuztKyCyiNwnZkyhbE+ZzV36RkF2JjL0lzETrv0/I+GiN5oQG3Zbyzwl7IrveV8KQ6PI24Y3oPiV0SJsgPycU/R27u0rYUMPeJoz4fKoSRuRr5efPCfk0NJ1xHwmNeG5xTBZLuTD+ImEtBiJP+Chez8cTtqJSe78tCcXs7O8kYczHzDKm4qXGlFB/shWih3lC/uCg50vCmZaQfy3osY+Eqam1l/ehG3KFNSU0tYQV8cNFH/IBuTwqZEI7lPyTllDcrWgXCcXwonRJ+Ns41BM6Yjkjx+GDSJtLvxqHXGeTGe4ioZgjs79J6BGF01zK127rbPqHhGyQ591DQh5knWm+SZiJ6XF6HoqOP79JyFcFvMYuEoohY7xNyPutXtc0gy2ejl8mzJZN3uvnfBcJ+RrE7N4kdG25KFjWpZVJU+3fE8b6Cai57iHh8oDWE3a1nrC6qtX0+m7Rm9N59YTJ8JJQrHc3TUjLurRRM8d1XomIolIkFFttdeP7R1kaLQlZyyOKp4qvJbxk2jgUzE0T8knf7tWmy18HGu/4Usnprst2fJnq3GntZpePX9PzXyod0is52jUK2nIcRqORh3NLRmPMc0MzuqH6PD6HZTQmxjiOS5NbWWnUK/XdOFb6Rapnwj7BL1FIiISzMOrFf2lfyNGYhqzWd6vfyHip+iGxLmRB6LJQjqw+cTtVvV/rpN20t2Chql/0G840XinnhLDMZRudC7u/NEMFOzM1j94LGSg/MPlWxPw2lAuh/KbNLEPDcpnw5OQymVcMHfvkpxJWuXpBeESqdb6jv7pHD7XXUz3NzpFs6uB46vDSTeXGWEZrpeLpT5/u6mfhl3v24wlZddETRjfmaTvzVrUumhpZMtkpTvJQywSvLWSIfGTr86CuI/VqyS7qvvArb/i0MKbX2Fp9zYqKjevOwmGGHICJGobsdpKHDSlTN6Tz1NH1bX1VZH0x7WWO+nIml3zLVdtmkBAJkXB7SIiE/8eE//7fJgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwD/mF8uWTj3BlHRgAAAAAElFTkSuQmCC' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://www.henkel.com/resource/image/856178/1x1/1000/1000/588b9cbd0116513d819422b2b2d27bd7/630BFF373CA5AFA1DA7FF0ED3DC7969F/joico-logo.webp' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://pbs.twimg.com/profile_images/1325864798693830656/lreWi4kb_400x400.jpg' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://yt3.googleusercontent.com/ytc/AL5GRJXJjltewPXxEl9mHyIQRDR1vkAFnqXOsRs4sYsO=s900-c-k-c0x00ffffff-no-rj' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='data:image/png;base64,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' alt='...' />
                            </div>
                        </MDBCol>
                    </MDBRow>

                </div>
            </section>
            <section className="container" style={{ marginTop: '10%', marginBottom: '8%' }}>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card border-0 shadow-0">
                            <h3 style={{ lineHeight: '0px' }} className="mb-0 pb-4">Our Location</h3>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.194046863206!2d79.9729445!3d6.9146775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1631374842039!5m2!1sen!2slk" width="700" height="500" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                            <p class="text-muted pt-3 text-left">SLIIT Malabe Campus, New Kandy Rd, Malabe 10115</p>
                        </div>
                    </div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-5">
                        <div class="card border-0 shadow-0 bg-light p-5">
                            <h3 style={{ lineHeight: '0px' }} className="mb-0 pb-0 text-danger">Openning Time</h3>
                            <div className="ms-3 pt-5">
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Monday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Tuesday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Wednesday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Thursday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Friday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Saturday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 08.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Sunday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 08.00 P.M.</h5>
                                    </div>
                                </div>
                                <hr />
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-muted">Holidays : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5 className="text-muted">New Year Week / Poyaday</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <Footer />
        </div>
    )
};

export default Home;