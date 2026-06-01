# Projeto de Manipulação de Vídeo

O objetivo da aplicação é criar um reprodutor de mídia customizado com manipulação de vídeo, controles avançados de reprodução e aplicação de filtros de cor dinâmicos via CSS.

## Funcionalidades da Aplicação

A aplicação atende a todos os requisitos propostos para a manipulação de vídeo, incluindo:

- **Play/Pause:** Controle nativo para iniciar e pausar a reprodução do vídeo.
- **Manipulação de Volume:** Controle deslizante (range) para aumentar ou diminuir o áudio do vídeo.
- **Manipulação de Tempo (Timeline):** Barra de progresso interativa que acompanha o tempo atual do vídeo.
- **Avançar/Retroceder Faixas:** Botões para navegar entre os vídeos da playlist.
- **Avançar/Retroceder Tempo:** Botões para pular rapidamente o tempo do vídeo em intervalos exatos (-10s e +10s).
- **Playlist com Destaque:** Lista lateral interativa onde o vídeo atualmente em reprodução recebe um destaque visual.
- **Filtros de Cor Dinâmicos:** Opção de modificar a paleta de cores do vídeo em tempo real, com suporte para:
  - Sem Cores / Tom de Cinza
  - Tom de Vermelho
  - Tom de Verde
  - Tom de Azul
  - Sem Filtro (Normal)

## Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

##  Como rodar o projeto localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm instalado

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver a aplicação.

## Vídeos

Coloque os arquivos de vídeo na pasta `public/` com os nomes:

- `video1.mp4`
- `video2.mp4`
- `video3.mp4`


## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx       # Layout global
│   ├── page.tsx         # Página inicial
│   └── globals.css      # Estilos globais
├── components/
│   └── VideoPlayer.tsx  # Componente do reprodutor de video
public/
└── [adicionar videos aqui]
```

## Build para Produção

```bash
npm run build
npm start
```

## Licença

Este projeto foi desenvolvido para fins acadêmicos.