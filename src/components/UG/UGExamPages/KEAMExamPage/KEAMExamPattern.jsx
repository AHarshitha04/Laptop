import React from 'react'
import '../../Exams.css'

const KEAMExamPattern = () => {
  return (
    <div>
        <ul className='ExamsUl_list'>
            <li><b>Mode of Exam: </b>The exam will be conducted in offline mode only.</li>
            <li><b>Sections: </b>The paper will be divided into two parts Paper-1 Physics & Chemistry and Paper-2 Mathematics.</li>
            <li><b>Duration: </b>The exam duration of the exam for each paper will be of 2 hours and 30 minutes.</li>
            <li><b>Type of Question: </b>The exam will be of Objective type with Multiple Choice Questions.</li>
            <li><b>Number of Questions: </b>There will be a total 120 questions in each paper.</li>
            <li><b>Marking Scheme: </b>For every correct answer 4 marks will be given and for every incorrect response, 1 mark will be deducted.</li>

            <table className='examtbl'>
                <tr>
                    <th>Papers</th>
                    <th>Subject</th>
                    <th>No.Of questions</th>
                    <th>Total Marks</th>
                </tr>
                <tr>
                    <td>Paper 1</td>
                    <td>Physics & Chemistry</td>
                    <td>120	</td>
                    <td>480</td>
                </tr>
                <tr>
                    <td>Paper 2</td>
                    <td>Mathematics</td>
                    <td>120</td>
                    <td>480</td>
                </tr>
            </table>
        </ul>
    </div>
  )
}

export default KEAMExamPattern