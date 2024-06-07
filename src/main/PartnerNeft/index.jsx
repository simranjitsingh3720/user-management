import { Card, CardContent, Grid, Button, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

function PartnerNeft() {
  const navigate = useNavigate();

  const createNeftForm = () => {
    navigate("/partner-neft-form");
  };
  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Button
                type="submit"
                variant="contained"
                className={styles.primaryBtn}
                onClick={createNeftForm}
              >
                Create New NEFT Flag
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PartnerNeft;
