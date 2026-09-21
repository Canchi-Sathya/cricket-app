import { useState } from "react";
import { createMatch, updateMatch } from "../api/client";

const empty = { opponent: "", match_date: "", runs: 0, wickets: 0, catches: 0, result: "Win", notes: "" };
export default function MatchModal({ userId, match, onClose, onSaved }) {
const [form, setForm] = useState(match || empty);
const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
e.preventDefault();
if (match) {
await updateMatch(match.id, form);
} else {
await createMatch({ ...form, user_id: userId });
}
onSaved();
};
return (
<div className="modal-backdrop">
<div className="modal">
<h2>{match ? "Edit Match" : "Add Match"}</h2>
<form onSubmit={handleSubmit}>
<input name="opponent" placeholder="Against" value={form.opponent} onChange={handleChange} requir
ed />
<input name="match_date" type="date" value={form.match_date} onChange={handleChange} required />
<input name="runs" type="number" placeholder="Runs" value={form.runs} onChange={handleChange} />
<input name="wickets" type="number" placeholder="Wickets" value={form.wickets} onChange={handleChange} />
<input name="catches" type="number" placeholder="Catches" value={form.catches} onChange={handleChange} />
<select name="result" value={form.result} onChange={handleChange}>
<option>Win</option><option>Loss</option><option>Draw</option><option>Tie</option>
</select>
<textarea name="notes" placeholder="Other notes" value={form.notes} onChange={handleChange} />
<div className="modal-actions">
<button type="button" onClick={onClose}>Cancel</button>
<button type="submit" className="primary">Save</button>
</div>
</form>
</div>
</div>
);
}