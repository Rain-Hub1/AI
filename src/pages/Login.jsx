import './Forms.css';

const Login = () => {
    return (
        <div className="form-wrapper">
            <div className="form-container">
                <h2>Acesse sua Plataforma</h2>
                <form>
                    <input className="input-field" type="email" placeholder="Seu E-mail" required />
                    <input className="input-field" type="password" placeholder="Sua Senha" required />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
