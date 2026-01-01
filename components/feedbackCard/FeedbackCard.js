import React from 'react'
import "./style.css"

const FeedbackCard = (props) => {
    const { feedback } = props


    return (
        <div key={feedback.fid} className="card">
            <img className="" src={feedback.pfp} alt="profile pic" />
            <div className="right grid gap-2 w-full">
                <ul className="top">
                    <span>{feedback.name}</span>
                    <span>{feedback.date}</span>
                </ul>
                <ul className="bottom text-sm">
                    <p className="font-semibold">{feedback.subject}</p>
                    <p>{feedback.description}</p>
                </ul>
            </div>
        </div>
    )
}

export default FeedbackCard