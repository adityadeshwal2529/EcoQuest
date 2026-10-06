const $=s=>document.querySelector(s),V=h=>{$('#v').innerHTML=h};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let S={theme:'',user:null,pts:0,streak:0,last:'',ch:'',qz:0,gm:0,q:{}};
try{const x=localStorage.getItem('eq');if(x)S=Object.assign(S,JSON.parse(x))}catch(e){}
const save=()=>{try{localStorage.setItem('eq',JSON.stringify(S))}catch(e){}};
const today=()=>new Date().toISOString().slice(0,10);
const add=n=>{S.pts+=n;save();toast('+'+n+' ⭐ points')};
const lvl=()=>S.pts<100?'Seed':S.pts<300?'Sapling':S.pts<600?'Tree':'Forest';
let tab='home',FL='';
const leaf='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15"/><path d="M5 19l8-8"/></svg>';

function ap(){if(S.theme)document.documentElement.setAttribute('data-theme',S.theme)}
const isD=()=>S.theme?S.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
function th(){const n=$('#nm'),v=n?n.value:'';S.theme=isD()?'light':'dark';save();ap();render();if(v&&$('#nm'))$('#nm').value=v}
const tbtn=()=>`<button class="tb" onclick="th()" aria-label="Switch to ${isD()?'light':'dark'} theme">${isD()?'☀️':'🌙'}</button>`;
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}
function render(){
 const A=$('#app');
 if(!S.user){
  A.innerHTML=`<div class="w" style="max-width:440px;padding-top:5vh"><div style="text-align:right">${tbtn()}</div><div class="c" style="text-align:center"><div class="big">🌍</div><h1 style="font-size:34px;color:var(--g)">EcoQuest</h1><p class="t2">Play, learn, and save the planet one quest at a time.</p><input type="text" id="nm" placeholder="Your name" maxlength="30" onkeydown="if(event.key==='Enter')login()" oninput="$('#er').textContent=''"><p class="err" id="er"></p><button class="p" style="width:100%" onclick="login()">Let's go</button><button style="width:100%;margin-top:10px" onclick="login(1)">Continue as guest</button><p class="t2">Demo login. No password needed.</p></div></div>`;return}
 const N={home:'🏠 Home',quests:'🎯 Quests',quiz:'🧠 Quiz',game:'♻️ Game',ranks:'🏆 Ranks'};
 A.innerHTML=`<div class="w"><header><div class="brd">🌍 EcoQuest</div><div class="hr">${tbtn()}<button onclick="logout()">Log out</button></div></header><nav>${Object.keys(N).map(k=>`<button aria-current="${k===tab}" onclick="go('${k}')">${N[k]}</button>`).join('')}</nav><main id="v"></main></div>`;
 ({home,quests,quiz,game,ranks})[tab]();
}
function login(g){const n=g?'Guest':$('#nm').value.trim();if(!n){$('#er').textContent='Enter your name to continue';return}S.user=n;save();tab='home';render()}
function logout(){S.user=null;save();render()}
function go(t){tab=t;render();scrollTo(0,0)}
function badges(){return [['🌱','Eco starter',1],['🌿','Sapling',S.pts>=100],['🚯','Plastic-free hero',!!S.ch],['🧠','Quiz pro',S.qz>=4],['♻️','Waste hero',S.gm>=8]].map(b=>`<span class="tag ${b[2]?'':'off'}">${b[2]?b[0]:'🔒'} ${b[1]}</span>`).join('')}
const EM={Seed:'🌱',Sapling:'🌿',Tree:'🌳',Forest:'🌲'};
function home(){
 const nx=S.pts<100?100:S.pts<300?300:S.pts<600?600:S.pts,pc=Math.min(100,Math.round(S.pts/nx*100)),d=S.ch===today();
 V(`<div class="hero"><div class="mas">${EM[lvl()]}</div><div style="flex:1"><div class="t3">Hey ${esc(S.user)}!</div><h2>You're a ${lvl()}</h2><div class="bar"><i style="width:${pc}%"></i></div><div class="t3" style="margin-top:14px">${S.pts>=600?'Max level reached!':S.pts+' / '+nx+' points to grow'}</div></div></div>
 <div class="g"><div class="chip">⭐ <b>${S.pts}</b> points</div><div class="chip">🔥 <b>${S.streak}</b> day streak</div></div>
 <div class="ban"><div><div class="t2">Today's eco challenge</div><h2>🚯 Go plastic-free for one day</h2></div><button class="p" onclick="go('quests')">${d?'✅ Done today':'Start challenge'}</button></div>
 <div class="g"><button class="tl t-y" onclick="go('quests')"><div class="e">🎯</div><b>Eco quests</b><div class="t2">Real-life tasks for points</div></button><button class="tl t-b" onclick="go('quiz')"><div class="e">🧠</div><b>Quiz zone</b><div class="t2">Best score: ${S.qz}/5</div></button><button class="tl t-c" onclick="go('game')"><div class="e">♻️</div><b>Sort the waste</b><div class="t2">Best score: ${S.gm}/10</div></button></div>
 <div class="c"><h2>Your badges</h2><div>${badges()}</div></div>`)
}
const CK=["I didn't use a plastic bottle","I didn't take a plastic bag","I avoided plastic-packed snacks","I didn't use plastic cutlery or straws","I carried my own bag or bottle"];
const QS=[['🌳 Plant a sapling',30,'p'],['💡 Switch off unused lights and fans all day',10,'l'],['🚲 Walk, cycle, or use public transport today',15,'t'],['🛍️ Carry a cloth bag for shopping',10,'b']];
function quests(){
 const d=S.ch===today();
 V(`${FL?`<div class="c ok"><b>${FL}</b></div>`:''}<div class="c"><span class="tag">Today's challenge</span><h2>🚯 Go plastic-free for one day</h2>${d?`<p>Done for today. Come back tomorrow to keep your streak.</p>`:`<p class="t2">At the end of the day, confirm each point honestly.</p>${CK.map(t=>`<label class="ck"><input type="checkbox" class="cb" onchange="$('#er').textContent=''"> ${t}</label>`).join('')}<p class="t2">Optional proof: a photo of your steel bottle, cloth bag, or tiffin (+15 points).</p><input type="file" accept="image/*" id="ph" onchange="prev(this)"><div id="pv"></div><p class="err" id="er"></p><button class="p" onclick="sub()">Submit challenge</button>`}</div>
 <div class="c"><b>More quests</b>${QS.map(q=>`<div class="row"><span>${q[0]} <span class="t2">+${q[1]}</span></span>${S.q[q[2]]?'<span class="tag">Done</span>':`<button onclick="qd('${q[2]}',${q[1]})">Mark done</button>`}</div>`).join('')}</div>`);FL=''
}
function prev(i){const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{$('#pv').innerHTML=`<img src="${r.result}" alt="Your proof photo">`};r.readAsDataURL(f)}
function sub(){
 if([...document.querySelectorAll('.cb')].some(c=>!c.checked)){$('#er').textContent='Tick every point to complete the challenge';return}
 const ph=$('#ph').files.length>0,n=ph?25:10,y=new Date(Date.now()-864e5).toISOString().slice(0,10);
 S.streak=S.last===y?S.streak+1:1;S.last=today();S.ch=today();add(n);
 FL=`+${n} points.`+(ph?' Photo check (demo): no plastic detected.':' Add a photo next time for +15 more.');quests()
}
function qd(k,n){S.q[k]=1;add(n);quests()}

