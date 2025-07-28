// ResultsCounter.jsx
export const ResultsCounter = ({ filteredCount, totalCount }) => {
    return (
        <div className="mt-4 text-sm font-bold text-gray-600">
            Showing {filteredCount} of {totalCount} blog posts
        </div>
    );
};