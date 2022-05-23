import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react"
import { LOGIN } from "../graphql/mutations";


const Login = ({ setToken, setUser, setPage, show }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [login, result] = useMutation(LOGIN);

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            setUser(name);
            localStorage.setItem('library-user-token', token);
            setPage('authors')
        }
    }, [result.data]) //eslint-disable-line

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username: name, password } })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
