import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/client";
export default function Profile() {
const user = JSON.parse(localStorage.getItem("user"));
const [form, setForm] = useState(null);
const [saved, setSaved] = useState(false);
useEffect(() => {
getProfile(user.id).then((res) => setForm(res.data));
}, []);
if (!form) return <p>Loading…</p>;
const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
e.preventDefault();
await updateProfile(user.id, form);
setSaved(true);
};
return (
<div className="page">
<h1>My Profile</h1>
<form className="profile-form" onSubmit={handleSubmit}>
<input name="first_name" placeholder="First Name" value={form.first_name || ""} onChange={handleChange} />
<input name="last_name" placeholder="Last Name" value={form.last_name || ""} onChange={handleChange
} />
<input name="email" type="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
<input name="phone" placeholder="Phone" value={form.phone || ""} onChange={handleChange} />
<input name="dob" type="date" value={form.dob || ""} onChange={handleChange} />
<button type="submit" className="primary">Update</button>
{saved && <p className="success">Saved!</p>}
</form>
</div>
);
}