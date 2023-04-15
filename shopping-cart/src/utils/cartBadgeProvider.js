import { Badge } from "@mantine/core";

// Returns a Badge component based on status of an item
function getBadge(status) {
    if (status < 0 || status > 2) {
        return (
            <Badge color="black" variant="dot">
                Error
            </Badge>
        );
    }
    const badge_info = {
        0: { color: "teal", text: "On Sale" },
        1: { color: "violet", text: "Limited" },
        2: { color: "pink", text: "Sold" },
    };
    return (
        <Badge color={badge_info[status].color} variant="light">
            {badge_info[status].text}
        </Badge>
    );
}

export default getBadge;