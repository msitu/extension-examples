import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

type FilePathProps = {
  filePath: string;
  onFilePathChange: any;
};
const FilePathInput = (props: FilePathProps) => (
  <label>
    Filepath:
    <input
      type="text"
      value={props.filePath}
      onChange={props.onFilePathChange}
      onPaste={props.onFilePathChange}
    />
  </label>
);

type LeafMapProps = {
  filePath: String;
  center?: any;
  urlBase: String;
};
const LeafMap = (props: LeafMapProps) => {
  if (!props.filePath || !props.center) {
    return <div></div>;
  }

  const url = `/ceresflights/tiles/{z}/{x}/{y}/${props.filePath}`;
  return (
    <div>
      <Map center={props.center} zoom={18}>
        <TileLayer url={url} />
      </Map>
    </div>
  );
};

type TifViewerState = {
  filePath?: string;
  center?: any;
  urlBase: String;
};
export class TifViewer extends React.Component<{}, TifViewerState> {
  constructor(props: any) {
    super(props);
    // Flight%208658/registered/2020-06-20%202378%20Red%20Hills%20D%20VNIR.tif
    this.state = {
      filePath: '',
      center: null,
      urlBase: 'http://192.168.64.20:32035'
    };
    this.fetchCenter();
  }

  onFilePathChange(event: React.FormEvent<HTMLInputElement>) {
    debugger;
    this.setState({ filePath: event.currentTarget.value });
    this.fetchCenter();
  }

  async fetchCenter() {
    debugger;
    if (!this.state.filePath) return;
    const resp = await fetch(
      `${this.state.urlBase}/ceresflights/center/${this.state.filePath}`
    );
    const center = await resp.json();
    console.log(center);
    this.setState({ center });
  }

  render() {
    return (
      <div>
        <FilePathInput
          filePath={this.state.filePath}
          onFilePathChange={this.onFilePathChange.bind(this)}
        />
        <LeafMap
          filePath={this.state.filePath}
          center={this.state.center}
          urlBase={this.state.urlBase}
        />
      </div>
    );
  }
}
/**
 * A TifViewer Lumino Widget that wraps a TifViewerComponent.
 */
export class TifViewerWidget extends ReactWidget {
  /**
   * Constructs a new TifViewerWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return <TifViewer />;
  }
}
