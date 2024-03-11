

export default function AppReducer(state, action ){
    switch(action.type){
        case 'LOGIN':
            return{
                logindata:action.payload.logindata,
                isLogin: action.payload.isLogin,
                isTeacher:action.payload.isTeacher,
                isApply:state.isApply,
                isAdmin:action.payload.isAdmin,

            }
        case 'LOGOUT':
            return {
                logindata:'',
                isLogin: "false",
                isTeacher: 0,
                isApply:state.isApply,
                isAdmin:false,
            }
        case 'APPLYTEACHER':
            return{
                logindata:state.logindata,
                isLogin:state.isLogin,
                isTeacher:0,
                isApply:true,
                isAdmin:false,
            }
        case 'APPLYTEACHER_BACK':
            return{
                logindata:state.logindata,
                isLogin:state.isLogin,
                isTeacher:0,
                isApply:false,
                isAdmin:false,
            }
        default:
            return state;
    }
}
