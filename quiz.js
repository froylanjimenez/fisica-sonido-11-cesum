
function checkQuiz(qid,answers){
  var s=0;
  for(var i=0;i<answers.length;i++){
    var n=i+1,correct=answers[i];
    var sel=null,inps=document.querySelectorAll('input[name="q'+qid+'_'+n+'"]');
    for(var j=0;j<inps.length;j++){if(inps[j].checked){sel=inps[j];break;}}
    var fb=document.getElementById('fb'+qid+'_'+n);
    var lbls=document.querySelectorAll('label[data-q="'+qid+'_'+n+'"]');
    for(var k=0;k<lbls.length;k++)lbls[k].classList.remove('correct','wrong');
    if(fb){fb.className='quiz-feedback';fb.textContent='';}
    if(!sel){if(fb){fb.className='quiz-feedback wrong';fb.textContent='⚠️ Sin respuesta.';}continue;}
    var ok=(sel.value===correct);
    if(ok)s++;
    for(var k=0;k<lbls.length;k++){
      if(lbls[k].getAttribute('data-val')===sel.value)lbls[k].classList.add(ok?'correct':'wrong');
      if(!ok&&lbls[k].getAttribute('data-val')===correct)lbls[k].classList.add('correct');
    }
    if(fb){fb.className='quiz-feedback '+(ok?'correct':'wrong');
      fb.textContent=ok?'✅ ¡Correcto!':'❌ Incorrecto. La respuesta correcta aparece en verde.';}
  }
  var rd=document.getElementById('quiz-result-'+qid);
  if(rd){
    var pct=Math.round(s/answers.length*100);
    var col=pct>=70?'#27ae60':pct>=50?'#f39c12':'#e74c3c';
    var msg=pct===100?'🏆 ¡Perfecto!':pct>=70?'🎉 ¡Muy bien!':pct>=50?'📚 Repasa el material.':'💪 Sigue intentando.';
    rd.innerHTML='<div class="quiz-result-num" style="color:'+col+'">'+s+'/'+answers.length+'</div>'
      +'<div style="font-size:22px;margin:4px 0">'+pct+'%</div>'
      +'<div class="quiz-result-msg">'+msg+'</div>'
      +'<button class="quiz-retry" onclick="retryQuiz(\''+qid+'\')">🔄 Intentar de nuevo</button>';
    rd.style.display='block';
  }
}
function retryQuiz(qid){
  var inps=document.querySelectorAll('input[name^="q'+qid+'_"]');
  for(var i=0;i<inps.length;i++)inps[i].checked=false;
  var lbls=document.querySelectorAll('label[data-q^="'+qid+'_"]');
  for(var i=0;i<lbls.length;i++)lbls[i].classList.remove('correct','wrong');
  var fbs=document.querySelectorAll('[id^="fb'+qid+'_"]');
  for(var i=0;i<fbs.length;i++){fbs[i].className='quiz-feedback';fbs[i].textContent='';}
  var rd=document.getElementById('quiz-result-'+qid);
  if(rd)rd.style.display='none';
}
