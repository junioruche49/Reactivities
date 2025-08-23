import { Grid, Typography } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivityDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList />
      </Grid>
      <Grid size={5}>
        <Typography>Activity form</Typography>
      </Grid>
    </Grid>
  );
}