const QZ=[['Which gas is the main driver of global warming?',['Oxygen','Carbon dioxide','Nitrogen','Helium'],1],['About how long can a plastic bottle take to decompose?',['5 days','1 month','450 years','2 years'],2],['Which of these is a renewable energy source?',['Coal','Petrol','Diesel','Solar'],3],['World Environment Day is celebrated on?',['5 June','22 April','21 March','2 October'],0],['Reduce, Reuse, and ...?',['Remove','Recycle','Rebuild','Repair'],1]];
let Q={i:0,s:0,a:0,d:0,m:''};
function quiz(){
 if(Q.i>=QZ.length){
  if(!Q.d){Q.d=1;const g=Math.max(0,Q.s-S.qz)*10;if(g){S.qz=Q.s;add(g)}Q.m=g?`+${g} points earned!`:`Beat your best (${S.qz}/5) to earn more points.`}
  V(`<div class="c" style="text-align:center"><div class="big">${Q.s>=4?'🏆':Q.s>=2?'👏':'💪'}</div><h2>${Q.s>=4?'Eco champion!':Q.s>=2?'Nice work!':'Keep going!'}</h2><p>You scored ${Q.s}/${QZ.length}. ${Q.m}</p><button class="p" onclick="Q={i:0,s:0,a:0,d:0,m:''};quiz()">Play again</button></div>`);return}
 const q=QZ[Q.i];
 V(`<div class="c"><p class="t2">Question ${Q.i+1} of ${QZ.length}</p><div class="bar" style="margin:14px 0 34px"><i style="width:${Q.i/QZ.length*100}%"></i></div><h2>${q[0]}</h2>${q[1].map((o,j)=>`<button class="opt" id="o${j}" onclick="pick(${j})"><span class="lt">${'ABCD'[j]}</span>${o}</button>`).join('')}<p class="fbk" id="fb"></p><button class="p" id="nx" style="display:none;width:100%;margin-top:14px" onclick="Q.i++;Q.a=0;quiz()">${Q.i===QZ.length-1?'See score':'Next question'}</button></div>`)
}
function pick(j){if(Q.a)return;Q.a=1;const r=QZ[Q.i][2];if(j===r)Q.s++;$('#o'+r).classList.add('ok');if(j!==r)$('#o'+j).classList.add('no');$('#fb').textContent=j===r?'✅ Correct!':'❌ Not quite';$('#nx').style.display=''}

