import Readline from 'readline'
import React from 'react'
import { Color, render } from 'ink'
import ProgressBar from 'ink-progress-bar'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      player1Progress: 1,
      player2Progress: 1
    }
  }

  render() {
    const player1Name = 'Snyk'
    const player2Name = 'Snick'

    return (
      <>
        <Color magenta>{player1Name}</Color>

        <Color magenta>
          <ProgressBar left={player1Name.length} percent={this.state.player1Progress / 100} />
        </Color>

        <Color cyan>{player2Name}</Color>

        <Color cyan>
          <ProgressBar left={player2Name.length} percent={this.state.player2Progress / 100} />
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
        if (key === 'a') {
          this.setState(prevState => {
            if (prevState.player1Progress >= 100) {
              console.log('Snyk wins!')
              process.exit(1)
            }

            return {
              player1Progress: prevState.player1Progress + 1
            }
          })
        }

        if (key === "'") {
          this.setState(prevState => {
            if (prevState.player2Progress >= 100) {
              console.log('Snick wins!')
              process.exit(1)
            }

            return {
              player2Progress: prevState.player2Progress + 1
            }
          })
        }
      }
    })
  }
}

const clearScreenOp = '\x1B[2J\x1B[0f'
process.stdout.write(clearScreenOp)

render(<App />)
