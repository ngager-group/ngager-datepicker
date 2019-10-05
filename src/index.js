/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';

const moment = require('moment');

function getValueFromInitialValue(initialValue) {
  if (!initialValue) {
    return null;
  }
  let value;
  if (typeof initialValue === 'string') {
    value = moment(initialValue)
      .local()
      .toDate();
  } else {
    value = initialValue;
  }
  return value;
}

class NgagerDateField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      value: getValueFromInitialValue(props.initialValue),
    };
    this.hanldeOnClick = this.hanldeOnClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.initialValue !== this.props.initialValue &&
      newProps.initialValue !== this.state.value
    ) {
      this.setState({ value: getValueFromInitialValue(newProps.initialValue) });
    }
  }

  componentDidUpdate(props, state) {
    if (state.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
    if (state.openDialog !== this.state.openDialog && this.state.openDialog === true) {
      this.datePicker.openDialog();
    }
  }

  hanldeOnClick(e) {
    // console.log(e.target.className);
    if (e.target.className && e.target.className.indexOf('fa-times') >= 0) {
      this.setState({ value: null });
      return;
    }
    this.setState({ openDialog: true });
  }

  renderDatePicker() {
    if (!this.state.openDialog) {
      return null;
    }
    const { displayFormat, minDate, maxDate } = this.props;
    return (
      <div style={{ display: 'none' }}>
        <DatePicker
          name="ngagerDateField"
          ref={el => {
            this.datePicker = el;
          }}
          fullWidth
          value={this.state.value}
          formatDate={date => moment(date).format(displayFormat)}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(e, value) => this.setState({ value, openDialog: false })}
          underlineShow={false}
          onDismiss={() => this.setState({ openDialog: false })}
        />
      </div>
    );
  }

  render() {
    const { displayFormat, placeholder, style, errorText, textColor } = this.props;
    const className = `date-field-container ${this.props.className}`;
    const value = this.state.value;
    if (this.props.viewOnly) {
      return (
        <div style={style} className={className}>
          <div className="date-field" style={{ cursor: 'default' }}>
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <span className="value" style={{ color: textColor }}>
              {!value ? '' : moment(value).format(displayFormat)}
            </span>
          </div>
        </div>
      );
    }
    return (
      <div style={style} className={className}>
        {this.renderDatePicker()}
        <div className="date-field" role="button" tabIndex={0} onClick={this.hanldeOnClick}>
          <i className="fa fa-calendar" aria-hidden="true"></i>
          <span className="value" style={{ color: textColor }}>
            {!value ? placeholder : moment(value).format(displayFormat)}
          </span>
          <i
            title={value === null ? 'Open date picker' : 'Clear value'}
            className={`fa ${value === null ? 'fa-caret-down' : 'fa-times'}`}
            aria-hidden="true"
          ></i>
        </div>
        {errorText && <span className="error-text">{errorText}</span>}
      </div>
    );
  }
}

NgagerDateField.propTypes = {
  className: PropTypes.string,
  viewOnly: PropTypes.bool,
  initialValue: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
  style: PropTypes.instanceOf(Object),
  textColor: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.string,
  errorText: PropTypes.string,
  minDate: PropTypes.instanceOf(Object),
  maxDate: PropTypes.instanceOf(Object),
  onChange: PropTypes.func.isRequired,
};

NgagerDateField.defaultProps = {
  className: '',
  viewOnly: false,
  initialValue: null,
  style: {},
  displayFormat: 'YYYY-MM-DD',
  errorText: null,
  minDate: null,
  maxDate: null,
  textColor: 'inherit',
  placeholder: '',
  onChange: () => null,
};

export default NgagerDateField;
