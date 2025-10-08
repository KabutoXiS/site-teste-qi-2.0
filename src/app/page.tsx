"use client"

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Share2, RotateCcw, CheckCircle } from 'lucide-react'

// Tipos para o teste de QI
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'logic' | 'memory' | 'pattern'
}

interface IQResult {
  score: number
  level: string
  description: string
}

// 25 perguntas de QI com dificuldade crescente
const questions: Question[] = [
  // Perguntas fáceis (1-8)
  {
    id: 1,
    question: "Qual número vem a seguir na sequência: 2, 4, 6, 8, ?",
    options: ["9", "10", "11", "12"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'logic'
  },
  {
    id: 2,
    question: "Se todos os gatos são animais e alguns animais são pretos, então:",
    options: ["Todos os gatos são pretos", "Alguns gatos podem ser pretos", "Nenhum gato é preto", "Todos os animais são gatos"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'logic'
  },
  {
    id: 3,
    question: "Memorize esta sequência: AZUL, VERDE, AMARELO. Qual era a segunda cor?",
    options: ["AZUL", "VERDE", "AMARELO", "VERMELHO"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'memory'
  },
  {
    id: 4,
    question: "Complete o padrão: ○ ● ○ ● ○ ?",
    options: ["○", "●", "◐", "◑"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'pattern'
  },
  {
    id: 5,
    question: "Qual palavra não pertence ao grupo: Carro, Bicicleta, Avião, Mesa",
    options: ["Carro", "Bicicleta", "Avião", "Mesa"],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'logic'
  },
  {
    id: 6,
    question: "Se 3 + 3 = 6, então 6 + 6 = ?",
    options: ["9", "12", "15", "18"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'logic'
  },
  {
    id: 7,
    question: "Memorize: 7, 3, 9, 1. Qual era o terceiro número?",
    options: ["7", "3", "9", "1"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'memory'
  },
  {
    id: 8,
    question: "Complete: △ □ ○ △ □ ?",
    options: ["△", "□", "○", "◇"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'pattern'
  },
  
  // Perguntas médias (9-17)
  {
    id: 9,
    question: "Se João é mais alto que Pedro, e Pedro é mais alto que Maria, então:",
    options: ["Maria é mais alta que João", "João é mais alto que Maria", "Pedro é o mais baixo", "Não é possível determinar"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'logic'
  },
  {
    id: 10,
    question: "Qual número completa a sequência: 1, 4, 9, 16, ?",
    options: ["20", "25", "30", "36"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'pattern'
  },
  {
    id: 11,
    question: "Memorize esta lista: LIVRO, CANETA, PAPEL, RÉGUA, BORRACHA. Quantos itens havia?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'memory'
  },
  {
    id: 12,
    question: "Se A = 1, B = 2, C = 3, quanto vale a palavra 'CAB'?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'logic'
  },
  {
    id: 13,
    question: "Complete o padrão numérico: 2, 6, 18, 54, ?",
    options: ["108", "162", "216", "270"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'pattern'
  },
  {
    id: 14,
    question: "Qual é o próximo na sequência: Segunda, Terça, Quinta, Sábado, ?",
    options: ["Domingo", "Quarta", "Sexta", "Segunda"],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'logic'
  },
  {
    id: 15,
    question: "Memorize: CASA-AZUL, CARRO-VERDE, ÁRVORE-AMARELA. Qual era a cor da árvore?",
    options: ["AZUL", "VERDE", "AMARELA", "VERMELHA"],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'memory'
  },
  {
    id: 16,
    question: "Se todos os X são Y, e alguns Y são Z, qual afirmação é verdadeira?",
    options: ["Todos os X são Z", "Alguns X podem ser Z", "Nenhum X é Z", "Todos os Z são X"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'logic'
  },
  {
    id: 17,
    question: "Complete: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "17"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'pattern'
  },

  // Perguntas difíceis (18-25)
  {
    id: 18,
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas fazem 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'logic'
  },
  {
    id: 19,
    question: "Memorize esta sequência complexa: A1-B3-C5-D7-E9. Qual era o número associado à letra C?",
    options: ["3", "5", "7", "9"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'memory'
  },
  {
    id: 20,
    question: "Complete a sequência: 3, 7, 15, 31, ?",
    options: ["47", "63", "79", "95"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'pattern'
  },
  {
    id: 21,
    question: "Em uma sala há 4 cantos. Em cada canto há um gato. Cada gato vê 3 gatos. Quantos gatos há na sala?",
    options: ["4", "12", "16", "Impossível determinar"],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'logic'
  },
  {
    id: 22,
    question: "Qual número não pertence à série: 2, 3, 6, 7, 8, 14, 15, 30?",
    options: ["8", "14", "15", "30"],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'pattern'
  },
  {
    id: 23,
    question: "Se CÓDIGO = 123456 e DIGO = 4756, quanto vale CIDO?",
    options: ["1456", "1756", "1346", "1746"],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'logic'
  },
  {
    id: 24,
    question: "Memorize: SEGUNDA-8h, TERÇA-10h, QUARTA-12h, QUINTA-14h. Que horas era na terça?",
    options: ["8h", "10h", "12h", "14h"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'memory'
  },
  {
    id: 25,
    question: "Complete a sequência mais complexa: 1, 4, 13, 40, 121, ?",
    options: ["244", "364", "484", "604"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'pattern'
  }
]

// Função para calcular o QI baseado nas respostas
function calculateIQ(correctAnswers: number, totalQuestions: number): IQResult {
  const percentage = (correctAnswers / totalQuestions) * 100
  
  let score: number
  let level: string
  let description: string

  if (percentage >= 96) {
    score = 145 + Math.floor(Math.random() * 10)
    level = "Genial"
    description = "Você possui uma inteligência excepcional e capacidade de raciocínio extraordinária. Apenas 0,1% da população atinge este nível."
  } else if (percentage >= 88) {
    score = 130 + Math.floor(Math.random() * 15)
    level = "Muito Superior"
    description = "Você possui raciocínio muito avançado e alta capacidade analítica. Está entre os 2% mais inteligentes da população."
  } else if (percentage >= 76) {
    score = 115 + Math.floor(Math.random() * 15)
    level = "Superior"
    description = "Você possui inteligência acima da média com excelente capacidade de resolução de problemas."
  } else if (percentage >= 60) {
    score = 100 + Math.floor(Math.random() * 15)
    level = "Médio Superior"
    description = "Você possui boa capacidade de raciocínio e está na média superior da população."
  } else if (percentage >= 44) {
    score = 85 + Math.floor(Math.random() * 15)
    level = "Médio"
    description = "Você possui capacidade de raciocínio dentro da média populacional."
  } else {
    score = 70 + Math.floor(Math.random() * 15)
    level = "Abaixo da Média"
    description = "Você pode desenvolver melhor suas habilidades de raciocínio lógico com prática."
  }

  return { score, level, description }
}

export default function IQTest() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'result-locked' | 'payment' | 'result-unlocked'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [iqResult, setIqResult] = useState<IQResult | null>(null)
  const [globalAverage] = useState(117) // Média global simulada
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)

  // Calcular progresso
  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Iniciar teste
  const startTest = () => {
    setCurrentStep('test')
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
  }

  // Próxima pergunta
  const nextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calcular resultado
      const correctAnswers = newAnswers.reduce((count, answer, index) => {
        return count + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)
      
      const result = calculateIQ(correctAnswers, questions.length)
      setIqResult(result)
      setCurrentStep('result-locked')
    }
  }

  // Processar pagamento
  const processPayment = async () => {
    setIsPaymentProcessing(true)
    
    // Simular processamento de pagamento
    setTimeout(() => {
      setIsPaymentProcessing(false)
      setCurrentStep('result-unlocked')
    }, 2000)
  }

  // Compartilhar resultado
  const shareResult = () => {
    if (iqResult) {
      const text = `Acabei de fazer um teste de QI e meu resultado foi ${iqResult.score}! Faça o seu também.`
      if (navigator.share) {
        navigator.share({
          title: 'Meu Resultado do Teste de QI',
          text: text,
          url: window.location.href
        })
      } else {
        navigator.clipboard.writeText(text + ' ' + window.location.href)
        alert('Resultado copiado para a área de transferência!')
      }
    }
  }

  // Refazer teste
  const restartTest = () => {
    setCurrentStep('intro')
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setIqResult(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Teste de QI Oficial</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tela de Introdução */}
        {currentStep === 'intro' && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Descubra Seu QI Real
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Teste científico com 25 perguntas de raciocínio lógico, memória e padrões visuais. 
                Descubra sua verdadeira capacidade intelectual em poucos minutos.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 max-w-md mx-auto">
              <div className="text-sm text-blue-600 font-medium mb-1">Média Global Hoje</div>
              <div className="text-3xl font-bold text-blue-700">{globalAverage}</div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-900">25</div>
                  <div className="text-sm text-gray-600">Perguntas</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-900">~10</div>
                  <div className="text-sm text-gray-600">Minutos</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Científico</div>
                </div>
              </div>

              <Button 
                onClick={startTest}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                Começar Teste Agora
              </Button>
            </div>
          </div>
        )}

        {/* Tela do Teste */}
        {currentStep === 'test' && (
          <div className="space-y-6">
            {/* Barra de Progresso */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
                <span>{Math.round(progress)}% concluído</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Pergunta */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {questions[currentQuestion].category === 'logic' && 'Raciocínio Lógico'}
                    {questions[currentQuestion].category === 'memory' && 'Memória'}
                    {questions[currentQuestion].category === 'pattern' && 'Padrões'}
                  </Badge>
                  <Badge 
                    variant={questions[currentQuestion].difficulty === 'easy' ? 'secondary' : 
                            questions[currentQuestion].difficulty === 'medium' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {questions[currentQuestion].difficulty === 'easy' && 'Fácil'}
                    {questions[currentQuestion].difficulty === 'medium' && 'Médio'}
                    {questions[currentQuestion].difficulty === 'hard' && 'Difícil'}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Botão Próxima */}
            <div className="flex justify-end">
              <Button
                onClick={nextQuestion}
                disabled={selectedAnswer === null}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 px-8 py-3 rounded-xl transition-all duration-300"
              >
                {currentQuestion === questions.length - 1 ? 'Finalizar Teste' : 'Próxima Pergunta'}
              </Button>
            </div>
          </div>
        )}

        {/* Tela de Resultado Bloqueado */}
        {currentStep === 'result-locked' && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Seu resultado está pronto!
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descubra agora qual é o seu verdadeiro QI.
                Clique abaixo para desbloquear seu resultado completo.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                  ???
                </div>
                <div className="text-sm text-gray-600">Seu QI será revelado após o pagamento</div>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep('payment')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ver meu resultado agora
            </Button>

            <p className="text-sm text-gray-500">
              Pagamento seguro • Resultado instantâneo • Sem cadastro necessário
            </p>
          </div>
        )}

        {/* Tela de Pagamento */}
        {currentStep === 'payment' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Desbloquear Resultado
              </h2>
              <p className="text-gray-600">
                Escolha sua forma de pagamento para ver seu QI completo
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Resultado Completo do QI</span>
                  <span className="text-2xl font-bold text-green-600">R$ 0,99</span>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Seu QI exato calculado cientificamente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Análise detalhada do seu nível de inteligência</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Comparação com a população mundial</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={processPayment}
                    disabled={isPaymentProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
                  >
                    {isPaymentProcessing ? 'Processando...' : 'Pagar com PIX'}
                  </Button>
                  
                  <Button
                    onClick={processPayment}
                    disabled={isPaymentProcessing}
                    variant="outline"
                    className="w-full py-3 rounded-xl"
                  >
                    {isPaymentProcessing ? 'Processando...' : 'Pagar com Cartão'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-gray-500 text-center">
              Pagamento 100% seguro • Resultado liberado instantaneamente
            </p>
          </div>
        )}

        {/* Tela de Resultado Desbloqueado */}
        {currentStep === 'result-unlocked' && iqResult && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Parabéns! Seu resultado está pronto
              </h2>
            </div>

            {/* Resultado Principal */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="text-sm text-blue-600 font-medium">Seu QI é</div>
                <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                  {iqResult.score}
                </div>
                <div className="text-xl font-semibold text-gray-900">{iqResult.level}</div>
              </div>
            </div>

            {/* Descrição */}
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                {iqResult.description}
              </p>
            </div>

            {/* Comparação */}
            <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto">
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Comparação Global</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Seu QI</span>
                  <span className="text-2xl font-bold text-blue-600">{iqResult.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Média Mundial</span>
                  <span className="text-2xl font-bold text-gray-500">100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Média Hoje</span>
                  <span className="text-2xl font-bold text-gray-500">{globalAverage}</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={shareResult}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 rounded-xl"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar Resultado
              </Button>
              
              <Button
                onClick={restartTest}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 rounded-xl"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer Teste
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Obrigado por usar nosso teste de QI! Compartilhe com seus amigos.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Teste de QI Oficial. Todos os direitos reservados.</p>
            <p className="mt-2">Teste baseado em metodologias científicas reconhecidas.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}