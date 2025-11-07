import Icon from '../components/Icon';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-content">
                <h1 className="hero-title">O Futuro é Agente</h1>
                <p className="hero-subtitle">Descreva sistemas complexos em linguagem natural. Nossa IA gera, testa e implementa o código para você.</p>
                <div className="cta-container">
                    <input className="input-field" type="text" placeholder="Ex: 'uma API REST em Node.js para um e-commerce'" />
                    <button className="button">
                        <Icon name="logo" size={18} />
                        <span>Iniciar Projeto</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
