export const showError = (error) => {
    return (
        <div className="block text-sm text-left text-red-600 bg-red-200 border border-red-400 h-12 flex items-center p-4 rounded-sm mb-5 fade" role="alert">
            {error}
        </div>)
}
export const showSuccess = (text) => {
    return (
        <div className="block text-sm text-left text-green-600 bg-green-100 border border-green-400 h-12 flex items-center p-4 rounded-sm mb-5 fade" role="alert">
            {text}
        </div>)
}