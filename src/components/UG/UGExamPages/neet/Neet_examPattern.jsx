import React from 'react'
import '../../Exams.css'

export const Neet_examPattern = () => {
  return (
    <div>
        <table className='examtbl'>
            <thead>
                <tr>
                    <th>Mode of examination</th>
                    <th>Pen and Paper Mode</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>NTA NEET 2023 exam date</td>
                    <td>May 7, 2023</td>
                </tr>
                <tr>
                    <td>Total marks in NEET</td>
                    <td>720 Marks</td>
                </tr>
                <tr>
                    <td>Total number of questions</td>
                    <td>A total of 200 questions will be asked out of which candidates will have to answer 180 questions</td>
                </tr>
                <tr>
                    <td>Question Type</td>
                    <td>Multiple choice questions type</td>
                </tr>
                <tr>
                    <td>Examination Duration</td>
                    <td>3 hours and 20 minutes(200 minutes)</td>
                </tr>
                <tr>
                    <td>Subjects covered</td>
                    <td>Physics, Chemistry & Biology (Zoology & Botany) subjects</td>
                </tr>
                <tr>
                    <td>Language/Medium</td>
                    <td>8 languages including English, Tamil, Hindi, Assamese, Gujarati, Bengali, Telugu and Marathi languages</td>
                </tr>
                <tr>
                    <td>NEET marking scheme 2023</td>
                    <td>
                        <ul className='ExamsUl_list'>
                            <li>4 marks will be awarded for each correct answer</li>
                            <li>One mark will be deducted for each wrong attempt</li>
                            <li>No marks for unanswered question</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
