export default function MatchTable({ matches, onEdit }) {
return (
<table className="match-table">
<thead>
<tr>
<th>Against</th><th>Date</th><th>Runs</th><th>Wickets</th>
<th>Catches</th><th>Result</th><th>Notes</th><th></th>
</tr>
</thead>
<tbody>
{matches.map((m) => (
<tr key={m.id}>
<td>{m.opponent}</td>
<td>{m.match_date}</td>
<td>{m.runs}</td>
<td>{m.wickets}</td>
<td>{m.catches}</td>
<td>{m.result}</td>
<td>{m.notes}</td>
<td><button onClick={() => onEdit(m)}>Edit</button></td>
</tr>
))}
</tbody>
</table>
);
}