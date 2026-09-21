import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { getStats, getMatches } from "../api/client";
import StatCard from "../components/StatCard";
import MatchTable from "../components/MatchTable";
import MatchModal from "../components/MatchModal";
export default function Dashboard() {
const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate();
const [stats, setStats] = useState(null);
const [matches, setMatches] = useState([]);
const [modalOpen, setModalOpen] = useState(false);
const [editingMatch, setEditingMatch] = useState(null);
const loadData = async () => {
const [statsRes, matchesRes] = await Promise.all([
getStats(user.id),
getMatches(user.id),
]);
setStats(statsRes.data);
setMatches(matchesRes.data);
};
useEffect(() => { loadData(); }, []);
const chartOptions = {
title: { text: "Runs per Match" },
xAxis: { categories: matches.map((m) => m.opponent).reverse() },
yAxis: { title: { text: "Runs" } },
series: [{ name: "Runs", data: matches.map((m) => m.runs).reverse(), color: "#2463eb" }],
credits: { enabled: false },
};
const openAdd = () => { setEditingMatch(null); setModalOpen(true); };
const openEdit = (match) => { setEditingMatch(match); setModalOpen(true); };
return (
<div className="page">
<div className="topbar">
<h1>Cricket Stats</h1>
<div>
<button onClick={() => navigate("/profile")}>My Profile</button>
<button className="primary" onClick={openAdd}>Add Entry</button>
</div>
</div>
{stats && (
<div className="cards-row">
<StatCard label="Total Matches" value={stats.total_matches} />
<StatCard label="Total Runs" value={stats.total_runs} />
<StatCard label="Total Wickets" value={stats.total_wickets} />
</div>
)}
<div className="chart-card">
<HighchartsReact highcharts={Highcharts} options={chartOptions} />
</div>
<MatchTable matches={matches} onEdit={openEdit} />
{modalOpen && (
<MatchModal
userId={user.id}
match={editingMatch}
onClose={() => setModalOpen(false)}
onSaved={() => { setModalOpen(false); loadData(); }}
/>
)}
</div>
);
}
