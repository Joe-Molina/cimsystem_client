export const sortByPriority = (a: { position: number }, b: { position: number }) => {
    if (a.position < b.position) return -1;
    if (a.position > b.position) return 1;
    return 0;
};