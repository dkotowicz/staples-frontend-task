export default {
    state:{
        showAlert: false,
        alertText: '',
    },
    getters:{
        showAlert(state, getters) {
            return state.showAlert
        },
        alertText(state, getters) {
            return state.alertText
        },
    },
    actions:{

    },
    mutations:{
        setAlertText(state, text) {
            state.alertText = text
        },
        changeStatusAlert(state) {
            state.showAlert = true
            setTimeout(()=>{
                state.showAlert = false
             },1000); 
        },
    }
}