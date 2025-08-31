import React, { useState } from "react";

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Call backend API
		try {
			const response = await fetch("http://localhost:3000/api/users/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			if (response.ok) {
				setMessage(data.message);
				setFormData({ username: "", email: "", password: "" });
			} else {
				setMessage(data.message || "Registration failed");
			}
		} catch (error) {
			setMessage("Server error");
		}
	};

	return (
		<div>
			<h2>User Registration</h2>
			{message && <p>{message}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						name="username"
						type="text"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</label>
				<br />
				<label>
					Email:
					<input
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label>
				<br />
				<button type="submit">Register</button>
			</form>
		</div>
	);
}
