import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { AccessTime, Place } from "@mui/icons-material";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Props = {
  activity: Activity;
};
export default function ActivityCard({ activity }: Props) {
  const { isHost, isGoing, isCancelled } = activity;
  const label = isHost ? "You are hosting" : "You are going";
  const color = isHost ? "secondary" : isGoing ? "warning" : "default";
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={
            <Avatar
              src={activity.hostImageUrl}
              sx={{ height: 80, width: 80 }}
              alt="image of host"
            />
          }
          title={activity.title}
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: 20,
          }}
          subheader={
            <>
              Hosted by{" "}
              <Link to={`/profiles/${activity.hostId}`}>
                {activity.hostDisplayName}
              </Link>
            </>
          }
        />
        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(isHost || isGoing) && (
            <Chip
              variant="outlined"
              label={label}
              color={color}
              sx={{ borderRadius: 2 }}
            />
          )}
          {isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box display={"flex"} alignItems={"center"} mb={2} px={2}>
          <Box display={"flex"} flexGrow={0} alignItems={"center"}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider />
        <Box
          display={"flex"}
          gap={2}
          sx={{ backgroundColor: "grey.200", py: 3, pl: 3 }}
        >
          {activity.attendees.map((attendee) => (
            <AvatarPopover profile={attendee} key={attendee.id} />
          ))}
        </Box>
      </CardContent>
      <CardActions
        sx={{ pd: 4, display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="body2">{activity.description}</Typography>
        <Box display="flex" gap={3}>
          <Button
            component={Link}
            to={`/activities/${activity.id}`}
            size="medium"
            variant="contained"
            sx={{ display: "flex", justifySelf: "self-end", borderRadius: 3 }}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
