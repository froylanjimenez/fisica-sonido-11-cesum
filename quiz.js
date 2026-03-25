// ── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function initQuiz(quizId, answers) {
    const btn = document.getElementById('quiz-btn-' + quizId);
    if (btn) btn.onclick = () => checkQuiz(quizId, answers);
}

function checkQuiz(quizId, correctAnswers) {
    let score = 0;
    const total = correctAnswers.length;

    correctAnswers.forEach((correct, i) => {
        const qNum = i + 1;
        const selected = document.querySelector(`input[name="q${quizId}_${qNum}"]:checked`);
        const feedback = document.getElementById(`fb${quizId}_${qNum}`);
        const labels = document.querySelectorAll(`label[data-q="${quizId}_${qNum}"]`);

        labels.forEach(l => { l.classList.remove('correct','wrong'); });
        if (feedback) { feedback.className = 'quiz-feedback'; feedback.textContent = ''; }

        if (!selected) {
            if (feedback) { feedback.className = 'quiz-feedback wrong'; feedback.textContent = '⚠️ No respondiste esta pregunta.'; }
            return;
        }

        const isCorrect = selected.value === correct;
        if (isCorrect) score++;

        const selectedLabel = document.querySelector(`label[data-q="${quizId}_${qNum}"][data-val="${selected.value}"]`);
        const correctLabel  = document.querySelector(`label[data-q="${quizId}_${qNum}"][data-val="${correct}"]`);

        if (selectedLabel) selectedLabel.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect && correctLabel) correctLabel.classList.add('correct');

        if (feedback) {
            feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');
            feedback.textContent = isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto. La respuesta correcta está marcada en verde.';
        }
    });

    const resultDiv = document.getElementById('quiz-result-' + quizId);
    if (resultDiv) {
        const pct = Math.round((score / total) * 100);
        const color = pct >= 70 ? '#27ae60' : pct >= 50 ? '#f39c12' : '#e74c3c';
        const msg = pct === 100 ? '🏆 ¡Perfecto! Dominaste el tema.' :
                    pct >= 70  ? '🎉 ¡Muy bien! Sigue así.' :
                    pct >= 50  ? '📚 Bien, pero repasa un poco más.' :
                                 '💪 No te rindas, repasa el material.';
        resultDiv.innerHTML = `
            <div class="quiz-result-num" style="color:${color}">${score}/${total}</div>
            <div style="font-size:22px;margin:4px 0">${pct}%</div>
            <div class="quiz-result-msg">${msg}</div>
            <button class="quiz-retry" onclick="retryQuiz('${quizId}')">🔄 Intentar de nuevo</button>`;
        resultDiv.style.display = 'block';
    }
}

function retryQuiz(quizId) {
    document.querySelectorAll(`input[name^="q${quizId}_"]`).forEach(r => r.checked = false);
    document.querySelectorAll(`label[data-q^="${quizId}_"]`).forEach(l => l.classList.remove('correct','wrong'));
    document.querySelectorAll(`[id^="fb${quizId}_"]`).forEach(f => { f.className='quiz-feedback'; f.textContent=''; });
    const r = document.getElementById('quiz-result-' + quizId);
    if (r) r.style.display = 'none';
}
