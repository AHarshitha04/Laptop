import React, { useState } from 'react'
// import { Pg_Footer_Data } from './Pg_faqData'
import './pg_faq.css'

export const Pg_Fax = () => {
    const [selected, setSelected] = useState(null)
    const toggle2 = (i1) => {
        // return i
        if (selected === i1) {
            return setSelected(null)

        }
        setSelected(i1)
    }
  return (
    <div className='Pg_faq Pg_Container' id='faq'>
    <div className="pg_wrapper-3 ">
    
    <div className='pg_faqheading' >
        <h1>FREQUENTLY ASKED QUESTIONS</h1>
  
    </div>
        <div className="pg_accordion2">
            {Pg_Footer_Data.map((item, i2) => (
                <div className="item2">
                    <div className="Pg_faqtitle" onClick={() => toggle2(i2)}>
                        <h2>{item.Qustion}</h2>
                        <span>{selected === i2 ? '-' : '+'}</span>
                    </div>
                    <div className={selected === i2 ? 'pg_content-show2' : 'pg_content2'}>{item.answer}</div>
                </div>
            ))}

        </div>

    </div>
</div>
  )
}


const Pg_Footer_Data = [
    {
        Qustion: "What information do we need for registration?",
        answer: "Name, contact number, email id, password, country, city."
    },

    {
        Qustion: "Will the money be refunded?",
        answer: "No refund will be given if a student wishes to opt out during the period of subscription. We will try to resolve any technical issues in the payment within 48 hours of credit to our account."
    },
    {
        Qustion: "Do we provide any demo tests?",
        answer: "Yes, we provide the demo test for those who get registered."
    },

    {
        Qustion: "Are there any discount/coupons available for OTS?",
        answer: "Yes, if you are referred by any of our faculty. You can use the same while making the payment."
    },

    {
        Qustion: " I did not get my answer from the above FAQs, whom should I contact?",
        answer: "In case you didn’t get the information, you are looking for, you can contact the eGRADTutor Helpdesk number: +91-7993270532, Email: Info@egradtutor.in."
    },
    {
        Qustion: "What is the mode of registration?",
        answer:"Registration mode will be online."
    },
      {
          Qustion: "What is the mode of payment?",
          answer: "Payment can be done through debit card, credit card, UPI, Net banking."
    },
    {
        Qustion: "What if the money debited and the test is not accessible?",
        answer: "Please contact our web team -info@egradtutor.in they will try to resolve it in 24 hours."
    },
    {
        Qustion: " Do we need to make a payment to get registered?",
        answer: "No. Registration is free of cost, and you need to make payment only when you subscribe to any of our products."
    },
    {
        Qustion: "Who created the test series?",
        answer: "These tests are created by top faculty across India who have 10+Years of experience and by the graduates from IIT/ IISC, IISER."
    },
   

    
]