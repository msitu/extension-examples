import { ReactWidget } from '@jupyterlab/apputils';

import React from 'react';

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

type FilePathProps = {
  value: string;
};

type FilePathState = {
  value?: string;
};
class FilePathForm extends React.Component<{}, FilePathState> {
  constructor(props: FilePathProps) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ value: event.currentTarget.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert('Filepath has change! ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Filepath:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

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
    return <FilePathForm />;
  }
}
