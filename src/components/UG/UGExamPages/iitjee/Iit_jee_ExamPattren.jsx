import React from 'react'
import '../../Exams.css'

export const Iit_jee_ExamPattren = () => {
  return (
    <div>

      <div className='jee-EXAM_PATTERN'>
          <ul className='ExamsUl_list'>
            <p><b>MAINS:</b></p>
            <li>Candidates must go through following details regarding JEE Main 2023 Exam Pattern:</li>
            <li><b>Mode of Exam:</b>It will be conducted via online (Computer-based) mode. However, Paper 2(Drawing test) will be held via pen-paper based mode.</li>
            <li><b> Number of Papers:</b>There will be two papers in JEE Main - Paper I for B.E/ B.Tech & Paper 2 for B.Arch/ B.Plan.</li>
            <li><b> Time Duration:</b>Candidates will get 3 hours to solve the paper. For PWD, 1 hour will be provided extra.</li>
            <li><b>Questions Type:</b>Objective type questions will be asked in the exam. Paper 2 will be subjective in nature.</li>
            <li><b>Number of Questions:</b>There will be total 90 questions in Paper I (B.Tech/B.E) & 82 in Paper II A (B.Arch) and 105 questions in Paper II B (B.Plan).</li>
            <li><b>Languages:</b>Candidates will be able to attempt JEE Main in various languages. These are English, Gujarati, Hindi, Bengali, Malayalam, Kannada, Marathi, Odia, Assamese, Tamil, Urdu, Telugu & Punjabi.</li>
            <li><b>Marks:</b>Paper 1 will consist of 300 marks; Paper II A & Paper II B will consist of 400 marks.</li>
            <li><b>Marking Scheme:</b>For each correct answer, 4 marks will be given. 1 mark will be deducted for every incorrect answer.</li>
            <br />
{/* its for •ADVANCED: */}
            <p><b>ADVANCED:</b></p>
            <li>The exam pattern of JEE Advanced 2023 includes details such as exam mode, marking scheme, the total number of questions, type of questions, etc. Check complete details:</li>
            <li><b> Mode of Exam:</b>JEE Advanced will be held in Online (Computer-based test) mode.</li>
            <li><b> Number of Papers:</b>There will be 2 Papers 1 & 2 (Both Mandatory).</li>
            <li><b>Time Duration:</b>3 hours will be provided for each paper (4 hours for PwD candidates).</li>
            <li><b> Subjects:</b>Questions in the paper will be from three subjects – Physics, Chemistry & Mathematics.</li>
            <li><b>Questions Type:</b>There will be MCQs in the paper with single correct options.</li>
            <li><b>Marking Scheme:</b>As per marking pattern, marks for vary for each correct answer. While negative marking will be done in some of the questions with incorrect responses.</li>
            <li><b> Languages:</b>Paper will be available in both Hindi and English language.</li>
          </ul>
      </div>

<br />
      <p>Check in the table below Paper 1 & 2 questions and marks distribution:</p>

             <table className='examtbl'>
                        <tr>
                          <th>Subjects</th>
                          <th>No.of Questions</th>
                          <th>Total No.of Marks</th>
                          <th>Marking(Per questions)</th>
                          <th>Negative Marking</th>
                        </tr>
                        <tr>
                          <td>Physics  </td>
                          <td> 5</td>
                          <td>15</td>
                          <td>3</td>
                          <td>1</td>
                          
                        </tr>
                        <tr>
                          <td> Chemistry</td>
                          <td>5</td>
                          <td>32</td>
                          <td>4</td>
                          <td>2</td>
                        
                        </tr>
                        <tr>
                          <td> Mathematics</td>
                          <td>5</td>
                          <td>15</td>
                          <td>3</td>
                          <td>1</td>
                         
                        </tr>
                      
                      </table>

                      <br/>
                      <b>Paper II:</b><br/>
                  
                      <table className='examtbl'>
                        <tr>
                          <th>Subjects</th>
                          <th>No.of Questions</th>
                          <th>Total No.of Marks</th>
                          <th>Marking(Per questions)</th>
                          <th>Negative Marking</th>
                        </tr>
                        <tr>
                          <td>Physics  </td>
                          <td> 6</td>
                          <td>18</td>
                          <td>3</td>
                          <td>1</td>
                          
                        </tr>
                        <tr>
                          <td> Chemistry</td>
                          <td>8</td>
                          <td>32</td>
                          <td>4</td>
                          <td>2</td>
                        
                        </tr>
                        <tr>
                          <td> Mathematics</td>
                          <td>4</td>
                          <td>12</td>
                          <td>3</td>
                          <td>-</td>
                         
                        </tr>
                      
                      </table >

<br />
                      <b> For AAT:</b>                 
                      <table className='examtbl'>
                        <tr>
                          <th>Subjects</th>
                          <th>No.of Questions</th>
                          <th>Total No.of Marks</th>
                          
                        </tr>
                        <tr>
                          <td>Mathematics  </td>
                          <td> 30</td>
                          <td>120</td>
                         
                          
                        </tr>
                        <tr>
                          <td> Aptitude Test </td>
                          <td>50</td>
                          <td>200</td>
                 
                        
                        </tr>
                        <tr>
                          <td> Drawing Test </td>
                          <td>2</td>
                          <td>70</td>
                          
                         
                        </tr>
                      
                      </table>
    </div>
  )
}
