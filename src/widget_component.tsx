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
import webdsTheme from './webds_theme';

import {DvcInfoAsicIcon} from './dvcInfoIcons';

const DvcInfoParser = (info:string): string[] => {
  const temp = info.split("\n");
  return (temp);
};

const AsicParser = (info:string): string => {
  const temp = info.split("-");
  return (temp[0].toUpperCase());
};

export const WidgetComponent = (props:any): JSX.Element => {
    let identify_info = DvcInfoParser(props.messageOfIdentify);
    let app_info = DvcInfoParser(props.messageOfAppInfo);
    let identify_header = DvcInfoParser(props.messageOfIdentifyHeader);
    let asic_type = AsicParser(props.messageOfPartNumber);

    return (
        <ThemeProvider theme={webdsTheme}>
            <div>
                <Stack
                    spacing={2}
                    divider={<Divider orientation='horizontal' sx={{width:750}} />}
                    sx={{marginLeft:'42px', marginTop:'32px'}}
                >
                    <Stack
                        spacing={2}
                        sx={{whiteSpace:'nowrap'}}
                    >
                        <div style={{ display: "flex" }}>
                            <div id='upStackLayout' style={{ borderRight: "32px solid white" }}>
                                <div
                                    style={{
                                    textAlign: "center",
                                    }}
                                >
                                    <Paper
                                        variant="outlined"
                                        style={{
                                            display: "inline-block",
                                            minWidth: 170,
                                            minHeight: 170,
                                            textAlign: "center",
                                            borderLeft: "10px solid white",
                                            borderWidth: 2,
                                            borderRadius: "5px",
                                            borderColor: "#000000",
                                            backgroundColor: "#000000"
                                        }}
                                    >
                                        <p style={{color:'#000000', lineHeight: "12px"}}>NULL Text</p>
                                        <DvcInfoAsicIcon/>
                                        <p style={{color:'#000000', lineHeight: "10px"}}>NULL Text</p>
                                        <p
                                            style={{
                                                fontSize: 28,
                                                fontWeight: 600,
                                                color: "white"
                                            }}
                                        >
                                            {asic_type}
                                        </p>
                                        <p style={{color:'#000000', lineHeight: "18px"}}>NULL Text</p>
                                    </Paper>
                                </div>
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
                                <p
                                    style={{
                                        fontSize: 18,
                                        lineHeight: "36px",
                                    }}
                                >
                                    {identify_info.map((info) => (
                                        <p>{info}</p>
                                    ))}
                                </p>
                            </div>
                            <div style={{ borderRight: "1px solid #DADADA" }} />
                            <div style={{ borderLeft: "32px solid white" }}>
                                <p
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 600
                                    }}
                                >
                                    Application Information
                                </p>
                                <p
                                    style={{
                                        fontSize: 18,
                                        lineHeight: "30px",
                                        borderTop: "10px solid white"
                                    }}
                                >
                                    {app_info.map((info) => (
                                        <p>{info}</p>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </Stack>
                    <p>
                        <Button
                            variant='contained'
                            component="span"
                            style={{
                                marginLeft: 210
                            }}
                            onClick={(e: React.MouseEvent<HTMLElement>) => props.doRefresh(e, 'refresh_button')}
                        >
                            Refresh
                        </Button>
                    </p>
                </Stack>
            </div>
        </ThemeProvider>
    );
};
