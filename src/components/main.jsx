import React from 'react';

const propTypes = {
  children: React.PropTypes.element.isRequired,
};

class Main extends React.Component {
  render() {
    return (
      <div>
        <div id="navbar">
          <div className="navbar" id="appname">Plate Catcher</div>
          <div className="navbar" id="login">Login / Register</div>
        </div>
        <div id="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
