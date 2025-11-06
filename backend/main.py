# backend/main.py

import os
import json
import requests
import nltk
from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from googlesearch import search
from sklearn.feature_extraction.text import TfidfVectorizer

# --- 0. CONFIGURAÇÃO DO SERVIDOR ---
app = Flask(__name__)
CORS(app) # Permite que o frontend chame este backend

# --- 1. CONFIGURAÇÃO DAS CHAVES (SERÃO ADICIONADAS NO RENDER) ---
APPLICATION_ID = os.environ.get("BACK4APP_APPLICATION_ID")
REST_API_KEY = os.environ.get("BACK4APP_REST_API_KEY")
SERPER_API_KEY = os.environ.get("SERPER_API_KEY")

BACK4APP_URL = "https://parseapi.back4app.com/classes/Conhecimento"
BACK4APP_HEADERS = {
    "X-Parse-Application-Id": APPLICATION_ID,
    "X-Parse-REST-API-Key": REST_API_KEY,
    "Content-Type": "application/json"
}

# Baixar o recurso 'punkt' do NLTK
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    print("Baixando pacote 'punkt'...")
    nltk.download('punkt')

# --- 2. HABILIDADES E MEMÓRIA DA IA ---

def pesquisar_topico(topico):
    """Pesquisa usando a Serper API e retorna a primeira URL."""
    print("Buscando com Serper API...")
    url = "https://google.serper.dev/search"
    payload = json.dumps({"q": topico, "gl": "br", "num": 1})
    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }
    try:
        response = requests.post(url, headers=headers, data=payload, timeout=10)
        if response.ok:
            results = response.json().get('organic', [])
            if results:
                return results[0].get('link')
    except requests.RequestException as e:
        print(f"Erro na API Serper: {e}")
        return None
    return None

def extrair_texto_da_url(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        resposta = requests.get(url, headers=headers, timeout=10)
        if resposta.status_code != 200: return None
        soup = BeautifulSoup(resposta.content, 'html.parser')
        for el in soup(["script", "style"]): el.decompose()
        return soup.get_text(separator='\n', strip=True)
    except requests.RequestException:
        return None

def aprender_com_texto(texto):
    frases = nltk.sent_tokenize(texto, language='portuguese')
    if len(frases) < 2: return frases
    try:
        vectorizer = TfidfVectorizer(stop_words='portuguese')
        tfidf_matrix = vectorizer.fit_transform(frases)
        frases_e_pontos = sorted(zip(frases, tfidf_matrix.sum(axis=1)), key=lambda item: item[1], reverse=True)
        return [frase for frase, pontuacao in frases_e_pontos[:5]]
    except ValueError:
        return []

def salvar_conhecimento(lista_de_fatos):
    try:
        response = requests.get(BACK4APP_URL, headers=BACK4APP_HEADERS, timeout=10)
        memoria_atual = [item['fato'] for item in response.json().get('results', [])] if response.ok else []
        fatos_salvos = 0
        for fato in lista_de_fatos:
            fato_limpo = fato.replace('\n', ' ').strip()
            if len(fato_limpo) > 15 and fato_limpo not in memoria_atual:
                data = {"fato": fato_limpo}
                requests.post(BACK4APP_URL, headers=BACK4APP_HEADERS, data=json.dumps(data), timeout=10)
                fatos_salvos += 1
        return fatos_salvos
    except Exception:
        return 0

def consultar_memoria(topico):
    try:
        params = {'where': json.dumps({"fato": {"$regex": topico, "$options": "i"}})} if topico else {}
        response = requests.get(BACK4APP_URL, headers=BACK4APP_HEADERS, params=params, timeout=10)
        return [item['fato'] for item in response.json().get('results', [])] if response.ok else []
    except Exception:
        return []

# --- 3. ROTAS DA API ---

@app.route('/')
def home():
    return "API da IA está funcionando!"

@app.route('/aprender', methods=['POST'])
def rota_aprender():
    data = request.get_json()
    topico = data.get('topic')
    if not topico:
        return jsonify({"error": "Nenhum tópico fornecido."}), 400

    conhecimento_previo = consultar_memoria(topico)
    url = pesquisar_topico(topico)
    if not url:
        return jsonify({"error": "Não foi possível encontrar uma fonte na internet via API."})

    texto = extrair_texto_da_url(url)
    if not texto:
        return jsonify({"error": "Não foi possível ler o conteúdo da fonte."})

    novo_conhecimento = aprender_com_texto(texto)
    fatos_salvos = salvar_conhecimento(novo_conhecimento)
    mensagem = f"Aprendizagem concluída! {fatos_salvos} novo(s) fato(s) adicionado(s)."
    
    return jsonify({
        "conhecimento_previo": conhecimento_previo,
        "mensagem": mensagem,
        "fonte": url
    })

# --- 4. INICIA O SERVIDOR ---
if __name__ == "__main__":
    app.run()
