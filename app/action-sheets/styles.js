import variables from "app/styles/variables";


export default {
    control: {
        opacity: 1
    },

    header: {
        paddingVertical: 18
    },

    h1: {
        fontSize: variables.largeFontSize,
        fontWeight: "600",
        textAlign: "center",
        color: variables.textColor,
    },

    h2: {
        fontSize: variables.largeFontSize,
        textAlign: "center",
        color: variables.textColor,
    },

    infoText: {
        fontSize: variables.largeFontSize,
        textAlign: "center",
        color: variables.textColor,
        lineHeight: 22
    },

    p: {
        fontSize: 13,
        textAlign: "center",
        color: "#8F8F8F"
    },

    infoBlock: {
        paddingVertical: 8
    },

    dateTimeRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        marginTop: 5,
        width: "100%"
    },

    date: {
        marginHorizontal: 5,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 3
    },

    dateLabel: {
        fontSize: variables.regularFontSize,
        fontWeight: "600",
        color: variables.textColor
    },

    dateHighlighted: {
        backgroundColor: variables.highlightColorLight
    },

    dateLabelHighlighted: {
    },

    time: {
        marginHorizontal: 5,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 3
    },

    timeLabel: {
        fontSize: variables.regularFontSize,
        fontWeight: "600",
        color: variables.textColor
    },

    timeHighlighted: {
        backgroundColor: variables.highlightColorLight
    },

    timeLabelHighlighted: {
    },

    deleteButtonLabel: {
        color: "#FF3B30"
    }

};
