import React, { Component } from "react";

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can handle errors here, e.g., log them to a server or display a fallback UI.
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here (e.g., an error message).
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorHandler;
