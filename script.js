class QuizApp {
  constructor() {
    this.questions = [
      {
        question: "JavaScript-də dəyişən elan etmək üçün hansı açar sözlər istifadə olunur?",
        options: {
          a: "var, let, const",
          b: "variable, let, constant",
          c: "var, define, const",
          d: "let, define, variable",
        },
        correct: "a",
      },
      {
        question: "Aşağıdakılardan hansı JavaScript-də məlumat tipi deyil?",
        options: {
          a: "string",
          b: "boolean",
          c: "float",
          d: "undefined",
        },
        correct: "c",
      },
      {
        question: "JavaScript-də massiv yaratmaq üçün hansı sintaksis istifadə olunur?",
        options: {
          a: "array = (1, 2, 3)",
          b: "array = [1, 2, 3]",
          c: "array = {1, 2, 3}",
          d: "array = <1, 2, 3>",
        },
        correct: "b",
      },
      {
        question: "== və === operatorları arasında fərq nədir?",
        options: {
          a: "Heç bir fərq yoxdur",
          b: "== tip yoxlaması edir, === etmir",
          c: "=== tip yoxlaması edir, == etmir",
          d: "Hər ikisi eyni işi görür",
        },
        correct: "c",
      },
      {
        question: "JavaScript-də funksiya necə elan edilir?",
        options: {
          a: "function myFunction() {}",
          b: "def myFunction() {}",
          c: "func myFunction() {}",
          d: "method myFunction() {}",
        },
        correct: "a",
      },
      {
        question: "DOM nə deməkdir?",
        options: {
          a: "Data Object Model",
          b: "Document Object Model",
          c: "Dynamic Object Model",
          d: "Display Object Model",
        },
        correct: "b",
      },
      {
        question: "JavaScript-də şərt operatoru hansıdır?",
        options: {
          a: "condition ? true : false",
          b: "if ? then : else",
          c: "check ? yes : no",
          d: "test ? correct : wrong",
        },
        correct: "a",
      },
      {
        question: "null və undefined arasında fərq nədir?",
        options: {
          a: "Heç bir fərq yoxdur",
          b: "null qəsdən boş dəyər, undefined təyin edilməmiş dəyər",
          c: "undefined qəsdən boş dəyər, null təyin edilməmiş dəyər",
          d: "Hər ikisi eyni mənanı verir",
        },
        correct: "b",
      },
      {
        question: "JavaScript-də döngü növləri hansılardır?",
        options: {
          a: "for, while, do-while",
          b: "loop, repeat, cycle",
          c: "iterate, foreach, repeat",
          d: "for, repeat, while",
        },
        correct: "a",
      },
      {
        question: "Event listener necə əlavə edilir?",
        options: {
          a: "element.addEvent('click', function)",
          b: "element.addEventListener('click', function)",
          c: "element.attachEvent('click', function)",
          d: "element.bindEvent('click', function)",
        },
        correct: "b",
      },
    ]

    this.currentQuestion = 0
    this.score = 0
    this.selectedAnswer = null
    this.isAnswered = false

    this.initializeElements()
    this.loadQuestion()
    this.attachEventListeners()
  }

  initializeElements() {
    this.questionText = document.getElementById("question-text")
    this.optionA = document.getElementById("option-a")
    this.optionB = document.getElementById("option-b")
    this.optionC = document.getElementById("option-c")
    this.optionD = document.getElementById("option-d")
    this.nextBtn = document.getElementById("next-btn")
    this.restartBtn = document.getElementById("restart-btn")
    this.currentQuestionSpan = document.getElementById("current-question")
    this.totalQuestionsSpan = document.getElementById("total-questions")
    this.progress = document.getElementById("progress")
    this.quizContainer = document.getElementById("quiz-container")
    this.resultContainer = document.getElementById("result-container")
    this.finalScore = document.getElementById("final-score")
    this.correctAnswers = document.getElementById("correct-answers")
    this.wrongAnswers = document.getElementById("wrong-answers")
    this.percentage = document.getElementById("percentage")
    this.resultMessage = document.getElementById("result-message")
    this.restartQuiz = document.getElementById("restart-quiz")

    this.answerOptions = document.querySelectorAll(".answer-option")
  }

  attachEventListeners() {
    this.answerOptions.forEach((option) => {
      option.addEventListener("click", () => this.selectAnswer(option))
    })

    this.nextBtn.addEventListener("click", () => this.nextQuestion())
    this.restartBtn.addEventListener("click", () => this.restartQuiz())
    this.restartQuiz.addEventListener("click", () => this.restartQuiz())
  }

  loadQuestion() {
    const question = this.questions[this.currentQuestion]

    this.questionText.textContent = question.question
    this.optionA.textContent = question.options.a
    this.optionB.textContent = question.options.b
    this.optionC.textContent = question.options.c
    this.optionD.textContent = question.options.d

    this.currentQuestionSpan.textContent = this.currentQuestion + 1
    this.totalQuestionsSpan.textContent = this.questions.length

    this.updateProgress()
    this.resetAnswerStyles()
    this.nextBtn.disabled = true
    this.isAnswered = false
    this.selectedAnswer = null
  }

  selectAnswer(selectedOption) {
    if (this.isAnswered) return

    this.selectedAnswer = selectedOption.dataset.answer
    this.isAnswered = true

    // Remove previous selections
    this.answerOptions.forEach((option) => {
      option.classList.remove("selected")
    })

    // Add selected class
    selectedOption.classList.add("selected")

    // Show correct/wrong answers
    this.showAnswerResults()

    this.nextBtn.disabled = false
  }

  showAnswerResults() {
    const correctAnswer = this.questions[this.currentQuestion].correct

    this.answerOptions.forEach((option) => {
      const answer = option.dataset.answer

      if (answer === correctAnswer) {
        option.classList.add("correct")
      } else if (answer === this.selectedAnswer && answer !== correctAnswer) {
        option.classList.add("wrong")
      }
    })

    if (this.selectedAnswer === correctAnswer) {
      this.score++
    }
  }

  resetAnswerStyles() {
    this.answerOptions.forEach((option) => {
      option.classList.remove("selected", "correct", "wrong")
    })
  }

  nextQuestion() {
    this.currentQuestion++

    if (this.currentQuestion < this.questions.length) {
      this.loadQuestion()
    } else {
      this.showResults()
    }
  }

  updateProgress() {
    const progressPercent = ((this.currentQuestion + 1) / this.questions.length) * 100
    this.progress.style.width = progressPercent + "%"
  }

  showResults() {
    this.quizContainer.style.display = "none"
    this.resultContainer.style.display = "block"

    const wrongAnswers = this.questions.length - this.score
    const percentageScore = Math.round((this.score / this.questions.length) * 100)

    this.finalScore.textContent = this.score
    this.correctAnswers.textContent = this.score
    this.wrongAnswers.textContent = wrongAnswers
    this.percentage.textContent = percentageScore + "%"

    // Set result message based on score
    let message = ""
    let messageClass = ""

    if (percentageScore >= 90) {
      message = "Əla! Siz JavaScript-də çox yaxşı biliyə sahibsiniz!"
      messageClass = "excellent"
    } else if (percentageScore >= 70) {
      message = "Yaxşı! JavaScript biliyiniz qənaətbəxşdir."
      messageClass = "good"
    } else if (percentageScore >= 50) {
      message = "Orta səviyyə. Daha çox təcrübə lazımdır."
      messageClass = "average"
    } else {
      message = "JavaScript öyrənməyə daha çox vaxt ayırmalısınız."
      messageClass = "poor"
    }

    this.resultMessage.textContent = message
    this.resultMessage.className = `result-message ${messageClass}`
  }

  restartQuiz() {
    this.currentQuestion = 0
    this.score = 0
    this.selectedAnswer = null
    this.isAnswered = false

    this.quizContainer.style.display = "block"
    this.resultContainer.style.display = "none"

    this.loadQuestion()
  }
}

