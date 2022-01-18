import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  MainAreaWidget,
  WidgetTracker
} from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { WidgetLogoIcon } from './icons';

import { WidgetContent } from './widget_container';

/**
 * Initialization data for the @webds/device_info extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@webds/device_info:plugin',
  autoStart: true,
  requires: [ILauncher, ILayoutRestorer],
  activate: async (
    app: JupyterFrontEnd,
    launcher: ILauncher,
    restorer: ILayoutRestorer
  ) => {
    console.log('JupyterLab extension @webds/device_info is activated!');

    let widget: MainAreaWidget;
    const { commands, shell } = app;
    const command = 'webds_device_info:open';
    commands.addCommand(command, {
      label: 'Device Information',
      caption: 'Device Information',
      icon: (args: { [x: string]: any }) => {
        return args['isLauncher'] ? WidgetLogoIcon : undefined;
      },
      execute: () => {
        if (!widget || widget.isDisposed) {
            const content = new WidgetContent();
            widget = new MainAreaWidget<WidgetContent>({ content });
            widget.id = 'webds_device_info_widget';
            widget.title.label = 'Device Information';
            widget.title.icon = WidgetLogoIcon;
            widget.title.closable = true;
        }

        if (!tracker.has(widget))
            tracker.add(widget);

        if (!widget.isAttached)
            shell.add(widget, 'main');

        shell.activateById(widget.id);
      },
    });

    launcher.add({ command, args: { isLauncher: true }, category: 'WebDS', rank: 2 });

    let tracker = new WidgetTracker<MainAreaWidget>({ namespace: 'webds_device_info' });
    restorer.restore(tracker, { command, name: () => 'webds_device_info' });
  }
};

export default plugin;
