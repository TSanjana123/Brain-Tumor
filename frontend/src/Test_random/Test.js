// import React from "react";

// function Test() {
//     return (
//         <>

//         </>
//     );
// }

// export default Test;
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function Test() {
  return (
    <>
      <h1>Layout</h1>
      <br />
      <h3>columns</h3>
      <div className="d-flex justify-content-center align-items-start"> {/* Flexbox for centering */}
        {/* <div className="container text-center mt-3"> */}
        <div className="container custom-box text-center">
          <div className="row align-items-start"> {/* Align items at the start (top) */}

            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
            <div className="col">
              One of three columns
            </div>
          </div>
        </div>
      </div>
      <br />
      <h3>grid</h3>
      <div class="d-flex justify-content-center align-items-start">
        <div class="container">
          <div class="row">
            <div class="col">
              Column
            </div>
            <div class="col">
              Column
            </div>
            <div class="col">
              Column
            </div>
          </div>
        </div>
      </div>

      <br></br>

      <hr></hr>

      <h1>component</h1>

      <h3>card</h3>
      <div class="card">
        <div class="card-body">
          This is some text within a card body.
        </div>
      </div>

      <br></br>

      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg" class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg" class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg" class="d-block w-100" alt="..."/>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

    </>
  );
}

export default Test;