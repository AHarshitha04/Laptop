import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import './Home.css'
export const Read = () => {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000); // 3000 milliseconds (3 seconds)
    return () => clearTimeout(timer);
  }, []);

  const componentRef = useRef(null);

  const generatePDF = () => {
    if (!componentRef.current) return;

    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // const pdf = new jsPDF();
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("component.pdf");
    });
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {showAlert && (
        <div className="alertData">Please read Your submited data</div>
      )}
      {/* <div className="alertData">
         Please read Your submited data
        </div> */}

      {/* Your component content */}
      <div className="HomeBgkjds">
        <h2>student list</h2>
        <div>
          <Link to="/Create">Create</Link>
          <Link to="/pdf">pdf</Link>
          <Link to="/open">open</Link>
          <Link to="/pdf2">pdf2</Link>
          <Link to="/updateDemo">newUpdate</Link>
        </div>

        <div className="userData">
          <div className="userInfo">
            {data.map((student, index) => {
              return (
                <div key={index}>
                  <div ref={componentRef} className="reding_data">
                    <article>
                      <div className="regContent">
                        <div className="headTitlesHome">
                          <h2>REGISTRATION DETAILS</h2>
                        </div>

                        <div className="studentInfo">
                          <div className="student_list">
                            <h3>CANDIDATE NAME</h3>{" "}
                            <h3>{student.CandidateName}</h3>
                          </div>
                          <div className="student_list">
                            <h3>DATE OF BIRTH</h3>
                            <h3>{student.DataOfBirth}</h3>
                          </div>
                          <div className="student_list">
                            <h3>GENDER</h3>
                            <h3>{student.Gender}</h3>
                          </div>
                          <div className="student_list">
                            <h3>CATEGORY</h3>
                            <h3>{student.Category}</h3>
                          </div>
                          <div className="student_list">
                            <h3>EMAIL ID</h3>
                            <h3>{student.EmailId}</h3>
                          </div>
                          <div className="student_list">
                            <h3>CONFIRM EMAIL ID</h3>{" "}
                            <h3>{student.ConfirmEmailId}</h3>
                          </div>
                          <div className="student_list">
                            <h3>CONTACT NO</h3>
                            <h3>{student.ContactNo}</h3>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article>
                      <div className="regContent">
                        <div className="headTitlesHome">
                          <h2>FATHER'S/GUARDIAN'S DETAILS</h2>
                        </div>
                        <div className="studentInfo">
                          <div className="student_list">
                            <h3>FATHER'S NAME</h3>
                            <h3>{student.FathersName}</h3>
                          </div>
                          <div className="student_list">
                            <h3>OCCUPATION </h3> <h3>{student.Occupation}</h3>
                          </div>
                          <div className="student_list">
                            <h3>MOBILE NO</h3>
                            <h3>{student.MobileNo}</h3>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article>
                      <div className="regContent">
                        <div className="headTitlesHome">
                          <h2>COMMUNICATION ADDRESS</h2>
                        </div>
                        <div className="studentInfo">
                          <div className="student_list">
                            <h3>LINE 1</h3>
                            <h3>{student.Addres}</h3>
                          </div>
                          <div className="student_list">
                            <h3>CITY/TOWN</h3> <h3>{student.CityTown}</h3>
                          </div>
                          <div className="student_list">
                            <h3>STATE</h3>
                            <h3>{student.State}</h3>
                          </div>
                          <div className="student_list">
                            <h3>DISTRICT</h3>
                            <h3>{student.Distric}</h3>
                          </div>
                          <div className="student_list">
                            <h3>PINCODE</h3>
                            <h3>{student.PinCode}</h3>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article>
                      <div className="regContent">
                        <div className="headTitlesHome">
                          <h2>COURSE DETAILS</h2>
                        </div>
                        <div className="studentInfo">
                          <div className="student_list">
                            <h3>SESSION</h3>
                            <h3>{student.Session}</h3>
                          </div>
                          <div className="student_list">
                            <h3>COURSE</h3> <h3>{student.Course}</h3>
                          </div>
                          <div className="student_list">
                            <h3>EXAM</h3>
                            <h3>{student.Exam}</h3>
                          </div>
                          <div className="student_list">
                            <h3>SUBJECTS</h3>
                            <h3>{student.Stream1}</h3>
                          </div>
                          <div className="student_list">
                            <h3>BATCH</h3>
                            <h3>{student.batch}</h3>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article>
                      <div className="regContent">
                        <div className="headTitlesHome">
                          <h2>EDUCATION DETAILS</h2>
                        </div>
                        <div className="studentInfo">
                          <div className="student_list">
                            <h3>QUALIFICATION</h3>
                            <h3>{student.Session}</h3>
                          </div>
                          <div className="student_list">
                            <h3>NAME OF COLLEGE (WITH CITY)</h3>{" "}
                            <h3>{student.NameOfCollage}</h3>
                          </div>
                          <div className="student_list">
                            <h3>PASSING YEAR </h3>
                            <h3>{student.Passingyear}</h3>
                          </div>
                          <div className="student_list">
                            <h3>MARKS IN %</h3>
                            <h3>{student.MarksIn}</h3>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article>
                      <div className="regContent">
                        {/* <div className="headTitles"><h2>EDUCATION DETAILS</h2></div> */}
                        <div
                          className="studentLinks"
                          style={{
                            display: "flex",
                            gap: "2rem",
                            flexDirection: "column",
                          }}
                        >
                          {/* <div className="student_list"><Link to={`/read/${student.id}`}>read</Link></div> */}
                          <div className="student_list">
                            <h3> PHOTO *</h3>
                            <img
                              src={`/${student.UplodadPhto}`}
                              width={100}
                              alt=""
                            />
                          </div>

                          <div className="student_list">
                            <h3> SIGNATURE *</h3>
                            <img
                              src={`/${student.Signature}`}
                              width={100}
                              alt=""
                            />
                          </div>
                          <div className="student_list">
                            <h3> ID PROOF: *</h3>
                            <img src={`/${student.Proof}`} width={100} alt="" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>

                  <article>
                    <div className="regContent">
                      {/* <div className="headTitles"><h2>EDUCATION DETAILS</h2></div> */}
                      <div className="studentLinks">
                        {/* <div className="student_list"><Link to={`/read/${student.id}`}>read</Link></div> */}
                        <div className="student_lis">
                          <Link className="EditBtn" to={`/edit/${student.id}`}>
                            edit
                          </Link>
                        </div>

                        <div className="student_lis">
                          <Link
                            className="EditBtn"
                            onClick={() => {
                              alert("Data submited");
                              generatePDF(
                                document.getElementById("myComponent")
                              );
                            }}
                            to="/congratsPage"
                          >
                            SUBMIT
                          </Link>
                        </div>

                        {/* <div className="student_lis"><Link className="EditBtn"  onClick={() => generatePDF(document.getElementById('myComponent'))} to='/congratsPage'>SUBMIT</Link></div>   */}
                        {/* <button onClick={() => generatePDF(document.getElementById('myComponent'))}>Download PDF</button> */}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};
