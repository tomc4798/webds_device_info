import React from 'react';
//--- @material-ui/core
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
//--- @mui/material
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
//--- @mui/material/styles
import ThemeProvider from '@mui/material/styles/ThemeProvider';
//---
import webdsTheme from './webdsTheme';

import {DvcInfoAsicIcon} from './dvcInfoIcons';


export const WidgetComponent = (props:any): JSX.Element => {
    return (
        <ThemeProvider theme={webdsTheme}>
            <div>
                <Stack
                    spacing={5}
                    divider={<Divider orientation='horizontal' sx={{width:475}} />}
                    sx={{marginLeft:5, marginTop:5}}
                >
                    <Stack
                        spacing={2}
                        sx={{whiteSpace:'nowrap'}}
                    >
                    <Box style={{overflow: 'auto'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} style={{borderRight: "3px solid grey" }}>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Paper
                                        variant="outlined"
                                        style={{
                                            display: 'inline-block',
                                            minWidth:200,
                                            textAlign: 'center',
                                            borderWidth: 5,
                                            borderRadius: "25px",
                                            borderColor: "#000000",
                                            backgroundColor: "#000000"
                                        }}
                                    >
                                        <DvcInfoAsicIcon/>
                                        <p>
                                            <Typography component="span" variant='h1'>
                                                {props.messageOfPartNumber}
                                            </Typography>
                                        </p>
                                    </Paper>
                                </Box>
                                <Paper
                                    variant="outlined"
                                    style={{borderWidth: 20, borderColor: "#FFFFFF", backgroundColor: "#FFFFFF"}}
                                />
                                <p>
                                    <TextField
                                        variant="standard"
                                        multiline={true}
                                        fullWidth={true}
                                        defaultValue={props.messageOfIdentify}
                                        value={props.messageOfIdentify}
                                        InputProps={
                                            {
                                                readOnly: true,
                                                style: {
                                                    fontSize: 22,
                                                    color: "#505050",
                                                    fontWeight: 600
                                                },
                                                disableUnderline: true,
                                            }
                                        }
                                    />
                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper
                                    variant="outlined"
                                    style={{borderWidth: 5, borderColor: "#FFFFFF", textAlign: 'center'}}
                                >
                                    <Typography component="span"  variant='h3'>
                                        Application Info
                                    </Typography>
                                </Paper>
                                <p>
                                    <TextField
                                        variant="standard"
                                        multiline={true}
                                        fullWidth={true}
                                        defaultValue={props.messageOfAppInfo}
                                        value={props.messageOfAppInfo}
                                        InputProps={
                                            {
                                                readOnly: true,
                                                style: {
                                                    fontSize: 22,
                                                    color: "#505050",
                                                    fontWeight: 600
                                                },
                                                disableUnderline: true,
                                            }
                                        }
                                    />
                                </p>
                            </Grid>
                        </Grid>
                    </Box>
                    </Stack>
                    <p>
                        <Typography align='left'>
                            <Button
                                variant='contained'
                                component='span'
                                sx={{minWidth:100, maxWidth:100, marginRight:3}}
                                onClick={(e: React.MouseEvent<HTMLElement>) => props.doRefresh(e, 'refresh_button')}
                            >
                                Refresh
                            </Button>
                        </Typography>
                    </p>
                </Stack>
            </div>
        </ThemeProvider>
    );
};
