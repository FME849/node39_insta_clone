export const exclude = (data, keys) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !keys.includes(key))
    );
};