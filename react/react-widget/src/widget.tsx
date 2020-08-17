import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
// import {render} from 'react-dom'
import { Map, TileLayer } from 'react-leaflet';

// import React, { useState } from 'react';

// /**
//  * React component for a counter.
//  *
//  * @returns The React component
//  */
// const CounterComponent = (): JSX.Element => {
//   const [counter, setCounter] = useState(0);

//   return (
//     <div>
//       <p>You clicked {counter} times!</p>
//       <button
//         onClick={(): void => {
//           setCounter(counter + 1);
//         }}
//       >
//         Increment
//       </button>
//     </div>
//   );
// };

// type FilePathProps = {
//   value: string;
// };

// type FilePathState = {
//   filepath?: string;
// };
// class FilePathForm extends React.Component<{}, FilePathState> {
//   constructor(props: FilePathProps) {
//     super(props);
//     this.state = { filepath: '' };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event: React.FormEvent<HTMLInputElement>) {
//     this.setState({ filepath: event.currentTarget.value });
//   }

//   handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     alert('Filepath has change! ' + this.state.filepath);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Filepath:
//           <input
//             type="text"
//             value={this.state.filepath}
//             onChange={this.handleChange}
//           />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

type LeafMapProps = {
  filepath: String;
};
type LeafMapState = {
  center?: any;
};
class LeafMap extends React.Component<LeafMapProps, LeafMapState> {
  constructor(props: LeafMapProps) {
    super(props);
    this.state = {
      center: null
    };
    this.fetchCenter();
  }

  static defaultProps = {
    filepath:
      'Flight%208658/registered/2020-06-20%202378%20Red%20Hills%20D%20VNIR.tif'
  };

  async fetchCenter() {
    const resp = await fetch(
      `http://192.168.64.20:32035/ceresflights/center/${this.props.filepath}`
    );
    const center = await resp.json();
    console.log(center);
    this.setState({ center });
  }

  render() {
    if (!this.state.center) {
      return <div></div>;
    }

    const url = `http://192.168.64.20:32035/ceresflights/tiles/{z}/{x}/{y}/${this.props.filepath}`;
    // const url = "localhost"
    return (
      <div>
        <Map center={this.state.center} zoom={18}>
          <TileLayer url={url} />
        </Map>
      </div>
    );
  }
}
// const position = [51.505, -0.09]
// const map = (
//   <Map center={position} zoom={13}>
//     <TileLayer
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//     />
//     <Marker position={position}>
//       <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
//     </Marker>
//   </Map>
// )

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
export class CounterWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return (
      <div>
        {/* <FilePathForm /> */}
        <LeafMap />
      </div>
    );
    // return render(
    //   <LeafMap />,
    //   document.querySelector('leaflet-container')
    // )
  }
}