let feedbackMode
let sidebarCorrect
let correctCount
let sidebarWrong
let wrongCount
let sidebarUnanswered
let unansweredCount
let selectedQuestions
let currentQuestionIndex
let sidebarTotal

function updateSidebarCounters() {
  if (feedbackMode === "immediate") {
    // Immediate feedback modunda bütün məlumatları göstər
    document.getElementById("sidebar-correct-item").classList.remove("hidden")
    document.getElementById("sidebar-wrong-item").classList.remove("hidden")
    document.getElementById("sidebar-unanswered-item").classList.remove("hidden")

    sidebarCorrect.textContent = correctCount
    sidebarWrong.textContent = wrongCount
    sidebarUnanswered.textContent = unansweredCount
  } else {
    // End feedback modunda düzgün/səhv saylarını gizlə, yalnız qalan sualları göstər
    document.getElementById("sidebar-correct-item").classList.add("hidden")
    document.getElementById("sidebar-wrong-item").classList.add("hidden")
    document.getElementById("sidebar-unanswered-item").classList.remove("hidden")

    sidebarUnanswered.textContent = unansweredCount
  }

  sidebarTotal.textContent = selectedQuestions.length
}

function getFeedbackMode() {
  // Implement the logic to determine the feedback mode.
  // For example, you can get it from a form input or a configuration variable.
  // For now, let's assume it's always "immediate".
  feedbackMode = "immediate"
}

function startQuiz() {
  // Reset counters
  correctCount = 0
  wrongCount = 0
  unansweredCount = selectedQuestions.length
  currentQuestionIndex = 0

  // Get feedback mode
  getFeedbackMode()

  // Set up sidebar visibility based on feedback mode
  if (feedbackMode === "immediate") {
    document.getElementById("sidebar-correct-item").classList.remove("hidden")
    document.getElementById("sidebar-wrong-item").classList.remove("hidden")
    document.getElementById("sidebar-unanswered-item").classList.remove("hidden")
  } else {
    document.getElementById("sidebar-correct-item").classList.add("hidden")
    document.getElementById("sidebar-wrong-item").classList.add("hidden")
    document.getElementById("sidebar-unanswered-item").classList.remove("hidden")
  }

  updateSidebarCounters()
  // loadQuestion() is not defined in this scope.  It's a method of the QuizApp class.
  // If you want to call it, you need a QuizApp instance.
  // For example:
  // const quizApp = new QuizApp();
  // quizApp.loadQuestion();
}

