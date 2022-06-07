import React, { Component } from "react";
import PropTypes from "prop-types";

export default class OptionsSelector extends Component {
  renderAttribute = (attribute, i) => {
    const { setSelectedOption } = this.props;
    return (
      <div className="attributes-options-container" key={attribute.name}>
        <h3>{`${attribute.name.toUpperCase()}:`}</h3>
        <div
          className="attributes-options"
          onClick={(e) => setSelectedOption(e.target.name, e.target.id, i)}
        >
          {attribute.items.map((item) => this.renderItem(item, attribute))}
        </div>
      </div>
    );
  };

  renderItem = (item, attribute) => {
    const { selectedOptions, disabled } = this.props;
    const selectedOption = selectedOptions.find(
      (selectedOption) => selectedOption.name === attribute.name
    );
    return (
      <button
        disabled={disabled}
        id={item.displayValue}
        key={item.displayValue}
        className={`
          ${this.classValueType(attribute.type)} 
          ${this.classSelectedOption(item, selectedOption)}
          ${this.classBlackBorder(item.value)}
        `}
        style={this.buttonStyle(attribute, item)}
        alt={item.displayValue}
        name={attribute.name}
      >
        {attribute.type === "text" && item.displayValue}
      </button>
    );
  };
  classValueType = (type) => {
    switch (type) {
      case "swatch":
        return "value-type-swatch";
      case "text":
        return "value-type-text";
      default:
    }
  };
  classSelectedOption = (item, selectedOption) => {
    if (item.displayValue === selectedOption?.displayValue) {
      return "selected-option";
    }
  };
  classBlackBorder = (color) => {
    if (color === "#FFFFFF") {
      return "black-border";
    }
  };
  buttonStyle = ({ type }, item) => {
    switch (type) {
      case "swatch":
        return { backgroundColor: item.value };
      default:
        return {};
    }
  };

  render() {
    const { attributes } = this.props;

    return attributes.map(this.renderAttribute);
  }
}

OptionsSelector.propTypes = {
  setSelectedOption: PropTypes.func,
  selectedOptions: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  attributes: PropTypes.arrayOf(PropTypes.object),
};
