function pagerank(adjacencyMatrix, dampingFactor = 0.85, maxIterations = 100, tolerance = 1e-6) {
    const N = adjacencyMatrix.length;  // Número de páginas
    let ranks = new Array(N).fill(1 / N);  // Inicializa os ranks com valor igual para todas as páginas
    let transitionMatrix = createTransitionMatrix(adjacencyMatrix, N);

    // Itera até a convergência ou o número máximo de iterações
    for (let iteration = 0; iteration < maxIterations; iteration++) {
        let newRanks = multiplyMatrixVector(transitionMatrix, ranks);
        // Aplica o fator de amortecimento (Damping Factor)
        for (let i = 0; i < N; i++) {
            newRanks[i] = dampingFactor * newRanks[i] + (1 - dampingFactor) / N;
        }
        
        // Verifica se a convergência foi atingida
        let diff = 0;
        for (let i = 0; i < N; i++) {
            diff += Math.abs(newRanks[i] - ranks[i]);
        }
        
        if (diff < tolerance) {
            break;  // Se a diferença é muito pequena, consideramos que convergiu
        }
        
        ranks = newRanks;
    }
    
    return ranks;
}

function createTransitionMatrix(adjacencyMatrix, N) {
    let transitionMatrix = new Array(N).fill().map(() => new Array(N).fill(0));
    
    // Normaliza as colunas da matriz de adjacência para criar a matriz de transição
    for (let j = 0; j < N; j++) {
        let columnSum = 0;
        
        // Soma os valores da coluna para normalizar
        for (let i = 0; i < N; i++) {
            columnSum += adjacencyMatrix[i][j];
        }
        
        // Normaliza a coluna
        for (let i = 0; i < N; i++) {
            if (columnSum > 0) {
                transitionMatrix[i][j] = adjacencyMatrix[i][j] / columnSum;
            }
        }
    }
    
    return transitionMatrix;
}

function multiplyMatrixVector(matrix, vector) {
    const N = matrix.length;
    let result = new Array(N).fill(0);
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            result[i] += matrix[i][j] * vector[j];
        }
    }
    
    return result;
}

// Exemplo de uso
const adjacencyMatrix = [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0]
];

const ranks = pagerank(adjacencyMatrix);
console.log('Ranks das páginas:', ranks);
