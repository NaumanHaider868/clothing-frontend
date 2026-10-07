export const formatPlaceholder = (field) => {
    if (field === "email") return "Email";
    if (field === "firstName" || field === "first_name") return "First Name";
    if (field === "lastName" || field === "last_name") return "Last Name";
    return field
        .replace("_", " ")
        .replace(/^\w/, (c) => c.toUpperCase());
};
