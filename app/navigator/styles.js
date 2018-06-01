import variables from "../styles/variables";

export default {
    "transparent": {
        "drawUnderNavBar": true,
        "navBarTranslucent": true,
        "navBarTransparent": true,
        "navBarButtonColor": variables.invertedTextColor,
        "statusBarTextColorScheme": "light"
    },
    "opaque": {
        "drawUnderNavBar": false,
        "navBarTranslucent": false,
        "navBarTransparent": false,
        "navBarBackgroundColor": variables.panelBackgroundColor,
        "navBarTextColor": variables.text,
        "navBarButtonColor": variables.text,
        "statusBarTextColorScheme": "dark"
    },
    "transparentLight": {
        "drawUnderNavBar": true,
        "navBarTranslucent": true,
        "navBarTransparent": true,
        "statusBarTextColorScheme": "dark"
    },
    "navBarHiddenLight": {
        "navBarHidden": true,
        "statusBarTextColorScheme": "dark"
    }


}
