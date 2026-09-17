import { useState } from "react";

function PreferencePage() {
    const [studentDetails, setStudentDetails] = useState({
        studentId: "",
        fullName: "",
        CWA: "",
        pref1: "",
        pref2: "",
        pref3: "",
        pref4: "",
        pref5: "",
        dislikePref1: "",
        dislikePref2: "",
        dislikePref3: "",
        dislikePref4: "",
        dislikePref5: ""
    });

    const inputChanges = (e) => {
        const { name, value } = e.target;

        setStudentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <div className="pref-page">
            <div className="pref-container">
                <label> Student ID </label>
                <input 
                    type="number"
                    name="studentId"
                    value={studentDetails.studentId}
                    onChange={inputChanges}
                    placeholder="Student ID"
                />

                <label> Full Name </label>
                <input 
                    type="text"
                    name="fullName"
                    value={studentDetails.fullName}
                    onChange={inputChanges}
                    placeholder="Full Name"
                />

                <label> Course Weighted Average (CWA) </label>
                <input 
                    type="number"
                    step="0.01"
                    name="CWA"
                    value={studentDetails.CWA}
                    onChange={inputChanges}
                    placeholder="Course Weighted Average"
                />

                <div className="radio-container">
                    <label> Email Notifications </label>
                    <label className="radio-opt">
                        <input
                            type="radio"
                            name="emailNotifications"
                            value="Yes"
                            onChange={inputChanges}
                        />
                        Yes, send me emails
                    </label>

                    <label className="radio-opt">
                        <input
                            type="radio"
                            name="emailNotifications"
                            value="No"
                            onChange={inputChanges}
                        />
                        No, opt out of emails
                    </label>

                    <label> Select your course / major </label>
                    <label className="radio-opt">
                        <input 
                            type="radio"
                            name="major"
                            value="opt1"
                            onChange={inputChanges}
                        />
                        Bachelor of Computing (Computer Science) 
                    </label>

                    <label className="radio-opt">
                        <input 
                            type="radio"
                            name="major"
                            value="opt2"
                            onChange={inputChanges}
                        />
                        Bachelor of Computing (Cyber Security)
                    </label>

                    <label className="radio-opt">
                        <input 
                            type="radio"
                            name="major"
                            value="opt3"
                            onChange={inputChanges}
                        />
                        Bachelor of Computing (Software Engineering)
                    </label>

                    <label className="radio-opt">
                        <input 
                            type="radio"
                            name="major"
                            value="opt4"
                            onChange={inputChanges}
                        />
                        Bachelor of Information Technology
                    </label>

                    <label className="radio-opt">
                        <input 
                            type="radio"
                            name="major"
                            value="opt5"
                            onChange={inputChanges}
                        />
                        Other
                    </label> 
                </div>

                <label> 1st Preference - Name of student you would like to be in a group with </label>
                <input
                    type="text"
                    name="pref1"
                    value={studentDetails.pref1}
                    onChange={inputChanges}
                    placeholder="1st Preference"
                />

                <label> 2nd Preference - Name of student you would like to be in a group with </label>
                <input
                    type="text"
                    name="pref2"
                    value={studentDetails.pref2}
                    onChange={inputChanges}
                    placeholder="2nd Preference"
                />

                <label> 3rd Preference - Name of student you would like to be in a group with </label>
                <input
                    type="text"
                    name="pref3"
                    value={studentDetails.pref3}
                    onChange={inputChanges}
                    placeholder="3rd Preference"
                />

                <label> 4th Preference - Name of student you would like to be in a group with </label>
                <input
                    type="text"
                    name="pref4"
                    value={studentDetails.pref4}
                    onChange={inputChanges}
                    placeholder="4th Preference"
                />

                <label> 5th Preference - Name of student you would like to be in a group with </label>
                <input
                    type="text"
                    name="pref5"
                    value={studentDetails.pref5}
                    onChange={inputChanges}
                    placeholder="5th Preference"
                />

                <label> 1st Preference - Name of student you would NOT like to be in a group with </label>
                <input
                    type="text"
                    name="dislikePref1"
                    value={studentDetails.dislikePref1}
                    onChange={inputChanges}
                    placeholder="1st Preference"
                />

                <label> 2nd Preference - Name of student you would NOT like to be in a group with </label>
                <input
                    type="text"
                    name="dislikePref2"
                    value={studentDetails.dislikePref2}
                    onChange={inputChanges}
                    placeholder="2nd Preference"
                />

                <label> 3rd Preference - Name of student you would NOT like to be in a group with </label>
                <input
                    type="text"
                    name="dislikePref3"
                    value={studentDetails.dislikePref3}
                    onChange={inputChanges}
                    placeholder="3rd Preference"
                />

                <label> 4th Preference - Name of student you would NOT like to be in a group with </label>
                <input
                    type="text"
                    name="dislikePref4"
                    value={studentDetails.dislikePref4}
                    onChange={inputChanges}
                    placeholder="4th Preference"
                />

                <label> 5th Preference - Name of student you would NOT like to be in a group with </label>
                <input
                    type="text"
                    name="dislikePref5"
                    value={studentDetails.dislikePref5}
                    onChange={inputChanges}
                    placeholder="5th Preference"
                />

                <button type="submit">
                    Submit
                </button>

            </div>
        </div>
    )
}

export default PreferencePage;