const initMainState = {
    navbarToggle: false
};
export function main(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/TOGGLE_NAVBAR':
            return {
                navbarToggle: !state.navbarToggle
            };
        default:
            return state;
    }
}
