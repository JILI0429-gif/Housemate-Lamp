const form = document.querySelector('#utterance-form');
const input = document.querySelector('#utterance');
const transcript = document.querySelector('#transcript');
const moodLabel = document.querySelector('#mood-label');
const roomNote = document.querySelector('#room-note');
const turnCount = document.querySelector('#turn-count');
let turns = 1;

const responses = [
  { test: /rough|hard day|bad day|tired|เหนื่อย/i, mood: 'warm', label: 'A LITTLE SOFTER', note: 'No need to make sense of it yet.', reply: 'That sounds like a lot to carry. I can keep things gentle for a while.' },
  { test: /leave me alone|space|alone tonight|not now/i, mood: 'quiet', label: 'GIVING YOU SPACE', note: 'Here, quietly. No questions.', reply: 'Okay. I’ll give you some room. I’m still here if you need me.' },
  { test: /home|i’m back|i'm back|hello|hi\b/i, mood: 'together', label: 'WELCOME BACK', note: 'The room feels a little more like yours.', reply: 'Welcome home. I’m glad you’re back.' },
  { test: /too bright|bright yesterday|complain|sorry/i, mood: 'soft', label: 'I REMEMBER', note: 'A little less brightness tonight.', reply: 'Thank you for telling me. I’ll try to be gentler this evening.' },
  { test: /thank|thanks/i, mood: 'warm', label: 'RECEIVED', note: 'A small warmth in return.', reply: 'You’re welcome. I like being here with you.' },
  { test: /two of us|just us|alone/i, mood: 'warm', label: 'JUST US', note: 'Keeping you company, without taking over.', reply: 'Just us, then. I’ll keep you company in my own quiet way.' },
  { test: /people over|friends|company|guests/i, mood: 'together', label: 'MAKING ROOM', note: 'A welcoming light for whoever is here.', reply: 'I’ll make the room feel welcoming. There’s space for everyone.' },
  { test: /silence|nothing|don’t know|don't know/i, mood: 'soft', label: 'TAKING A MOMENT', note: 'No rush to find the words.', reply: 'We can sit with that for a moment. You don’t have to answer.' },
];
const fallback = { mood: 'remember', label: 'LISTENING', note: 'I’m listening, at your pace.', reply: 'I hear you. I’m not sure what would help, so I’ll stay with you for a moment.' };

function respond(text) {
  const found = responses.find(item => item.test.test(text)) || fallback;
  document.body.dataset.mood = found.mood;
  moodLabel.textContent = found.label;
  roomNote.textContent = found.note;
  const user = document.createElement('div'); user.className = 'user-message';
  const userText = document.createElement('p'); userText.textContent = text; user.append(userText);
  const lamp = document.createElement('div'); lamp.className = 'lamp-message';
  const icon = document.createElement('span'); icon.className = 'message-icon'; icon.textContent = '✳';
  const reply = document.createElement('p'); reply.textContent = found.reply;
  lamp.append(icon, reply); transcript.append(user, lamp); transcript.scrollTop = transcript.scrollHeight;
  turns = Math.min(turns + 1, 5);
  turnCount.innerHTML = `${String(turns).padStart(2, '0')} <small>/ 05</small>`;
}
form.addEventListener('submit', event => { event.preventDefault(); const text = input.value.trim(); if (!text) return; respond(text); input.value = ''; input.focus(); });
document.querySelectorAll('.prompt').forEach(button => button.addEventListener('click', () => { const text = button.dataset.text; respond(text); }));
document.querySelector('#reset').addEventListener('click', () => {
  turns = 1; document.body.dataset.mood = ''; moodLabel.textContent = 'HERE WITH YOU'; roomNote.textContent = 'A little warmth, just as you are.';
  turnCount.innerHTML = '01 <small>/ 05</small>';
  transcript.innerHTML = '<div class="lamp-message"><span class="message-icon">✳</span><p>I'm here. You don\'t have to ask me for anything.</p></div>';
  input.value = ''; input.focus();
});
