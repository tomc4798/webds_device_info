
import { ReactWidget } from '@jupyterlab/apputils';
import { useState, useEffect } from 'react';
import React from 'react';

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
    let dvcInfo: string[] = ['', '', ''];

    let fw_mode:string = 'none'
    try {
        const reply = await requestAPI<any>('command?query=identify', {
            method: 'GET',
        });
        fw_mode = reply['mode']
        for (let [key, value] of Object.entries(reply)) {
            dvcInfo[0] = dvcInfo[0] + key + ' :  ' + trimNull(`${value}`) + '\n';
            if (key === 'partNumber')
            {
                dvcInfo[2] = trimNull(`${value}`);
            }
        }
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

    const doRefresh = (event: any, text: string) => {
        console.log('"doRefresh" by "' + text + '"');
        requestBackendDvcInfo().then((dvcInfo) => {
            setMessageOfIdentify(dvcInfo[0]);
            setMssageOfAppInfo(dvcInfo[1]);
            setMessageOfPartNumber(dvcInfo[2]);
        }).catch(reason => {
            console.error(
                `Error on GET /webds/command?query\n${reason}`
            );
        });
    };

    useEffect(() => {
        doRefresh(null, 'initial_refresh');
    }, []);

    return (
        <WidgetComponent
            doRefresh={doRefresh}
            messageOfPartNumber={messageOfPartNumber}
            messageOfIdentify={messageOfIdentify}
            messageOfAppInfo={messageOfAppInfo}
        />
    );
};


export class WidgetContent extends ReactWidget {
    constructor() {
        super();
        this.addClass('jp-webdsDeviceInfoWidget');
    }

    render(): JSX.Element {
        return <WidgetContainer />;
    }
}
