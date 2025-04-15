export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export const formatReach = (reach: number) => {
    if (reach >= 1000000) {
        return `${(reach / 1000000).toFixed(1)}M`;
    } else if (reach >= 1000) {
        return `${(reach / 1000).toFixed(1)}K`;
    }
    return reach.toString();
};