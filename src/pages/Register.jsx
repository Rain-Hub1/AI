import './Forms.css';

const Register = () => {
    return (
        <div className="form-wrapper">
            <div className="form-container">
                <h2>Inicie sua Jornada</h2>
                <form>
                    <input className="input-field" type="text" placeholder="Seu Nome" required />
                    <input className="input-field" type="email" placeholder="Seu E-mail" required />
                    <input className="input-field" type="password" placeholder="Crie uma Senha" required />
                    <button className="button" type="submit">Criar Conta</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
