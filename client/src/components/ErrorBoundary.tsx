import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="atlas-app not-found-page">
          <AlertTriangle size={36} />
          <h1>Something went wrong</h1>
          <p>Reload the atlas to restore the last working view.</p>
          <button type="button" onClick={() => window.location.reload()}>
            <RotateCcw size={14} /> Reload
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
