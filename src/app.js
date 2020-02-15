import React from 'react'
import { Color, render } from 'ink'
import ProgressBar from 'ink-progress-bar'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      progress: 1
    }
  }

  render() {
    const text = 'Snyk'

    return (
      <>
        <Color green>{text}</Color>

        <Color green>
          <ProgressBar left={text.length} percent={this.state.progress / 100} />
        </Color>
      </>
    )
  }

  componentDidMount() {}
}

const clearScreenOp = '\x1B[2J\x1B[0f'
process.stdout.write(clearScreenOp)

render(<App />)