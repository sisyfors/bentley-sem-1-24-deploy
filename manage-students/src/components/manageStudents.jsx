/* Edit or Remove Students */
import { useState } from "react";

function ManageStudents() {
    const [student, setStudents] = useState([
        {
            id: 1, 
            name: "Josiah Barnes",
            email: "josiah@student.curtin.edu.au",
            course: "Software Engineering",
            cwa: 68.6
        },
        {
            id: 2, 
            name: "Noel Kapadia",
            email: "noel@student.curtin.edu.au",
            course: "Information Technology",
            cwa: 61.2
        },
        {
            id: 3, 
            name: "Amelia Koh",
            email: "amelia@student.curtin.edu.au",
            course: "Computer Science",
            cwa: 61.2
        }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);  

    const [studentDetails, setStudentDetails] = useState({
        name: "",
        email: "",
        course: "",
        cwa: ""
    });

    const inputChanges = (e) => {
        const { name, value } = e.target;

        setStudentDetails(prevDetails => ({
            ...prevDetails, 
            [name]: value
        }));
    };

    const handleEdit = (student) => {
        setPendingDelete(null);
        setEditingId(student.id);

        setStudentDetails({
            name: student.name,
            email: student.email,
            course: student.course,
            cwa: student.cwa
        });
    };

    const handleRemove = (id) => {
        setEditingId(null);
        setPendingDelete(id);
    };

    const handleSave = () => {
        setStudents(prevStudents => 
            prevStudents.map(student => 
                student.id === editingId
                    ? {
                        ...student,
                        ...studentDetails
                    }
                    : student
            )
        );
        setEditingId(null);
    };

    const confirmDelete = (id) => {
        setStudents((prevStudents) => 
            prevStudents.filter(student => student.id !== id));
        setPendingDelete(null);
    };
    
    return (
        <div className="form-container">
            <div className="form-box">
                <h3>Student Details</h3>
                {student.map((student) => {
                    const isEditing = editingId === student.id;
                    const isDeleting = pendingDelete === student.id;
    
                    return (
                        <div key={student.id} className="student">
                            {isEditing ? (
                                <>
                                    <div className="edit-container">

                                    <input 
                                        type="text"
                                        name="name"
                                        value={studentDetails.name}
                                        onChange={inputChanges}
                                    />
                                    <input 
                                        type="email"
                                        name="email"
                                        value={studentDetails.email}                                            onChange={inputChanges}
                                    />
                                    <input 
                                        type="text"
                                        name="course"
                                        value={studentDetails.course}
                                        onChange={inputChanges}
                                    />
                                    <input 
                                        type="number"
                                        name="cwa"
                                        value={studentDetails.cwa}
                                        onChange={inputChanges}
                                    />
                                    
                                    <button onClick={handleSave}
                                        title="Save student">
                                        Save
                                    </button>

                                    <button onClick={() => setEditingId(null)}
                                        title="Cancel Editing">
                                        Cancel
                                    </button>
                                </div> 
                            </>
                        ) : isDeleting ? (
                            <>
                                <div className="delete-container">
                                    <h4>{student.name}</h4>
                                    <h4>{student.email}</h4>
                                    <h4>{student.course}</h4>
                                    <h4>CWA: {student.cwa}</h4>
                                    <div className="confirm-delete-container">
                                        <p>
                                            Are you sure you want to remove{" "}
                                            <strong>{student.name}</strong>?
                                        </p>

                                        <button onClick={() => setPendingDelete(null)}
                                        >
                                            Cancel
                                        </button>

                                        <button onClick={() => confirmDelete(student.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="student-details">
                                    <h4>{student.name}</h4>
                                    <h4>{student.email}</h4>
                                    <h4>{student.course}</h4>
                                    <h4>CWA: {student.cwa}</h4>

                                    <button onClick={() => handleEdit(student)}
                                        title="Edit student">
                                        Edit
                                    </button>
                                    <button onClick={() => handleRemove(student.id)}
                                        title="Remove student">
                                        Remove
                                    </button>
                                </div>
                            </>
                        )}

                        </div>

                    );
                })}
                </div> 
            </div>
        );
}

export default ManageStudents;