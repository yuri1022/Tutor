

export default function AppReducer(state, action ){
    switch(action.type){
        case 'LOGIN':
            return{
                logindata:action.payload.logindata,
                isLogin: action.payload.isLogin,
                isTeacher:action.payload.isTeacher,
                isApply:state.isApply,

            }
        case 'LOGOUT':
            return {
                logindata:'',
                isLogin: "false",
                isTeacher: 0,
                isApply:state.isApply,
            }
        case 'APPLYTEACHER':
            return{
                logindata:state.logindata,
                isLogin:state.isLogin,
                isTeacher:0,
                isApply:true,
            }
        case 'APPLYTEACHER_BACK':
            return{
                logindata:state.logindata,
                isLogin:state.isLogin,
                isTeacher:0,
                isApply:false,
            }
        default:
            return state;
    }
}
