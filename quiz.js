function checkQuiz(qid,correctAnswers){
  let score=0,total=correctAnswers.length;
  correctAnswers.forEach((correct,i)=>{
    const n=i+1,sel=document.querySelector('input[name="q'+qid+'_'+n+'"]:checked'),
          fb=document.getElementById('fb'+qid+'_'+n),
          labels=document.querySelectorAll('label[data-q="'+qid+'_'+n+'"]');
    labels.forEach(l=>l.classList.remove('correct','wrong'));
    if(fb){fb.className='quiz-feedback';fb.textContent='';}
    if(!sel){if(fb){fb.className='quiz-feedback wrong';fb.textContent='⚠️ No respondiste.';}return;}
    const ok=sel.value===correct;
    if(ok)score++;
    const sl=document.querySelector('label[data-q="'+qid+'_'+n+'"][data-val="'+sel.value+'"]'),
          cl=document.querySelector('label[data-q="'+qid+'_'+n+'"][data-val="'+correct+'"]');
    if(sl)sl.classList.add(ok?'correct':'wrong');
    if(!ok&&cl)cl.classList.add('correct');
    if(fb){fb.className='quiz-feedback '+(ok?'correct':'wrong');
           fb.textContent=ok?'✅ ¡Correcto!':'❌ Incorrecto. La respuesta correcta está en verde.';}
  });
  const rd=document.getElementById('quiz-result-'+qid);
  if(rd){
    const pct=Math.round(score/total*100),
          col=pct>=70?'#27ae60':pct>=50?'#f39c12':'#e74c3c',
          msg=pct===100?'🏆 ¡Perfecto!':pct>=70?'🎉 ¡Muy bien!':pct>=50?'📚 Repasa un poco más.':'💪 No te rindas, repasa el material.';
    rd.innerHTML='<div class="quiz-result-num" style="color:'+col+'">'+score+'/'+total+'</div><div style="font-size:22px;margin:4px 0">'+pct+'%</div><div class="quiz-result-msg">'+msg+'</div><button class="quiz-retry" onclick="retryQuiz(\''+qid+'\')">🔄 Intentar de nuevo</button>';
    rd.style.display='block';
  }
}
function retryQuiz(qid){
  document.querySelectorAll('input[name^="q'+qid+'_"]').forEach(r=>r.checked=false);
  document.querySelectorAll('label[data-q^="'+qid+'_"]').forEach(l=>l.classList.remove('correct','wrong'));
  document.querySelectorAll('[id^="fb'+qid+'_"]').forEach(f=>{f.className='quiz-feedback';f.textContent='';});
  const r=document.getElementById('quiz-result-'+qid);if(r)r.style.display='none';
}