const IT=[['Banana peel','w','🍌'],['Leftover food','w','🍲'],['Tea leaves','w','🍵'],['Vegetable scraps','w','🥬'],['Plastic bottle','r','🧴'],['Newspaper','r','📰'],['Glass jar','r','🫙'],['Tin can','r','🥫'],['Cardboard box','r','📦'],['Used tissue','d','🧻'],['Chip packet','d','🍟'],['Broken cup','d','☕']];
const BN={w:'wet',r:'recyclable',d:'dry'};
let G={L:[],i:0,s:0,k:0,d:0,m:''};
function game(){
 if(!G.L.length){G={L:IT.slice().sort(()=>Math.random()-.5).slice(0,10),i:0,s:0,k:0,d:0,m:''}}
 if(G.i>=G.L.length){
  if(!G.d){G.d=1;const g=Math.max(0,G.s-S.gm)*5;if(g){S.gm=G.s;add(g)}G.m=g?`+${g} points earned!`:`Beat your best (${S.gm}/10) to earn more points.`}
  V(`<div class="c" style="text-align:center"><div class="big">${G.s>=8?'🌟':'♻️'}</div><h2>Round over</h2><p>You sorted ${G.s}/${G.L.length} correctly. ${G.m}</p><button class="p" onclick="G.L=[];game()">Play again</button></div>`);return}
 const it=G.L[G.i];
 V(`<div class="c"><p class="t2">Item ${G.i+1} of ${G.L.length} · Score ${G.s}</p><div class="bar" style="margin:14px 0 10px"><i style="width:${G.i/G.L.length*100}%"></i></div><div style="text-align:center;padding:40px 0 30px"><div class="big" style="font-size:84px">${it[2]}</div><h2>${it[0]}</h2><p class="t2">Which bin does it go in?</p></div><div class="bns"><button class="bw" onclick="srt('w')">🍃<br>Wet</button><button class="bd2" onclick="srt('d')">🗑️<br>Dry</button><button class="bnr" onclick="srt('r')">♻️<br>Recyclable</button></div><p class="fbk" id="fb"></p></div>`)
}
function srt(k){if(G.k)return;G.k=1;const a=G.L[G.i][1],ok=a===k;if(ok)G.s++;$('#fb').textContent=ok?'✅ Correct!':`❌ Not quite. It goes in the ${BN[a]} bin.`;setTimeout(()=>{G.i++;G.k=0;game()},900)}

function ranks(){
 const me=S.user+' (you)',L=[['Riya S.',1820],['Kabir M.',1505],['Meera K.',980],['Arjun P.',720],['Sana T.',410],[me,S.pts]].sort((a,b)=>b[1]-a[1]);
 V(`<div class="c"><h2>🏆 Class leaderboard</h2>${L.map((r,i)=>`<div class="row${r[0]===me?' me':''}"><span>${['🥇','🥈','🥉'][i]||(i+1)+'.'} ${esc(r[0])}</span><b>⭐ ${r[1]}</b></div>`).join('')}<p class="t2">Other names are demo data.</p></div><div class="c"><h2>Your badges</h2><div>${badges()}</div></div>`)
}
ap();render();