// Initialize the quiz when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startScreen = document.getElementById("start-screen")
  const quizScreen = document.getElementById("quiz-screen")
  const resultsScreen = document.getElementById("results-screen")

  const questionsInput = document.getElementById("questions-input")
  const fileInput = document.getElementById("file-input")
  const loadSampleBtn = document.getElementById("load-sample")
  const startBtn = document.getElementById("start-btn")

  const random50Radio = document.getElementById("random-50")
  const customRangeRadio = document.getElementById("custom-range")
  const fromQuestionInput = document.getElementById("from-question")
  const toQuestionInput = document.getElementById("to-question")
  const questionLimitInput = document.getElementById("question-limit")
  const optionCards = document.querySelectorAll(".option-card")

  const immediateFeedbackRadio = document.getElementById("immediate-feedback")
  const endFeedbackRadio = document.getElementById("end-feedback")

  const examTimeSelect = document.getElementById("exam-time")
  const customTimeInput = document.getElementById("custom-time")
  const customTimeDiv = document.querySelector(".custom-time-input")

  const questionsContainer = document.getElementById("questions-container")
  const questionCount = document.getElementById("question-count")
  const timer = document.getElementById("timer")
  const correctCountEl = document.getElementById("correct-count")
  const wrongCountEl = document.getElementById("wrong-count")
  const unansweredCountEl = document.getElementById("unanswered-count")

  const submitBtn = document.getElementById("submit-btn")
  const fullscreenBtn = document.getElementById("fullscreen-btn")
  const fullscreenIcon = document.getElementById("fullscreen-icon")
  const themeBtn = document.getElementById("theme-btn")
  const themeIcon = document.getElementById("theme-icon")

  const totalQuestionsEl = document.getElementById("total-questions")
  const correctAnswersEl = document.getElementById("correct-answers")
  const wrongAnswersEl = document.getElementById("wrong-answers")
  const unansweredEl = document.getElementById("unanswered")
  const successRateEl = document.getElementById("success-rate")
  const questionRangeEl = document.getElementById("question-range")
  const examDurationEl = document.getElementById("exam-duration")
  const feedbackModeEl = document.getElementById("feedback-mode")
  const reviewContainer = document.getElementById("review-container")
  const restartBtn = document.getElementById("restart-btn")

  // Filter buttons
  const filterAllBtn = document.getElementById("filter-all")
  const filterCorrectBtn = document.getElementById("filter-correct")
  const filterWrongBtn = document.getElementById("filter-wrong")
  const filterUnansweredBtn = document.getElementById("filter-unanswered")

  // Floating sidebar elements
  const floatingSidebar = document.getElementById("floating-sidebar")
  const sidebarTimer = document.getElementById("sidebar-timer")
  const sidebarCorrect = document.getElementById("sidebar-correct")
  const sidebarWrong = document.getElementById("sidebar-wrong")
  const sidebarUnanswered = document.getElementById("sidebar-unanswered")
  const sidebarTotal = document.getElementById("sidebar-total")

  // Quiz State
  let allQuestions = []
  let selectedQuestions = []
  let userAnswers = []
  let startTime
  let timerInterval
  let timeLimit = 15 * 60 // Default 15 minutes in seconds
  let correctCount = 0
  let wrongCount = 0
  let unansweredCount = 0
  let usedRange = ""
  let examDuration = "15 dəqiqə"
  let feedbackMode = "immediate" // "immediate" or "end"
  let feedbackModeText = "Dərhal"

  // Sample Questions in Azerbaijani
  const sampleQuestions = [
    {
      question: "Azərbaycanın paytaxtı hansıdır?",
      options: ["Bakı", "Gəncə", "Sumqayıt", "Mingəçevir"],
      correctAnswer: "Bakı",
    },
    {
      question: "Aşağıdakılardan hansı proqramlaşdırma dilidir?",
      options: ["JavaScript", "HTML", "CSS", "HTTP"],
      correctAnswer: "JavaScript",
    },
    {
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      question: "Yerin peyki nədir?",
      options: ["Ay", "Mars", "Venera", "Günəş"],
      correctAnswer: "Ay",
    },
    {
      question: "Hansı məməlidir?",
      options: ["Balina", "Köpəkbalığı", "İlan", "Kərtənkələ"],
      correctAnswer: "Balina",
    },
    {
      question: "Osmanlı İmperiyasının qurucusu kimdir?",
      options: ["Osman Bəy", "Fateh Sultan Məhəmməd", "Qanuni Sultan Süleyman", "Yavuz Sultan Səlim"],
      correctAnswer: "Osman Bəy",
    },
    {
      question: "Hansı planet deyil?",
      options: ["Pluton", "Mars", "Venera", "Yupiter"],
      correctAnswer: "Pluton",
    },
    {
      question: "İnsan bədənində neçə sümük var?",
      options: ["206", "186", "226", "246"],
      correctAnswer: "206",
    },
    {
      question: "Hansı element deyil?",
      options: ["Su", "Oksigen", "Hidrogen", "Karbon"],
      correctAnswer: "Su",
    },
    {
      question: "Azərbaycanın ən yüksək dağı hansıdır?",
      options: ["Bazardüzü", "Şahdağ", "Qapıcıq", "Tufandağ"],
      correctAnswer: "Bazardüzü",
    },
  ]

  // Theme Management
  function initializeTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    updateThemeIcon(theme)
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      // Sun icon for switching to light mode
      themeIcon.innerHTML =
        '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
      themeBtn.title = "Light Mode"
    } else {
      // Moon icon for switching to dark mode
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      themeBtn.title = "Dark Mode"
    }
  }

  // Floating Sidebar Management
  function setupFloatingSidebar() {
    let lastScrollY = window.scrollY
    let isVisible = false
    let isQuizActive = false

    function updateSidebarVisibility() {
      // Only show sidebar during quiz
      if (!isQuizActive) {
        if (isVisible) {
          floatingSidebar.classList.remove("visible")
          isVisible = false
        }
        return
      }

      const currentScrollY = window.scrollY
      const shouldShow = currentScrollY > 200 && currentScrollY > lastScrollY

      if (shouldShow && !isVisible) {
        floatingSidebar.classList.add("visible")
        isVisible = true
      } else if ((!shouldShow || currentScrollY < 50) && isVisible) {
        floatingSidebar.classList.remove("visible")
        isVisible = false
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", updateSidebarVisibility)

    // Functions to control sidebar state
    function showSidebar() {
      isQuizActive = true
    }

    function hideSidebar() {
      isQuizActive = false
      floatingSidebar.classList.remove("visible")
      isVisible = false
    }

    return { showSidebar, hideSidebar }
  }

  function updateSidebarCounters() {
    sidebarCorrect.textContent = correctCount
    sidebarWrong.textContent = wrongCount
    sidebarUnanswered.textContent = unansweredCount
    sidebarTotal.textContent = selectedQuestions.length
  }

  function updateSidebarTimer(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    let timeText
    if (hours > 0) {
      timeText = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    } else {
      timeText = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    sidebarTimer.textContent = timeText

    // Add warning classes
    const warningThreshold = Math.min(180, timeLimit * 0.2)
    const dangerThreshold = Math.min(60, timeLimit * 0.1)

    sidebarTimer.classList.remove("warning", "danger")
    if (seconds <= dangerThreshold) {
      sidebarTimer.classList.add("danger")
    } else if (seconds <= warningThreshold) {
      sidebarTimer.classList.add("warning")
    }
  }

  // Filter functionality
  function setupFilterButtons() {
    filterAllBtn.addEventListener("click", () => filterQuestions("all"))
    filterCorrectBtn.addEventListener("click", () => filterQuestions("correct"))
    filterWrongBtn.addEventListener("click", () => filterQuestions("wrong"))
    filterUnansweredBtn.addEventListener("click", () => filterQuestions("unanswered"))
  }

  function filterQuestions(type) {
    // Update active button
    document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"))

    switch (type) {
      case "all":
        filterAllBtn.classList.add("active")
        break
      case "correct":
        filterCorrectBtn.classList.add("active")
        break
      case "wrong":
        filterWrongBtn.classList.add("active")
        break
      case "unanswered":
        filterUnansweredBtn.classList.add("active")
        break
    }

    // Filter review items
    const reviewItems = document.querySelectorAll(".review-item")
    reviewItems.forEach((item, index) => {
      const userAnswer = userAnswers[index]
      const correctAnswer = selectedQuestions[index].correctAnswer
      const isCorrect = userAnswer === correctAnswer
      const isUnanswered = userAnswer === null

      let shouldShow = false

      switch (type) {
        case "all":
          shouldShow = true
          break
        case "correct":
          shouldShow = isCorrect && !isUnanswered
          break
        case "wrong":
          shouldShow = !isCorrect && !isUnanswered
          break
        case "unanswered":
          shouldShow = isUnanswered
          break
      }

      if (shouldShow) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })
  }

  // Event Listeners
  loadSampleBtn.addEventListener("click", loadSampleQuestions)
  fileInput.addEventListener("change", handleFileUpload)
  startBtn.addEventListener("click", startQuiz)
  submitBtn.addEventListener("click", () => {
    // Show confirmation dialog before submitting
    if (confirm("İmtahanı bitirmək istədiyinizə əminsiniz?")) {
      submitQuiz()
    }
  })
  restartBtn.addEventListener("click", restartQuiz)

  // Theme and Fullscreen functionality
  themeBtn.addEventListener("click", toggleTheme)
  fullscreenBtn.addEventListener("click", toggleFullscreen)

  // Exit fullscreen when quiz ends
  document.addEventListener("fullscreenchange", updateFullscreenButton)

  // Initialize theme, filter buttons, and floating sidebar
  initializeTheme()
  setupFilterButtons()
  const sidebarControls = setupFloatingSidebar()

  // Exam time selection
  examTimeSelect.addEventListener("change", (e) => {
    if (e.target.value === "custom") {
      customTimeDiv.style.display = "block"
    } else {
      customTimeDiv.style.display = "none"
    }
  })

  // Exam mode selection
  optionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const radio = card.querySelector('input[type="radio"]')
      radio.checked = true

      // Update visual selection
      optionCards.forEach((c) => c.classList.remove("selected"))
      card.classList.add("selected")

      // Show/hide range selector based on selection
      const rangeSelector = document.querySelector(".range-selector")
      if (radio.id === "custom-range") {
        rangeSelector.style.display = "grid"
      } else {
        rangeSelector.style.display = "none"
      }
    })
  })

  // Initialize the UI
  if (random50Radio.checked) {
    document.querySelector(".range-selector").style.display = "none"
    optionCards[0].classList.add("selected")
  } else {
    document.querySelector(".range-selector").style.display = "grid"
    optionCards[1].classList.add("selected")
  }

  // Initialize feedback mode selection
  if (immediateFeedbackRadio.checked) {
    optionCards[2].classList.add("selected")
  } else {
    optionCards[3].classList.add("selected")
  }

  // Functions
  function loadSampleQuestions() {
    questionsInput.value = JSON.stringify(sampleQuestions, null, 2)

    // Update the range inputs based on the number of sample questions
    toQuestionInput.value = sampleQuestions.length
    toQuestionInput.max = sampleQuestions.length
    fromQuestionInput.max = sampleQuestions.length

    // Reset file input to allow new file uploads
    fileInput.value = ""
  }

  function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result

      // Check if it's a JSON file or try to parse as JSON first
      if (file.name.endsWith(".json")) {
        try {
          // Validate JSON by parsing it
          JSON.parse(content)
          questionsInput.value = content

          // Update the range inputs based on the number of questions
          const questions = JSON.parse(content)
          if (Array.isArray(questions)) {
            toQuestionInput.value = questions.length
            toQuestionInput.max = questions.length
            fromQuestionInput.max = questions.length
          }
          return
        } catch (error) {
          alert("JSON faylı düzgün formatda deyil. Zəhmət olmasa düzgün JSON faylı yükləyin.")
          return
        }
      }

      // Try to parse as JSON first for any file
      try {
        const parsedJSON = JSON.parse(content)
        if (Array.isArray(parsedJSON)) {
          questionsInput.value = content

          // Update the range inputs based on the number of questions
          toQuestionInput.value = parsedJSON.length
          toQuestionInput.max = parsedJSON.length
          fromQuestionInput.max = parsedJSON.length
          return
        }
      } catch (error) {
        // If not JSON, try to parse as text format
        try {
          const parsedQuestions = parseTextFormat(content)
          questionsInput.value = JSON.stringify(parsedQuestions, null, 2)
          alert(`${parsedQuestions.length} sual uğurla JSON formatına çevrildi! Düzgün cavabları yoxlamağı unutmayın.`)

          // Update the range inputs based on the number of questions
          toQuestionInput.value = parsedQuestions.length
          toQuestionInput.max = parsedQuestions.length
          fromQuestionInput.max = parsedQuestions.length

          // Optionally show dialog to set correct answers
          if (confirm("Düzgün cavabları indi təyin etmək istəyirsiniz?")) {
            showCorrectAnswerDialog(parsedQuestions)
          }
        } catch (parseError) {
          alert(
            "Fayl formatı tanınmadı. Zəhmət olmasa düzgün JSON formatında suallar və ya mətn formatında suallar yükləyin.",
          )
        }
      }
    }

    reader.onerror = () => {
      alert("Fayl oxunarkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.")
    }

    reader.readAsText(file, "UTF-8")
  }

