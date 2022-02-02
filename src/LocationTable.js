import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CharacterCard } from "./CharacterCard";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";

function Row(props) {
  const { row, characters } = props;
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const onClick = (resident) => {
    navigate(`../locations/${row.id}/characters/${resident.id}`, { replace: true });
  };
  return (
    <React.Fragment>
      <TableRow key={row.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Residents
              </Typography>
              <Grid container spacing={2}>
                {characters.map((residentRow) => (
                  <Grid item md={3} key={residentRow.id}>
                    <div onClick={() => onClick(residentRow)}>
                      <CharacterCard
                        imageUrl={residentRow.image}
                        name={residentRow.name}
                        status={residentRow.status}
                      ></CharacterCard>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function LocationTable({ rows, charactersMap }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Location Name</TableCell>
            <TableCell>Location Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              characters={charactersMap?.get(row.id) ?? []}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
