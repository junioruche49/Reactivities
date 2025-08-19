import { useEffect, useState } from "react";
import "./App.css";
import type { Activity } from "./lib/types";
import { List, ListItem, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5046/api/Activities")
      .then((response) => setActivities(response.data));
  }, []);
  return (
    <>
      <Typography variant="h3">Reactivities</Typography>
      <List>
        {activities.map((data) => (
          <ListItem key={data.id}>{data.title}</ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
