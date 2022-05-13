import React, { Component } from "react";

export default class OptionsSelector extends Component {
  render() {
    const { attributes, className, setSelectedOption, selectedOptions, disabled } =
      this.props;

    return attributes.map((attribute) => {
      return (
        <div key={attribute.name}>
          <h3>{`${attribute.name.toUpperCase()}:`}</h3>
          <div
            className={"attributes-options"}
            onClick={(e) => setSelectedOption(e.target.name, e.target.id)}
          >
            {attribute.items.map((item) => {
              const selectedOption = selectedOptions.find(
                (selectedOption) => selectedOption.name === attribute.name
              );
              return (
                <button
                  disabled={disabled}
                  id={item.displayValue}
                  key={item.displayValue}
                  className={`${
                    attribute.type === "swatch"
                      ? "value-type-swatch"
                      : "value-type-text"
                  } ${className.isSelectable}
                    ${
                      item.displayValue ===
                        selectedOption?.displayValue &&
                      "selected-option"
                    }
                  `}
                  style={
                    attribute.type === "swatch"
                      ? { backgroundColor: item.value,
                        border: item.value === '#FFFFFF' ? '1px solid black' : 'none',
                      }
                      : {}
                    // attribute.type === "swatch"
                    //   ? { backgroundColor: item.value }
                    //   : {}
                  }
                  alt={item.displayValue}
                  name={attribute.name}
                >
                  {attribute.type === "text" && item.displayValue}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  }
}
