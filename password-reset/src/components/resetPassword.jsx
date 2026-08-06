/* reset password */
import { useState } from "react";
import Curtin_University from "../assets/Curtin_University.png";

function ResetPassword() {
    const [error, setError] = useState("");
    const [details, setDetails] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const inputChanges = (e) => {
        const { name, value } = e.target;

        setDetails(prevDetails => ({
            ...prevDetails, 
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (details.newPassword !== details.confirmPassword) {
            setError("Passwords do not match. Please re-enter your new password.");
            return;
        }

        setError("");
        alert("Password reset successful!");
    };

    return(
        <div className="form-container">
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <img src={Curtin_University} alt="Curtin University" className="logo" />
                    <h1>
                        Reset your Password
                    </h1>
                    
                    <h3> 
                        Create a strong password to secure your account
                    </h3>
                    <label> New password </label>
                    <input 
                        type="password"
                        name="newPassword"
                        value={details.newPassword}
                        onChange={inputChanges}
                        placeholder="new password"
                    />

                    <label> Re-enter new password </label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        value={details.confirmPassword}
                        onChange={inputChanges}
                        placeholder="re-enter new password"
                    />

                    <button type="submit">
                        Reset Password
                    </button>

                    {error && (
                        <p className="error">
                            {error}
                        </p>)}

                </form>
            </div>
        </div>
    )
}

export default ResetPassword;