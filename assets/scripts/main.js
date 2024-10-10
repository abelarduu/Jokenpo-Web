const cardTypes = ["rock", "paper", "scissor"];
const state = {
    view: {
        botHandElement: document.getElementById('bot'),
        playerHandElement: document.getElementById('player'),
        botCardOnTable: document.getElementById('botCardOnTable'),
        playerCardOnTable: document.getElementById('playerCardOnTable')
    },
    values: {
        selectedCards: [],
        botCardInstances: [],
        playerCardInstances: []
    }
};

// Método de criação de carta e inclusão no array de objetos
function addNewCard(cardInstances, type) {
    const newCard = new Card(type);
    cardInstances.push(newCard);
}

// Adicionando as cartas iniciais para o player e o bot 
function drawCards(handElement, cardInstances) {
    handElement.innerHTML = ""; // Limpa as cartas existentes antes de desenhar
    cardInstances.forEach((card) => {
        const newHtml = `<li class="card ${card.type}"></li>`;
        handElement.insertAdjacentHTML('beforeend', newHtml);
    });
}

// Seleção aleatória da carta do bot
function randomSelectCard(cardInstances) {
    let randomNumber = Math.floor(Math.random() * cardInstances.length);
    const cardSelected = cardInstances.splice(randomNumber, 1); // Remove a carta selecionada
    return cardSelected[0]; // Retorna a carta selecionada
}

// Atualiza as cartas que estão na mesa (tanto do jogador quanto do bot)
function updateCardsOnTable(playerCard, botCard) {
    state.view.playerCardOnTable.classList.add("card", playerCard.type);
    state.view.botCardOnTable.classList.add("card", botCard.type);

    // Remove as classes "posCard"
    state.view.playerCardOnTable.classList.remove("posCard");
    state.view.botCardOnTable.classList.remove("posCard");
}

// Lida com o clique em uma carta
function handleCardClick(cardInstance) {
    if (state.values.selectedCards.length < 2 && !cardInstance.wasSelected) {
        state.values.selectedCards.push(cardInstance);
        cardInstance.select();

        // Atualiza a carta na mesa do jogador
        const botCardSelected = randomSelectCard(state.values.botCardInstances);
        updateCardsOnTable(cardInstance, botCardSelected);

        // Adiciona uma nova carta ao bot e atualiza sua mão
        addNewCard(state.values.botCardInstances, botCardSelected.type);
        drawCards(state.view.botHandElement, state.values.botCardInstances); // Atualiza a visualização do bot
    }
}

// Verifica o clique nas cartas do jogador ou do bot
function checkClickCards(handElementId, cardInstances) {
    const cards = document.querySelectorAll(`#${handElementId} .card`);

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const cardInstance = cardInstances[index];
            handleCardClick(cardInstance, index, cardInstances);
        });
    });

    return cards;
}

function main() {
    cardTypes.forEach((cardType) => {
        addNewCard(state.values.botCardInstances, cardType);
        addNewCard(state.values.playerCardInstances, cardType);
    });


    drawCards(state.view.botHandElement, state.values.botCardInstances);
    drawCards(state.view.playerHandElement, state.values.playerCardInstances);

    checkClickCards("bot", state.values.botCardInstances);
    checkClickCards("player", state.values.playerCardInstances);
    console.log(state.values.selectedCards);
}

main();
