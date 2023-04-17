export default interface IHeaderProps {
    headerState: {
        category: string;
        website: string;
        searchTerm: string;
    };
    onHeaderStateChange: (newHeaderState: {
        category: string;
        website: string;
        searchTerm: string;
    }) => void;
}