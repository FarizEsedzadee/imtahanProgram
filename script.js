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

  // Fullscreen functionality
  fullscreenBtn.addEventListener("click", toggleFullscreen)

  // Exit fullscreen when quiz ends
  document.addEventListener("fullscreenchange", updateFullscreenButton)

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
        questionsInput.value = content
        return
      }

      // Try to parse as JSON first
      try {
        JSON.parse(content)
        questionsInput.value = content
        return
      } catch (error) {
        // If not JSON, try to parse as text format
        try {
          const parsedQuestions = parseTextFormat(content)
          questionsInput.value = JSON.stringify(parsedQuestions, null, 2)
          alert(`${parsedQuestions.length} sual uğurla JSON formatına çevrildi! Düzgün cavabları yoxlamağı unutmayın.`)

          // Update the range inputs based on the number of questions
          toQuestionInput.value = parsedQuestions.length
          toQuestionInput.max = parsedQuestions.length

          // Optionally show dialog to set correct answers
          if (confirm("Düzgün cavabları indi təyin etmək istəyirsiniz?")) {
            showCorrectAnswerDialog(parsedQuestions)
          }
        } catch (parseError) {
          alert("Fayl formatı tanınmadı. Zəhmət olmasa düzgün formatda fayl yükləyin.")
        }
      }
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

      // Check if line starts with a number followed by )
      const questionMatch = line.match(/^(\d+)\)\s*(.+)/)
      if (questionMatch) {
        // Save previous question if exists
        if (currentQuestion && currentOptions.length > 0) {
          questions.push({
            question: currentQuestion,
            options: currentOptions.map((opt) => opt.text),
            correctAnswer: currentOptions[0].text, // Assuming first option is correct for now
          })
        }

        // Start new question
        currentQuestion = questionMatch[2]
        currentOptions = []
        continue
      }

      // Check if line is an option (a), b), c), etc.)
      const optionMatch = line.match(/^([a-e])\)\s*(.+)/)
      if (optionMatch && currentQuestion) {
        currentOptions.push({
          letter: optionMatch[1],
          text: optionMatch[2],
        })
        continue
      }
    }

    // Add the last question
    if (currentQuestion && currentOptions.length > 0) {
      questions.push({
        question: currentQuestion,
        options: currentOptions.map((opt) => opt.text),
        correctAnswer: currentOptions[0].text, // Assuming first option is correct for now
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
      background: white;
      padding: 2rem;
      border-radius: 8px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
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
          <label style="display: block; margin: 0.25rem 0;">
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

      // Start timer
      startTime = new Date()
      startCountdownTimer()

      // Show quiz screen
      startScreen.classList.add("hidden")
      quizScreen.classList.remove("hidden")

      // Show fullscreen button
      fullscreenBtn.classList.remove("hidden")

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
        optionContent.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`

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

    timerInterval = setInterval(() => {
      timeRemaining--
      updateTimerDisplay(timeRemaining)

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
  }

  function restartQuiz() {
    // Reset UI
    resultsScreen.classList.add("hidden")
    startScreen.classList.remove("hidden")

    // Hide fullscreen button
    fullscreenBtn.classList.add("hidden")

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
