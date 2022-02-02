import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from '@mui/material/CardHeader';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";

export const ResidentDetails = ({ getResidentDetailsById }) => {
  const { locationId, characterId } = useParams();
  const [notes, setNotes] = useState('');
  const [residentDetails, setResidentDetails] = useState(null);

  useEffect(() => {
    const details = getResidentDetailsById(+locationId, +characterId);
    setResidentDetails(details);
  }, [locationId, characterId, getResidentDetailsById]);

  const saveNotes = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        body: notes,
        characterId: characterId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if(response.ok){
        // resent the notes field 
        setNotes('');
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader title="Edit Resident Details"></CardHeader>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {residentDetails?.id}
        </Typography>
        <Typography variant="h6" component="div">
          {residentDetails?.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {residentDetails?.status}
        </Typography>
        <TextField value={notes} onChange={(event) => setNotes(event.target.value)} id="outlined-basic"  multiline label="Notes" variant="outlined" />
      </CardContent>
      <CardActions>
        <Button size="small" varient="contained" onClick={() => saveNotes()}>
          Save Notes
        </Button>
      </CardActions>
    </Card>
  );
};
