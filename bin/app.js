'use strict'

var _readline = _interopRequireDefault(require('readline'))

var _react = _interopRequireDefault(require('react'))

var _ink = require('ink')

var _inkProgressBar = _interopRequireDefault(require('ink-progress-bar'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

class App extends _react.default.Component {
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
    return _react.default.createElement(
      _react.default.Fragment,
      null,
      _react.default.createElement(
        _ink.Color,
        {
          magenta: true
        },
        player1Name
      ),
      _react.default.createElement(
        _ink.Color,
        {
          magenta: true
        },
        _react.default.createElement(_inkProgressBar.default, {
          left: player1Name.length,
          percent: this.state.player1Progress / 100
        })
      ),
      _react.default.createElement(
        _ink.Color,
        {
          cyan: true
        },
        player2Name
      ),
      _react.default.createElement(
        _ink.Color,
        {
          cyan: true
        },
        _react.default.createElement(_inkProgressBar.default, {
          left: player2Name.length,
          percent: this.state.player2Progress / 100
        })
      )
    )
  }

  componentDidMount() {
    _readline.default.emitKeypressEvents(process.stdin)

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
      } // console.log(key)
      // console.log(data)
    })
  }
}

const clearScreenOp = '\x1B[2J\x1B[0f'
process.stdout.write(clearScreenOp)
;(0, _ink.render)(_react.default.createElement(App, null))
