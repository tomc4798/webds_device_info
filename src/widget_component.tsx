import React from 'react';
//--- @mui/material/styles
import ThemeProvider from '@mui/material/styles/ThemeProvider';
//--- @mui/material
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
//---
import webdsTheme from './webdsTheme';

import {DvcInfoAsicIcon} from './dvcInfoIcons';

const DvcInfoParser = (info:string): string[] => {
  const temp = info.split("\n");
  return (temp);
};

export const WidgetComponent = (props:any): JSX.Element => {
    let identify_info = DvcInfoParser(props.messageOfIdentify);
    let app_info = DvcInfoParser(props.messageOfAppInfo);
    let identify_header = DvcInfoParser(props.messageOfIdentifyHeader);
    return (
        <ThemeProvider theme={webdsTheme}>
            <div>
                <Stack
                    spacing={2}
                    divider={<Divider orientation='horizontal' sx={{width:475}} />}
                    sx={{marginLeft:2, marginTop:2}}
                >
                    <Stack
                        spacing={2}
                        sx={{whiteSpace:'nowrap'}}
                    >
                        <div style={{ display: "flex" }}>
                            <div style={{ borderRight: "20px solid white" }}>
                                <Paper
                                    variant="outlined"
                                    style={{
                                    display: "inline-block",
                                    minWidth: 200,
                                    minHeight: 200,
                                    textAlign: "center",
                                    borderLeft: "10px solid white",
                                    borderWidth: 2,
                                    borderRadius: "5px",
                                    borderColor: "#000000",
                                    backgroundColor: "#000000"
                                    }}
                                >
                                    <DvcInfoAsicIcon/>
                                    <p
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 600,
                                        color: "white"
                                    }}
                                    >
                                    {props.messageOfPartNumber}
                                    </p>
                                </Paper>
                                <p style={{color:'#FFFFFF'}}>NULL Text</p>
                                <Typography
                                    align="left"
                                    style={{ 
                                        fontSize: 18,
                                        fontWeight: 600,
                                        lineHeight: "36px",
                                    }}
                                >
                                    {identify_header.map((info) => (
                                        <p>{info}</p>
                                    ))}
                                </Typography>
                                <Typography
                                    align="left"
                                    style={{ 
                                        fontSize: 18,
                                        lineHeight: "36px",
                                    }}
                                >
                                    {identify_info.map((info) => (
                                        <p>{info}</p>
                                    ))}
                                </Typography>
                            </div>
                            <div style={{ borderRight: "1px solid #DADADA" }} />
                            <div style={{ borderLeft: "20px solid white" }}>
                                <p
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 600
                                    }}
                                >
                                    Application Information
                                </p>
                                <Typography
                                    align="left"
                                    style={{ 
                                        fontSize: 18,
                                        lineHeight: "30px",
                                        borderTop: "10px solid white"
                                    }}
                                >
                                    {app_info.map((info) => (
                                        <p>{info}</p>
                                    ))}
                                </Typography>
                            </div>
                        </div>
                    </Stack>
                    <p>
                            <Typography
                                align='left'
                                style={{
                                    marginLeft: 190
                                }}
                            >
                                <Button
                                    variant='contained'
                                    component="span"
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