function parseTextFormat(text) {
  const questions = []
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  let currentQuestion = null
  let currentOptions = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // 1. və ya 1) ilə başlayan sətirləri tanı
    const questionMatch = line.match(/^(\d+)[\).]\s*(.+)/)
    if (questionMatch) {
      if (currentQuestion && currentOptions.length > 0) {
        questions.push({
          question: currentQuestion,
          options: currentOptions.map((opt) => opt.text),
          correctAnswer: currentOptions[0].text, // İstəyə görə dəyişilə bilər
        })
      }

      currentQuestion = questionMatch[2]
      currentOptions = []
      continue
    }

    // Yalnız böyük A-E şıklarını tanı
    const optionMatch = line.match(/^([A-E])\)\s*(.+)/)
    if (optionMatch && currentQuestion) {
      currentOptions.push({
        letter: optionMatch[1],
        text: optionMatch[2].trim(),
      })
    }
  }

  // Sonuncu sualı da əlavə et
  if (currentQuestion && currentOptions.length > 0) {
    questions.push({
      question: currentQuestion,
      options: currentOptions.map((opt) => opt.text),
      correctAnswer: currentOptions[0].text,
    })
  }

  if (questions.length === 0) {
    throw new Error("Heç bir sual tapılmadı")
  }

  return questions
}


  function showCorrectAnswerDialog(questions) {
    const modal = document.createElement("div")
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `

    const dialog = document.createElement("div")
    dialog.style.cssText = `
      background: var(--card-background);
      color: var(--text-color);
      padding: 2rem;
      border-radius: 8px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      border: 1px solid var(--border-color);
    `

    dialog.innerHTML = `
      <h3>Düzgün Cavabları Təyin Edin</h3>
      <p>Hər sual üçün düzgün variantı seçin:</p>
      <div id="answer-selection"></div>
      <button id="save-answers" class="primary-btn">Saxla</button>
      <button id="skip-answers" style="background: #6c757d; color: white; margin-left: 1rem;">İndilik Keç</button>
    `

    const answerSelection = dialog.querySelector("#answer-selection")

    questions.forEach((question, qIndex) => {
      const questionDiv = document.createElement("div")
      questionDiv.style.marginBottom = "1rem"
      questionDiv.innerHTML = `
        <p><strong>${qIndex + 1}. ${question.question}</strong></p>
        ${question.options
          .map(
            (option, oIndex) => `
          <label style="display: block; margin: 0.25rem 0; color: var(--text-color);">
            <input type="radio" name="correct_${qIndex}" value="${option}" ${oIndex === 0 ? "checked" : ""}>
            ${String.fromCharCode(97 + oIndex)}) ${option}
          </label>
        `,
          )
          .join("")}
      `
      answerSelection.appendChild(questionDiv)
    })

    dialog.querySelector("#save-answers").addEventListener("click", () => {
      questions.forEach((question, qIndex) => {
        const selected = dialog.querySelector(`input[name="correct_${qIndex}"]:checked`)
        if (selected) {
          question.correctAnswer = selected.value
        }
      })
      questionsInput.value = JSON.stringify(questions, null, 2)
      document.body.removeChild(modal)
    })

    dialog.querySelector("#skip-answers").addEventListener("click", () => {
      document.body.removeChild(modal)
    })

    modal.appendChild(dialog)
    document.body.appendChild(modal)
  }

  function getExamTime() {
    const selectedTime = examTimeSelect.value
    if (selectedTime === "custom") {
      const customMinutes = Number.parseInt(customTimeInput.value) || 15
      if (customMinutes < 1 || customMinutes > 300) {
        alert("Fərdi vaxt 1 ilə 300 dəqiqə arasında olmalıdır.")
        return null
      }
      examDuration = `${customMinutes} dəqiqə`
      return customMinutes * 60
    } else {
      const minutes = Number.parseInt(selectedTime)
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        if (remainingMinutes === 0) {
          examDuration = `${hours} saat`
        } else {
          examDuration = `${hours} saat ${remainingMinutes} dəqiqə`
        }
      } else {
        examDuration = `${minutes} dəqiqə`
      }
      return minutes * 60
    }
  }

  function getFeedbackMode() {
    if (immediateFeedbackRadio.checked) {
      feedbackMode = "immediate"
      feedbackModeText = "Dərhal"
    } else {
      feedbackMode = "end"
      feedbackModeText = "İmtahan sonunda"
    }
  }

  function startQuiz() {
    try {
      // Parse questions from input
      const inputText = questionsInput.value.trim()
      if (!inputText) {
        alert("Zəhmət olmasa sual daxil edin və ya nümunə sualları yükləyin.")
        return
      }

      allQuestions = JSON.parse(inputText)

      if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
        alert("Düzgün sual formatı deyil. Zəhmət olmasa düzgün JSON formatında suallar daxil edin.")
        return
      }

      // Validate question structure
      for (let i = 0; i < allQuestions.length; i++) {
        const q = allQuestions[i]
        if (!q.question || !Array.isArray(q.options) || !q.correctAnswer) {
          alert(
            `Sual ${i + 1} düzgün formatda deyil. Hər sual "question", "options" və "correctAnswer" sahələrinə malik olmalıdır.`,
          )
          return
        }
        if (q.options.length < 2) {
          alert(`Sual ${i + 1} ən azı 2 variant olmalıdır.`)
          return
        }
        if (!q.options.includes(q.correctAnswer)) {
          alert(`Sual ${i + 1} üçün düzgün cavab variantlar arasında yoxdur.`)
          return
        }
      }

      // Get exam time
      const examTimeInSeconds = getExamTime()
      if (examTimeInSeconds === null) return
      timeLimit = examTimeInSeconds

      // Get feedback mode
      getFeedbackMode()

      // Determine which mode is selected and how many questions to use
      let questionsToUse = []
      let questionLimit = 50

      if (random50Radio.checked) {
        // Random 50 mode - use all questions
        questionsToUse = [...allQuestions]
        questionLimit = 50
        usedRange = "Bütün suallar"
      } else {
        // Custom range mode
        const fromQuestion = Number.parseInt(fromQuestionInput.value) || 1
        const toQuestion = Number.parseInt(toQuestionInput.value) || 100
        const limit = Number.parseInt(questionLimitInput.value) || 50

        // Validate range
        if (fromQuestion < 1) {
          alert("Başlanğıc sual 1-dən kiçik ola bilməz.")
          return
        }

        if (toQuestion > allQuestions.length) {
          alert(`Son sual ${allQuestions.length}-dən böyük ola bilməz.`)
          return
        }

        if (fromQuestion >= toQuestion) {
          alert("Başlanğıc sual son sualdan kiçik olmalıdır.")
          return
        }

        if (limit < 1 || limit > 500) {
          alert("Seçiləcək sual sayı 1 ilə 500 arasında olmalıdır.")
          return
        }

        const rangeSize = toQuestion - fromQuestion + 1
        if (limit > rangeSize) {
          alert(`Seçdiyiniz aralıqda yalnız ${rangeSize} sual var. Daha az sual seçin.`)
          return
        }

        // Use questions from the specified range (convert to 0-based indexing)
        questionsToUse = allQuestions.slice(fromQuestion - 1, toQuestion)
        questionLimit = limit
        usedRange = `${fromQuestion}-${toQuestion} arası`
      }

      // Select random questions
      selectedQuestions = selectRandomQuestions(questionsToUse, Math.min(questionLimit, questionsToUse.length))

      // Initialize quiz state
      userAnswers = Array(selectedQuestions.length).fill(null)
      correctCount = 0
      wrongCount = 0
      unansweredCount = selectedQuestions.length

      // Update counters
      updateCounters()
      updateSidebarCounters()

      // Start timer
      startTime = new Date()
      startCountdownTimer()

      // Show quiz screen
      startScreen.classList.add("hidden")
      quizScreen.classList.remove("hidden")

      // Show fullscreen button and activate sidebar
      fullscreenBtn.classList.remove("hidden")
      sidebarControls.showSidebar()

      // Show all questions
      showAllQuestions()
      updateQuestionCount()
    } catch (error) {
      alert("Xəta: " + error.message)
    }
  }

  function selectRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count).map((q) => {
      // Shuffle options for each question
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random())
      return {
        ...q,
        options: shuffledOptions,
      }
    })
  }

  function showAllQuestions() {
    questionsContainer.innerHTML = ""

    selectedQuestions.forEach((question, questionIndex) => {
      const questionItem = document.createElement("div")
      questionItem.classList.add("question-item")
      questionItem.id = `question-${questionIndex}`

      const questionText = document.createElement("div")
      questionText.classList.add("question-text")
      questionText.textContent = `${questionIndex + 1}. ${question.question}`

      const answerOptions = document.createElement("div")
      answerOptions.classList.add("answer-options")

      question.options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement("div")
        optionDiv.classList.add("answer-option")
        optionDiv.dataset.option = option

        const optionContent = document.createElement("div")
        optionContent.classList.add("answer-option-content")
        optionContent.innerHTML = `<strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${option}`

        const radioInput = document.createElement("input")
        radioInput.type = "radio"
        radioInput.name = `question_${questionIndex}`
        radioInput.value = option
        radioInput.id = `q${questionIndex}_o${optionIndex}`

        optionDiv.appendChild(optionContent)
        optionDiv.appendChild(radioInput)

        // Only add click event to radio input, not the entire option div
        radioInput.addEventListener("click", (e) => {
          e.stopPropagation()

          if (feedbackMode === "immediate") {
            // If already answered in immediate mode, do nothing
            if (userAnswers[questionIndex] !== null) return

            // Mark as answered
            const isCorrect = option === question.correctAnswer
            userAnswers[questionIndex] = option

            // Update counters
            if (isCorrect) {
              correctCount++
            } else {
              wrongCount++
            }
            unansweredCount--
            updateCounters()
            updateSidebarCounters()

            // Show immediate feedback
            questionItem.classList.add("answered")
            questionItem.classList.add(isCorrect ? "correct" : "incorrect")

            // Add status indicator
            const statusDiv = document.createElement("div")
            statusDiv.classList.add("question-status")
            statusDiv.classList.add(isCorrect ? "correct" : "incorrect")
            statusDiv.textContent = isCorrect ? "Düzgün" : "Səhv"
            questionItem.appendChild(statusDiv)

            // Highlight correct and selected options
            const allOptions = answerOptions.querySelectorAll(".answer-option")
            allOptions.forEach((opt) => {
              const optionValue = opt.dataset.option

              if (optionValue === question.correctAnswer) {
                opt.classList.add("correct")
              } else if (optionValue === option && option !== question.correctAnswer) {
                opt.classList.add("incorrect")
              }

              // Disable all options
              opt.classList.add("disabled")
            })
          } else {
            // End feedback mode - allow answer changes, no visual feedback
            const wasFirstAnswer = userAnswers[questionIndex] === null

            // Update answer
            userAnswers[questionIndex] = option

            // Update counters only if this is the first answer
            if (wasFirstAnswer) {
              const isCorrect = option === question.correctAnswer
              if (isCorrect) {
                correctCount++
              } else {
                wrongCount++
              }
              unansweredCount--
            } else {
              // If changing answer, recalculate correct/wrong counts
              correctCount = 0
              wrongCount = 0
              userAnswers.forEach((answer, idx) => {
                if (answer !== null) {
                  if (answer === selectedQuestions[idx].correctAnswer) {
                    correctCount++
                  } else {
                    wrongCount++
                  }
                }
              })
            }
            updateCounters()
            updateSidebarCounters()

            // No visual changes - just ensure the radio button is selected
            const allOptions = answerOptions.querySelectorAll(".answer-option")
            allOptions.forEach((opt) => {
              const radioBtn = opt.querySelector('input[type="radio"]')
              radioBtn.checked = opt.dataset.option === option
            })
          }
        })

        answerOptions.appendChild(optionDiv)
      })

      questionItem.appendChild(questionText)
      questionItem.appendChild(answerOptions)
      questionsContainer.appendChild(questionItem)
    })
  }

  function updateCounters() {
    if (feedbackMode === "immediate") {
      correctCountEl.textContent = `Düzgün: ${correctCount}`
      wrongCountEl.textContent = `Səhv: ${wrongCount}`
    } else {
      // Don't show correct/wrong counts during exam
      correctCountEl.textContent = `Düzgün: -`
      wrongCountEl.textContent = `Səhv: -`
    }
    unansweredCountEl.textContent = `Qalan: ${unansweredCount}`
  }

  function updateQuestionCount() {
    questionCount.textContent = `Sual sayı: ${selectedQuestions.length}`
  }

  function startCountdownTimer() {
    let timeRemaining = timeLimit
    updateTimerDisplay(timeRemaining)
    updateSidebarTimer(timeRemaining)

    timerInterval = setInterval(() => {
      timeRemaining--
      updateTimerDisplay(timeRemaining)
      updateSidebarTimer(timeRemaining)

      // Add warning classes when time is running out
      const warningThreshold = Math.min(180, timeLimit * 0.2) // 20% of total time or 3 minutes, whichever is smaller
      const dangerThreshold = Math.min(60, timeLimit * 0.1) // 10% of total time or 1 minute, whichever is smaller

      if (timeRemaining <= dangerThreshold) {
        timer.classList.add("danger")
      } else if (timeRemaining <= warningThreshold) {
        timer.classList.add("warning")
      }

      if (timeRemaining <= 0) {
        clearInterval(timerInterval)
        submitQuiz()
      }
    }, 1000)
  }

  function updateTimerDisplay(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      timer.textContent = `Vaxt: ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    } else {
      timer.textContent = `Vaxt: ${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }
  }

  function submitQuiz() {
    // Stop timer
    clearInterval(timerInterval)

    // Hide sidebar
    sidebarControls.hideSidebar()

    // Update results screen
    totalQuestionsEl.textContent = selectedQuestions.length
    correctAnswersEl.textContent = correctCount
    wrongAnswersEl.textContent = wrongCount
    unansweredEl.textContent = unansweredCount
    questionRangeEl.textContent = usedRange
    examDurationEl.textContent = examDuration
    feedbackModeEl.textContent = feedbackModeText

    const successRate = (correctCount / selectedQuestions.length) * 100
    successRateEl.textContent = `${successRate.toFixed(2)}%`

    // Generate review section
    generateReviewSection()

    // Show results screen
    quizScreen.classList.add("hidden")
    resultsScreen.classList.remove("hidden")

    // Hide fullscreen button
    fullscreenBtn.classList.add("hidden")

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function generateReviewSection() {
    reviewContainer.innerHTML = ""

    selectedQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index]
      const isCorrect = userAnswer === question.correctAnswer
      const isUnanswered = userAnswer === null

      const reviewItem = document.createElement("div")
      reviewItem.classList.add("review-item")

      const questionEl = document.createElement("div")
      questionEl.classList.add("review-question")
      questionEl.textContent = `${index + 1}. ${question.question}`

      const answersEl = document.createElement("div")
      answersEl.classList.add("review-answers")

      question.options.forEach((option) => {
        const answerEl = document.createElement("div")
        answerEl.classList.add("review-answer")

        if (option === question.correctAnswer) {
          answerEl.classList.add("correct")
          answerEl.textContent = `${option} (Düzgün Cavab)`
        } else if (option === userAnswer) {
          answerEl.classList.add("incorrect")
          answerEl.textContent = `${option} (Sizin Cavabınız)`
        } else {
          answerEl.textContent = option
        }

        answersEl.appendChild(answerEl)
      })

      if (isUnanswered) {
        const unansweredEl = document.createElement("div")
        unansweredEl.classList.add("review-answer", "incorrect")
        unansweredEl.textContent = "Bu sualı cavablamadınız."
        answersEl.appendChild(unansweredEl)
      }

      reviewItem.appendChild(questionEl)
      reviewItem.appendChild(answersEl)
      reviewContainer.appendChild(reviewItem)
    })

    // Reset filter to show all questions initially
    filterQuestions("all")
  }

  function restartQuiz() {
    // Reset UI
    resultsScreen.classList.add("hidden")
    startScreen.classList.remove("hidden")

    // Hide fullscreen button and sidebar
    fullscreenBtn.classList.add("hidden")
    sidebarControls.hideSidebar()

    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }

    // Clear timer
    clearInterval(timerInterval)
    timer.textContent = "Vaxt: 15:00"
    timer.classList.remove("warning", "danger")

    // Reset file input properly
    fileInput.value = ""
    fileInput.type = "text"
    fileInput.type = "file"

    // Reset custom time input
    customTimeDiv.style.display = "none"
    examTimeSelect.value = "15"

    // Clear questions input if needed
    // questionsInput.value = ""
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          updateFullscreenIcon(true)
        })
        .catch((err) => {
          console.log("Tam ekran rejimi dəstəklənmir:", err)
        })
    } else {
      document.exitFullscreen().then(() => {
        updateFullscreenIcon(false)
      })
    }
  }

  function updateFullscreenButton() {
    updateFullscreenIcon(!!document.fullscreenElement)
  }

  function updateFullscreenIcon(isFullscreen) {
    if (isFullscreen) {
      // Exit fullscreen icon
      fullscreenIcon.innerHTML =
        '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>'
      fullscreenBtn.title = "Tam Ekrandan Çıx"
    } else {
      // Enter fullscreen icon
      fullscreenIcon.innerHTML =
        '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>'
      fullscreenBtn.title = "Tam Ekran"
    }
  }
})
