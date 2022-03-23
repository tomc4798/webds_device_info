
import { ReactWidget } from '@jupyterlab/apputils';
import { useState, useEffect } from 'react';
import React from 'react';

import { WebDSService } from '@webds/service';

import { WidgetComponent } from './widget_component';
import { requestAPI } from './handler';

function trimNull(a:string) {
  var c = a.indexOf('\0');
  if (c>-1) {
    return a.substr(0, c);
  }
  return a;
}

export const requestBackendDvcInfo = async (): Promise<string[]> => {
    let dvcInfo: string[] = ['', '', '', ''];
    let partNumber: string = 'none';
    let buildID: string = 'none';

    let fw_mode:string = 'none'
    try {
        const reply = await requestAPI<any>('command?query=identify', {
            method: 'GET',
        });
        fw_mode = reply['mode']
        for (let [key, value] of Object.entries(reply)) {
            var trimmedValue = trimNull(`${value}`);
            if (key === 'partNumber') {
                dvcInfo[2] = trimmedValue;
                partNumber = trimmedValue;
            } else if (key === 'buildID') {
                buildID = trimmedValue;
            } else {
                dvcInfo[0] = dvcInfo[0] + key + ' :  ' + trimmedValue + '\n';
            }
        }
        dvcInfo[3] = dvcInfo[3] + 'buildID :  ' + buildID + '\n';
        dvcInfo[3] = dvcInfo[3] + 'partNumber :  ' + partNumber + '\n';
    } catch (error) {
        console.log(error);
        dvcInfo[0] = `Failed to get "identify" report.\nError: ${error}`;
        return Promise.resolve(dvcInfo);
    }

    if (fw_mode === 'application') {
        console.log('appliction mode');
    } else if( fw_mode === 'bootloader' ) {
        console.log('bootloader mode');
        dvcInfo[1] = 'Absent in "Bootloader Mode"';
        return Promise.resolve(dvcInfo);
    } else {
        console.error(`invalid fw mode: ${fw_mode}`);
        dvcInfo[0] = `Failed to get "identify" report.\nFW Mode: ${fw_mode}` ;
        dvcInfo[3] = '';
        return Promise.resolve(dvcInfo);
    }

    try {
        const reply = await requestAPI<any>('command?query=app-info', {
            method: 'GET',
        });
        for (let [key, value] of Object.entries(reply)) {
            dvcInfo[1] = dvcInfo[1] + key + ' :  ' + trimNull(`${value}`) + '\n';
        }
    } catch (error) {
        console.error(error);
        dvcInfo[1] = `Failed to get "app-info" report. \nError: ${error}`;
    }

    return Promise.resolve(dvcInfo);
};

const WidgetContainer = (props:any): JSX.Element => {
    const [messageOfPartNumber, setMessageOfPartNumber] = useState<string>('requesting ...');
    const [messageOfIdentify, setMessageOfIdentify] = useState<string>('requesting ...');
    const [messageOfAppInfo, setMssageOfAppInfo] = useState<string>('requesting ...');
    const [messageOfIdentifyHeader, setMessageOfIdentifyHeader] = useState<string>('');

    const doRefresh = (event: any, text: string) => {
        console.log('"doRefresh" by "' + text + '"');
        requestBackendDvcInfo().then((dvcInfo) => {
            setMessageOfIdentify(dvcInfo[0]);
            setMssageOfAppInfo(dvcInfo[1]);
            setMessageOfPartNumber(dvcInfo[2]);
            setMessageOfIdentifyHeader(dvcInfo[3]);
        }).catch(reason => {
            console.error(
                `Error on GET /webds/command?query\n${reason}`
            );
        });
    };

    useEffect(() => {
        doRefresh(null, 'initial_refresh');
    }, []);

    const webdsTheme = props.service.ui.getWebDSTheme();

    return (
        <div className='jp-webds-widget-body'>
            <WidgetComponent
                theme={webdsTheme}
                doRefresh={doRefresh}
                messageOfPartNumber={messageOfPartNumber}
                messageOfIdentifyHeader={messageOfIdentifyHeader}
                messageOfIdentify={messageOfIdentify}
                messageOfAppInfo={messageOfAppInfo}
            />
        </div>
    );
};


export class WidgetContent extends ReactWidget {
    service: WebDSService|null = null;

    constructor(service: WebDSService) {
        super();
        this.addClass('jp-webdsDeviceInfoWidget');
        this.service = service;
    }

    render(): JSX.Element {
        return (
            <div className='jp-webds-widget'>
                <WidgetContainer service={this.service}/>
            </div>
        );
    }
}
