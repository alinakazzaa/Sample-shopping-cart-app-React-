import React from 'react'


export const LoginForm = ({ handleChange, handleSubmit, history, isAdmin }) => {

    return <div>
        <form className="formContainer" onChange={handleChange} onSubmit={handleSubmit}>
            <label className="subTitle">
                Username
    </label>
            <input className="input" type="text" name="username" />
            <label className="subTitle">
                Password
    </label>
            <input className="input" type="text" name="password" />
            <input className="bigBtn" type="submit" value="Log In" />
        </form>
        {!isAdmin && <form>
            <input className="bigBtn"
                onClick={() => history().push("/register")}
                type="submit" value="Register" />
        </form>}
    </div>
}


