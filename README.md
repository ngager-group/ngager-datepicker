# ngager-datepicker

> ReactJS Date Picker component

[![NPM](https://img.shields.io/npm/v/ngager-datepicker.svg)](https://www.npmjs.com/package/ngager-datepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ngager-datepicker
```

## Usage

```jsx
import React, { Component } from 'react'

import NgagerDateField from 'ngager-datepicker'

class Example extends Component {
  render () {
    return (
      <NgagerDateField
        initialValue={this.state.fromDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        placeholder="From date"
        onChange={fromDate => this.setState({ fromDate })}
      />
    )
  }
}
```

## License

MIT © [Ngager](https://github.com/ngager-group)
