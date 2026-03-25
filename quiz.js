
function checkQuiz(qid, correctAnswers) {
    let score = 0;
    const total = correctAnswers.length;
    correctAnswers.forEach((correct, i) => {
        const qNum = i + 1;
        const selected = document.querySelector(`input[name="q${qid}_${qNum}"]:checked`);
        const feedback = document.getElementById(`fb${qid}_${qNum}`);
        const labels = document.querySelectorAll(`label[data-q="${qid}_${qNum}"]`);
        labels.forEach(l => l.classList.remove('correct','wrong'));
        if (feedback) { feedback.className = 'quiz-feedback'; feedback.textContent = ''; }
        if (!selected) {
            if (feedback) { feedback.className='quiz-feedback wrong'; feedback.textContent='⚠️ No respondiste esta pregunta.'; }
            return;
        }
        const isCorrect = selected.value === correct;
        if (isCorrect) score++;
        const selLabel = document.querySelector(`label[data-q="${qid}_${qNum}"][data-val="${selected.value}"]`);
        const corLabel = document.querySelector(`label[data-q="${qid}_${qNum}"][data-val="${correct}"]`);
        if (selLabel) selLabel.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect && corLabel) corLabel.classList.add('correct');
        if (feedback) {
            feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');
            feedback.textContent = isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto. La respuesta correcta está marcada en verde.';
        }
    });
    const resultDiv = document.getElementById('quiz-result-' + qid);
    if (resultDiv) {
        const pct = Math.round((score/total)*100);
        const color = pct>=70?'#27ae60':pct>=50?'#f39c12':'#e74c3c';
        const msg = pct===100?'🏆 ¡Perfecto! Dominaste el tema.':pct>=70?'🎉 ¡Muy bien! Sigue así.':pct>=50?'📚 Bien, pero repasa un poco más.':'💪 No te rindas, repasa el material.';
        resultDiv.innerHTML = `<div class="quiz-result-num" style="color:${color}">${score}/${total}</div><div style="font-size:22px;margin:4px 0">${pct}%</div><div class="quiz-result-msg">${msg}</div><button class="quiz-retry" onclick="retryQuiz('${qid}')">🔄 Intentar de nuevo</button>`;
        resultDiv.style.display='block';
    }
}
function retryQuiz(qid) {
    document.querySelectorAll(`input[name^="q${qid}_"]`).forEach(r=>r.checked=false);
    document.querySelectorAll(`label[data-q^="${qid}_"]`).forEach(l=>l.classList.remove('correct','wrong'));
    document.querySelectorAll(`[id^="fb${qid}_"]`).forEach(f=>{f.className='quiz-feedback';f.textContent='';});
    const r=document.getElementById('quiz-result-'+qid);
    if(r) r.style.display='none';
}
