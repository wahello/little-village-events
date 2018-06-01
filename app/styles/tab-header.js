import variables from "./variables";

export default {

    root: {
        flex: 0,

        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: variables.panelBackgroundColor
    },

    label: {
        flex: 0,

        marginBottom: 10,

        color: variables.textColor,
        fontSize: variables.regularFontSize,
        textAlign: "center",

    }

};
