import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // You could send error to logging service here
    // Example: Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Something Went Wrong
              </h1>
              <p className="text-gray-600 text-lg">
                We're sorry, but something unexpected happened. The Justice for Logan team has been notified.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="bg-red-50 border border-red-200 rounded p-4 text-xs overflow-auto">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Return Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Reload Page
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                If this problem persists, please{' '}
                <a href="#guestbook" className="text-primary hover:underline">
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
