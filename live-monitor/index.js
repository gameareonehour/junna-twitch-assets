const { app } = require('electron');
const youtubei = require('youtubei')
const { LiveChat } = require('youtube-chat')
const player = require('node-wav-player');

const watchChats = async () => {
  const youtube = new youtubei.Client()
  const channel = await youtube.findOne('@じゅんなはいしん', {type: 'channel'})
  const liveChat = new LiveChat({ channelId: channel.id })

  const interval = 2000

  let isPlay = false

  const voices = [
    'live-monitor/assets/konbanwa1.wav',
    'live-monitor/assets/konbanwa2.wav',
    'live-monitor/assets/konbanwa3.wav',
    'live-monitor/assets/konbanwa4.wav',
    'live-monitor/assets/konnithiwa1.wav',
  ]

  const getRandomVoice = (voices) => {
    const randomIndex = Math.floor(Math.random() * voices.length);
    return voices[randomIndex];
  };

  const isGreeting = (message) => {
    const messages = [
      'こん',
      'こんにちわ',
      'こんにちは',
      'こんばんは',
      'こんばんわ',
      'こんばんぐ',
      'はいこん',
      'おはよう',
      'おは',
      'おはようございます',
    ];

    const isMatchStart = messages.some(m => message.startsWith(m))
    const isMatchEnd = messages.some(m => message.endsWith(m))
  
    return isMatchStart || isMatchEnd
  }

  liveChat.on('chat', chatItem => {
    const message = chatItem.message.map(message => message.text).join('')

    if (isGreeting(message) && !isPlay) {
      const voice = getRandomVoice(voices)
      
      isPlay = true
      player.play({ path: voice })
      setTimeout(() => { isPlay = false }, interval);
    }
  })
  liveChat.on('error', err => {
    console.log(err.message)
  })

  const ok = await liveChat.start()
  if (!ok) {
    throw new Error('開始できない.')
  }
}

(async() => {
  await app.whenReady();

  watchChats();
})();
