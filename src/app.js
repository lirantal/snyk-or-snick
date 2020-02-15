import Readline from 'readline'
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

  componentDidMount() {
    Readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)

    process.stdin.on('keypress', (key, data) => {
      if (data.ctrl && data.name === 'c') {
        process.exit()
      } else {
        this.setState(prevState => {
          if (prevState.progress >= 100) {
            console.log('you win!')
            process.exit(1)
          }

          return {
            progress: prevState.progress + 1
          }
        })
      }
    })
  }
}

const clearScreenOp = '\x1B[2J\x1B[0f'
process.stdout.write(clearScreenOp)

render(<App />)
