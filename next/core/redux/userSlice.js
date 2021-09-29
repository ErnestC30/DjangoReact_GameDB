import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user = {
        username:'',
        image: '',
        description: ''
    },
    isLoggedIn = false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedin(state, action) { //action payload will be the User model info
            state.user.username = action.payload.username 
            state.user.image = action.payload.image 
            state.user.description = action.payload.description 
            state.isLoggedIn = true
        },
        loggedout(state) {
            //reset to initial state?
            state.user.username = ''
            state.user.image = ''
            state.user.description = ''
            state.isLoggedIn = false
        }
    }
})

export const {loggedin, loggedout} = userSlice.actions
export default userSlice.reducer