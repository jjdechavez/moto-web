export interface IAuthState {
    isAuthenticated: boolean | null,
    loginStatus: {
        sending: boolean,
        sent: boolean,
        error: string | null
    }
}

export const AuthReducer = (state: IAuthState, action: any): any => {

}