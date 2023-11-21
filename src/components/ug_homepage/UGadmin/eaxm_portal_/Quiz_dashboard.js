import React from 'react'

const Quiz_dashboard = () => {
  return (
    <div>
       <div className="Quiz_dashboard">
            <div className="Quiz_dashboard_left">
              <div className="menu_btns">
                <button>
                  <a href="#">Exam creation</a>
                </button>
                <button>
                  <a href="#">Course creation</a>
                </button>
                <button>
                  <a href="#">Test creation</a>
                </button>
                <button>
                  <a href="#">Upload Paper</a>
                </button>
              </div>
            </div>
            <div className="Quiz_dashboard_right">
              <div className="Quiz_dashboard_right_subpart">
                <h2>Exam creation section</h2>
                {/* ------------------------------------- Exam_creation_section form --------------------------------- */}
                {/* <Create_exam /> */}

                {/* ------------------------------------- Exam_creation_section form --------------------------------- */}
              </div>
              <div className="Course_creation_section"></div>
              <div className="Test_creation_section"></div>
              <div className="Upload_creation_section"></div>
            </div>
          </div>
    </div>
  )
}

export default Quiz_dashboard
 